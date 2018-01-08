import { Injectable } from '@angular/core';
import {Http, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams} from '@angular/http';
import {Events,ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
declare var google:any;
declare var navigator: any;
@Injectable()

export class SessionService {
    preQuestions:any;
    selfQuestions:any;
    finalQuestions:any;
    latestJobs:any;
    jobDetail:any;
    trainingDetail:any;
    user:any;
    certifiedTrainer:any;
    token:any;
    userTypeData:any;
    userInfo:any;
    otherUserInfo:any;
    budgetInfo:any;
    function:any;
    reminder:any;
    text:any;
    event:any;
    Categories:any=[];
    Guests:any;
    constructor(public db: AngularFireDatabase,public http:Http,public events:Events,public toastCtrl:ToastController,public nativeStorage:NativeStorage,public toast:Toast){
    }

    
    setToken(token)
    {
    this.token=token;
    }  

    getToken()
    {
        return this.token;
    }

    getCategories()
    {
        this.Categories=[{"id":1,"name":"Events"},
       {"id":2,"name":"Catering"},
       {"id":3,"name":"Photography and video"},
       {"id":4,"name":"Planning"},
       {"id":5,"name":"Jewellery"},
       {"id":6,"name":"Transportation"},
       {"id":7,"name":"Wedding Cards"}];
       return this.Categories;

    }

    getGuests()
    {
        this.Guests=[{"id":1,"name":"Himanshu","mobile":"9971672881"},
        {"id":2,"name":"Shahid","mobile":"9891914661"},
        {"id":3,"name":"Manoj","mobile":"98745612312"},
        {"id":4,"name":"Yash","mobile":"789456123123"},
        {"id":5,"name":"Rahul","mobile":"78945612354"}];

        return this.Guests;
    }
     showToast2(message)
    {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 5000,
            position: 'center'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }
     showToast(message)
    {
       this.toast.show(message, '7000', 'center').subscribe(
        toast => {
            console.log(toast);
          }
        );
    }
    setUserLocation(userLocation)
    {
        this.nativeStorage.setItem('userLocation',userLocation)
        .then(
            () =>
                {
                 var message="stored";
                //  this.showToast("stored location")
                },
            error =>{
                var message="stored location error="+error;
                 this.showToast(message)
            } 
        );
        this.userInfo=userLocation;
    }
     getUserLocation()
    {
        // alert("getting location");
        var userLocation;
        this.nativeStorage.getItem('userLocation')
        .then(
            data =>
                {
                 var message="stored location"+JSON.stringify(data);
                //  this.showToast(message);
                 userLocation=data;   
                
                },
            error =>{
                var message="stored location error="+JSON.stringify(error);
                this.showToast(message)
            } 
        );
        setTimeout(()=>{
            return this.userInfo;
        },1000)
        
    }  
    setUser(userInfo)
    {
       this.user=userInfo;
    //    this.nativeStorage.setItem('userInfo',userInfo)
    //     .then(
    //         () =>
    //             {
    //              var message="stored";
    //              this.showToast("stored user type")
    //             },
    //         error =>{
    //             var message="stored error user type="+error;
    //              this.showToast(message)
    //         } 
    //     );   
    }

    getUser()
    {
     return this.user;
    }

    setOtherUserInfo(info)
    {
      this.otherUserInfo=info;
    }

    getOtherUserInfo()
    {
        return this.otherUserInfo;
    }

    verifyUser(email,type)
    {
        var loginType=type;
        var item=this.db.list('/user_detail',{
                query:{
                    orderByChild:'email',
                    equalTo:email,       
                },
            }).subscribe(snapshot => {
                if(loginType==1)
                {

                    
                    this.events.publish('Verification:Success:signup',snapshot); 
                }
                else
                {
                    this.events.publish('Verification:Success:login',snapshot); 
                }
                
                
            },error=>{
                // this.events.publish('Verification:Error',snapshot); 
                
                this.showToast2("Something went wrong please try again");
                return;
            })
    
              // return item;
        
    }

    setReminder(reminderInfo)
    {
      this.reminder=reminderInfo;  
    }

    getReminder()
    {
      return this.reminder;
    }

    
    setBudget(budget)
    {
        this.budgetInfo=budget;
    }
    getBudget()
    {
      return this.budgetInfo;
    }

    setFunction(function2)
    {
        this.function=function2;
    }

    getFunction()
    {
     return this.function;
    }

    setEvent(eventInfo)
    {
      this.event=eventInfo;
    }

    getEvent()
    {
     return this.event;
    }


    saveUserInfo(userInfo)
    {
       
          this.db.list('/user_detail').push(userInfo).then(({key}) => 
          {
            userInfo.key=key;
            this.updateKey(userInfo)
          },error=>{
            this.showToast2("Something went wrong please try again");
          })
       
        
    }
    updateKey(user)
    {
        this.db.object('/user_detail/'+user.key).update(user).then((profile: any) =>{
            this.setUser(user);
            this.events.publish('user:insert:successfully'); 
             
          })
        .catch((err: any) => {
            this.showToast2("Something went wrong please try again");
        });
    }
}

    