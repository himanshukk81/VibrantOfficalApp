import { Injectable,Directive } from '@angular/core';
import {Http, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams} from '@angular/http';
import {Events,ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../pages/home/home';

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

    // Guests:any;
    constructor(public http:Http,public events:Events,public toastCtrl:ToastController,public nativeStorage:NativeStorage,public toast:Toast){
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
       
        
        
    }
    updateKey(user)
    {
     
    }
}
@Injectable()
export class GuestService{
    Guests:any;
    guestInvitation:any;

    constructor(public http:Http,public events:Events,public toastCtrl:ToastController,public nativeStorage:NativeStorage,public toast:Toast)
    {}
    getGuests()
    {
        this.Guests=
        [{"id":1,"name":"Himanshu","mobile":"9971672881"},
        {"id":2,"name":"Shahid","mobile":"9891914661"},
        {"id":3,"name":"Manoj","mobile":"98745612312"},
        {"id":4,"name":"Yash","mobile":"789456123123"},
        {"id":5,"name":"Rahul","mobile":"78945612354"}];
    
        return this.Guests;    
    }

    getGuestInvitation(guestId)
    {
        this.guestInvitation=[{"id":1,name:"Mehandi",guestId:1},{"id":2,name:"Sanget",guestId:1},{"id":3,name:"Wedding",guestId:1},
                              {"id":5,name:"Reception",guestId:2},{"id":5,name:"Mehandi",guestId:2}];

        var showInvitations=[];
        for(var i=0;i<this.guestInvitation.length;i++)
        {

            console.log("guestId===="+this.guestInvitation[i].guestId);
            if(this.guestInvitation[i].guestId==guestId)
            {
                showInvitations.push(this.guestInvitation[i]); 
            }
        }


        // return showInvitations;
        this.events.publish("guestlist:fetch",showInvitations);
    }
    rejectInvitation(invitationList,guestId)
    {
        for(var i=0;i<invitationList.length;i++)
        {

            console.log("guestId===="+this.guestInvitation[i].guestId);
            if(invitationList[i].id==guestId)
            {
                // invitationList.pop(invitationList[i]);
                invitationList.splice(i,1) 
            }
        }
        this.events.publish("guestinvitation:removed",invitationList);
    }
    
}
@Injectable()
export class CateogryService{
    Categories:any;
    constructor(public http:Http,public events:Events,public toastCtrl:ToastController,public nativeStorage:NativeStorage,public toast:Toast)
    {}
    getCategories()
    {
        this.Categories=[{"id":1,"name":"Events"},
        {"id":2,"name":"Catering"},
        {"id":3,"name":"Photography and video"},
        {"id":4,"name":"Planning"},
        {"id":5,"name":"Jewellery"},
        {"id":6,"name":"Transportation"},
        {"id":7,"name":"Wedding Cards"}];
        // return this.Categories; 

        this.events.publish("fetch:categories",this.Categories);
        
    }
    
}
@Injectable()

export class LoginService {
    users:any=[];
    constructor(public events:Events,public service:SessionService)
    {
        this.users=[{id:1,name:"Himanshu",email:"himanshukk81@gmail.com",password:"123"},
                    {id:2,name:"Shahid",email:"shahid@gmail.com",password:"123"},
                    {id:3,name:"Manoj",email:"manoj@gmail.com",password:"123"},
                    {id:4,name:"Nakul",email:"nakul@gmail.com",password:"123"},
                    {id:5,name:"Rahul",email:"rahul@gmail.com",password:"123"}
                   ] 
    }
    
    login(loginInfo)
    {
        var login=false;
        var loginData;
        for(var i=0;i<this.users.length;i++)
        {
            if(this.users[i].email==loginInfo.email && this.users[i].password==loginInfo.password)
            {
                login=true;
                loginData=this.users[i];
            }
        }
        if(login)
        {
            this.events.publish("login:success",loginData);
            // this.navCtrl.setRoot(HomePage);
            // this.navCtrl.popToRoot();
        }
        else
        {
            this.service.showToast2("Login Failed Please try again");
        }
    }
}
@Injectable()
export class ApprovePhotoService{
    
}
@Injectable()
export class BudgetService{


    constructor(public events:Events){

    }
    budgets:any=[{"id":1,"name":"Booking","categoryId":1,"estimatedCost":200,"finalCost":300,"Notes":"this is prebooking"},
    {"id":2,"name":"Order","categoryId":1,"estimatedCost":300,"finalCost":500,"Notes":"this is test"}];
    
        
    getBudgets()
    {
        this.events.publish('budgets:fetch',this.budgets);
        // return this.budgets;    
    }
    saveBudgets(budget)
    {
       this.budgets.push(budget); 
       return this.getBudgets();
    }

    updateBudgets(budget)
    {
       for(var i=0;i<this.budgets.length;i++)
       {
           if(this.budgets[i].id==budget.id)
           {
            this.budgets[i]=budget;
           }
       }
       return this.getBudgets();
    }

    removeBudget(budget)
    {
        for(var i=0;i<this.budgets.length;i++)
        {
            if(this.budgets[i].id==budget.id)
            {
                this.budgets.splice(i,1);
            }
        }  
        return this.getBudgets();
    }

    
}
@Injectable()
export class ToDoService{
    
}
@Injectable()
export class ReminderService{
   reminders:any=[{"id":1,"name":"Metting","scheduleDate":new Date()}];
   constructor(public events:Events){}

   getReminders()
   {
    this.events.publish('reminder:fetches',this.reminders);
   } 
   saveReminder(reminderInfo)
   {
     this.reminders.push(reminderInfo)
     this.events.publish('reminder:fetches',this.reminders);
   }
   deleteReminder(reminder)
   {
     for(var i=0;i<this.reminders.length;i++)
     {
        this.reminders.splice(i,1) 
     }
     this.events.publish('reminder:fetches',this.reminders);
   }
}
@Injectable()
export class ShareImageService{
    constructor(public events:Events){}
    images:any;
    getSharedImages()
    {

      this.events.publish('fetch:images',this.images);  
        
    }   
    sharedImages(imageInfo)
    {
        this.images.push(imageInfo);
        this.events.publish('fetch:images',this.images);  
    }

    deleteImages(imageInfo)
    {
        for(var i=0;i<this.images.length;i++)
        {
            if(this.images[i].id==imageInfo.id)
            {
                this.images.splice(i,1)  
            }
        }
        this.events.publish('fetch:images',this.images);  
    }
    
}
@Injectable()
export class MessageService{
    
}
    