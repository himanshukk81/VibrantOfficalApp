import { Injectable,Directive } from '@angular/core';
import {Http, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams} from '@angular/http';
import {Events,ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../pages/home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';

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

    getRandomString(length)
    {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          
            for (var i = 0; i <length; i++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          
            return text;
          
    }
}
@Injectable()
export class GuestService{
    Guests:any;
    guestInvitation:any;
    guestType:any;
    constructor(public http:Http,public events:Events,public toastCtrl:ToastController,public nativeStorage:NativeStorage,public toast:Toast)
    {}
    getGuests()
    {
        this.Guests=
        [{"id":1,"name":"Himanshu","mobile":"9971672881","guestTypeId":1,"userId":1},
        {"id":2,"name":"Shahid","mobile":"9891914661","guestTypeId":1,"userId":1},
        {"id":3,"name":"Manoj","mobile":"98745612312","guestTypeId":2,"userId":1},
        {"id":4,"name":"Yash","mobile":"789456123123","guestTypeId":3,"userId":2},
        {"id":5,"name":"Rahul","mobile":"78945612354","guestTypeId":1,"userId":2}];
        
        this.events.publish("fetch:guests",this.Guests);
    }

    getGuestLogin(loginInfo)
    {
       for(var i=0;i<this.Guests.length;i++)
       {
        if(loginInfo.id==this.Guests[i].id)
        {
          this.events.publish("guest:login:success",this.Guests[i]);
        }
       }
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

    getGuestType()
    {
        this.guestType=[{"id":1,"name":"Family"},{"id":2,"name":"Friends"},{"id":3,"name":"Collegue"}];
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
    credentialInfo:any={};
    fetchData:any;
    constructor(public guestService:GuestService, public events:Events,public service:SessionService)
    {
        this.users=[{id:1,name:"Himanshu",email:"himanshukk81@gmail.com",password:"123"},
                    {id:2,name:"Shahid",email:"shahid@gmail.com",password:"123"},
                    {id:3,name:"Manoj",email:"manoj@gmail.com",password:"123"},
                    {id:4,name:"Nakul",email:"nakul@gmail.com",password:"123"},
                    {id:5,name:"Rahul",email:"rahul@gmail.com",password:"123"}
                   ] 
    }

    ionViewDidLoad()
    {
        this.events.subscribe('fetch:guests', guests => {
            var login=false;
            for(var i=0;i<guests.length;i++)
            {
                if(this.credentialInfo.id==guests[i].id)
                {
                    this.fetchData=guests[i];
                    login=true;
                }
            }
            if(!login)
            {
                this.service.showToast2("Login failed please try again")
            }
            else 
            {
                this.events.publish("login:success",this.fetchData); 
            }

            
        })    
            
    }
    
    login(loginInfo,userType)
    {
        
        var login=false;
        // var loginData;

        if(userType=='u')
        {
            for(var i=0;i<this.users.length;i++)
            {
                if(this.users[i].email==loginInfo.email && this.users[i].password==loginInfo.password)
                {
                    login=true;
                    this.fetchData=this.users[i];
                }
            }
            if(login)
            {
                this.events.publish("login:success",this.fetchData);
                // this.navCtrl.setRoot(HomePage);
                // this.navCtrl.popToRoot();
            }
            else
            {
                this.service.showToast2("Login Failed Please try again");
            } 
        }
        else 
        {
            this.guestService.getGuestLogin(loginInfo);
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
    budgets:any=[{"id":1,"name":"Booking","categoryId":1,"estimatedCost":200,"finalCost":300,"Notes":"this is prebooking","paid":0},
    {"id":2,"name":"Order","categoryId":1,"estimatedCost":300,"finalCost":500,"Notes":"this is test","paid":0}];
    
        
    getBudgets()
    {
        this.events.publish('budgets:fetch',this.budgets);
        // return this.budgets;    
    }

    setBudgets(budgetList)
    {
        this.budgets=budgetList;
        this.getBudgets()
    }
    getBudgetInfo()
    {
        return this.budgets;
    }
    saveBudgets(budget)
    {
       this.budgets.push(budget); 
       this.getBudgets();
       
    }

    updateBudgets(budget)
    {
       for(var i=0;i<this.budgets.length;i++)
       {
           if(this.budgets[i].id==budget.id)
           {
            budget.finalCost=parseInt(budget.finalCost);
            this.budgets[i]=budget;
           }
       }
      this.getBudgets();
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
         this.getBudgets();
    }

    
}


@Injectable()

export class PaymentService{
    payments:any=[];
    budgetPayments:any=[];
    constructor(public budgetService:BudgetService, public events:Events,public service:SessionService)
    {

    }
    getPayments()
    {
        this.events.publish('fetch:payments',this.payments);
    }

    getPaymentsOfBudget(budgetId)
    {
        for(var i=0;i<this.payments.length;i++)
        {
            if(this.payments[i].budgetId==budgetId)
            {
                this.budgetPayments.push(this.payments[i]);
            }
        }
    }

    savePayments(paymentInfo)
    {
        var budgetList=this.budgetService.getBudgetInfo();
        for(var i=0;i<budgetList.length;i++)
        {
            if(paymentInfo.budgetId==budgetList[i].id)
            {
                budgetList[i].paid+=parseInt(paymentInfo.amount);
            }
        }
        this.budgetService.setBudgets(budgetList);
        // this.payments.push(paymentInfo);
        // this.getPaymentsOfBudget(paymentInfo.budgetId)
    }
}
@Injectable()
export class ToDoService{
    
}
@Injectable()
export class ReminderService{
   reminders:any=[];
   constructor(public events:Events,public localNotifications:LocalNotifications){}

   getReminders()
   {
    this.events.publish('reminder:fetches',this.reminders);
   } 
   saveReminder(reminderInfo)
   {
     this.reminders.push(reminderInfo)
    //  this.localNotifications.schedule(reminderInfo);
    // this.localNotifications.cancelAll().then(() => {
    //     // this.loader=false;         
    //     this.localNotifications.schedule(reminderInfo);
    //     var message="You have set Reminder";
    //     // this.closeModal();
    // });
    //    saveReminder(reminderInfo)
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
export class ShareImageService1{
    constructor(public events:Events,public service:SessionService){}

    imageInfo:any={};
    images:any=[];
    imageInfos:any=[];
    sessionImages:any=[];

    getSharedImages()
    {
        this.imageInfo.broadcast=true;
        this.imageInfo.images=this.images;
        this.events.publish('fetch:images',this.imageInfo);  
        // this.events.publish('fetch:images',this.imageInfos,broadcast);  
        
    }   

    getFilterImages(info)
    {
      var imageList=[];
      this.imageInfos=this.sessionImages;
    //   imageList=this.imageInfos;


        if(this.service.getUser().userType==1)
        {
            for(var i=0;i<this.imageInfos.length;i++)
            {
                if(this.imageInfos[i].userType==1 && info.selectedUserType==1)
                    {
                        imageList.push(this.imageInfos[i]);
                    }  
                else if(this.imageInfos[i].userType==2 && info.selectedUserType==2)
                    {
                        if(!info.guestId || info.guestId==0)
                        {
                            imageList.push(this.imageInfos[i]);  
                        }
                        else if(info.guestId==this.imageInfos[i].guestId)
                        {
                            imageList.push(this.imageInfos[i]); 
                        }
                    }          
            } 
        }
        else if(this.service.getUser().userType==2)
        {      
            for(var i=0;i<this.imageInfos.length;i++)
            {
                imageList.push(this.imageInfos[i]);
                // if(this.imageInfos[i].userType==1)
                // {
                //     if(this.imageInfos[i].guestId==0)
                //     {
                //         imageList.push(this.imageInfos[i]);   
                //     }
                //     else if(this.service.getUser().id==this.imageInfos[i].guestId)
                //     {
                //         imageList.push(this.imageInfos[i]); 
                //     }
                // }  
                // if(this.imageInfos[i].userType==2)
                // {

                //     if(this.service.getUser().id==this.imageInfos[i].guestId)
                //     {
                //         imageList.push(this.imageInfos[i]); 
                //     }
                //     else 
                //     {
                //         var selected=false;
                //         for(var k=0;k<this.imageInfos[i].imagesArray.length;k++)
                //         {
                //             if(this.imageInfos[i].imagesArray[k].selected==true)
                //             {
                //                   imageList.push(this.imageInfos[i]);
                //             }
                //         }
                //         // if(selected)
                //         // {
                //         //     imageList.push(this.imageInfos[i])    
                //         // }
                //     }
                // } 
            }
            
        }
         console.log("Publishing==");
         this.imageInfo.broadcast=true;
         this.imageInfo.imageList=imageList;

         this.events.publish('fetch:images',this.imageInfo);

    }

    approveImage(images)
    {
        // for(var i=0;i<images.length;i++)
        // {
        //     if(images[i].imagesArray[0].selected)
        //     {
        //         // this.imageInfos[i].imagesArray[0].status='A';
        //         this.imageInfos[i].status='A';
        //     } 
        // }
        this.imageInfo.broadcast=true;
        this.imageInfo.imageList=images;
        this.events.publish('fetch:images',this.imageInfo)
        this.service.showToast2("Image successfully approved");
    }
    sharedImages(imageInfo)
    {   
        // this.imageInfo.message=imageInfo.message;
        
        this.imageInfos=this.imageInfos.concat(imageInfo);
        this.sessionImages=this.sessionImages.concat(imageInfo);
        this.getFilterImages(imageInfo);
        // this.events.publish('fetch:images',this.imageInfos);  
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
        // var broadcast=true;
        this.imageInfo.broadcast=true;
        this.imageInfo.images=this.images;
        this.events.publish('fetch:images',this.imageInfo);  
    }
    
}
@Injectable()
export class ShareImageService{
    imageInfo:any={};
    images:any=[];
    imageInfos:any=[];
    constructor(public events:Events,public service:SessionService){
    }
    getSharedImages()
    {
      this.events.publish('fetch:images',this.imageInfos);  
    }   
    getFilterImages(info)
    {
      console.log("Calling guest data");  
      var imageList=[];
        //   imageList=this.imageInfos;

        var user=this.service.getUser();

        console.log("user info==="+JSON.stringify(user));
        if(this.service.getUser().userType==1)
        {
            for(var i=0;i<this.imageInfos.length;i++)
            {
            // if(this.imageInfos[i].userType==1 && this.service.getUser().id==this.imageInfos[i].userId)
            if(this.imageInfos[i].userType==1 && info.selectedUserType==this.imageInfos[i].userType)
            // if(this.imageInfos[i].userType==1)
    
            {
                imageList.push(this.imageInfos[i]);
            }  
            // else if(this.imageInfos[i].userType==2 && this.service.getUser().id==this.imageInfos[i].userId)
            else if(this.imageInfos[i].userType==2 && info.selectedUserType==this.imageInfos[i].userType)
            // else if(this.imageInfos[i].userType==2)
            
            {
                if(!info.guestId || info.guestId==0)
                {
                    imageList.push(this.imageInfos[i]);  
                }
                else if(info.guestId==this.imageInfos[i].guestId)
                {
                    imageList.push(this.imageInfos[i]); 
                }
            }          
            } 
        }
        else if(this.service.getUser().userType==2)
        {
            for(var i=0;i<this.imageInfos.length;i++)
            {
                if(this.imageInfos[i].userType==1 && this.service.getUser().userId==this.imageInfos[i].userId) 
                {
                    if(this.imageInfos[i].guestId==0)
                    {
                        imageList.push(this.imageInfos[i]);   
                    }
                    else if(this.service.getUser().id==this.imageInfos[i].guestId)
                    {
                        imageList.push(this.imageInfos[i]); 
                    }
                }   
                else if(this.imageInfos[i].userType==2 && this.service.getUser().userId==this.imageInfos[i].userId)
                {
                    if(this.service.getUser().id==this.imageInfos[i].guestId)
                    {
                        imageList.push(this.imageInfos[i]); 
                    }
                    else 
                    {
                    //   imageList.push(this.imageInfos[i]);  
                    //  var newArray=[];
                    //  newArray= Object.assign([],this.imageInfos[i]);

                    //  console.log(JSON.stringify(this.imageInfos[i]));
                    // newArray=this.imageInfos[i];

                      //   imageList= Object.assign([], this.imageInfos[i]);
                    //   for(var j=0;j<this.imageInfos[i].imagesArray.length;j++)
                    //   {
                    //     if(this.imageInfos[i].imagesArray[j].status=='P')
                    //     {
                    //         // imageList[i].imagesArray.splice(j,1) 
                    //         // this.imageInfos[i].imagesArray.push(this.imageInfos[i].imagesArray[j])   
                    //     }
                    //   }
                        // for(var k=0;k<newArray.length;k++)
                        // {
                        //   var imageArray=imageList[k].imagesArray;  
                        // var data=[];
                        // data=this.imageInfos[i];
                        let newArray: any = []; 
                        newArray.push(Object.assign({}, this.imageInfos[i])); 
                        // data.forEach((item) => 
                        // { 
                        //     newArray.push(Object.assign({}, item)); 
                        
                        // }); 
            
                        console.log("new array before ==="+JSON.stringify(newArray));
                        newArray[0].imagesArray=[];
                        console.log("new array==="+JSON.stringify(newArray));
                        console.log("old array==="+JSON.stringify(this.imageInfos));
                          for(var l=0;l<this.imageInfos[i].imagesArray.length;l++)
                            {
                              if(this.imageInfos[i].imagesArray)
                              {
                                if(this.imageInfos[i].imagesArray[l].guestId)
                                {

                                   if(this.imageInfos[i].imagesArray[l].sharedGuestId==0)
                                   {
                                    newArray[0].imagesArray.push(this.imageInfos[i].imagesArray[l]);
                                   } 
                                   else if(this.service.getUser().id==this.imageInfos[i].imagesArray[l].sharedGuestId) 
                                   {
                                    newArray[0].imagesArray.push(this.imageInfos[i].imagesArray[l]); 
                                   }
                                }  
                                // else if(this.imageInfos[i].imagesArray[l].status=='A')
                                // {
                                //     newArray[0].imagesArray.push(this.imageInfos[i].imagesArray[l]);
                                // }
                              }
                            }
                            imageList=imageList.concat(newArray); 
                        
                    }
                } 
                
            
            }
            
        }
         console.log("Publishing==");
         this.events.publish('fetch:images',imageList);

    }
    approveImage(images,guestInfo)
    {
        // this.imageInfos=images;


        // for(var i=0;i<this.imageInfos.length;i++)
        // {
        //   for(var j=0;j<this.imageInfos[i].imagesArray.length;j++)
        //   {
        //     if(this.imageInfos[i].imagesArray[j].selected)
        //     {
        //       if(this.imageInfos[i].imagesArray[j].status!="A")
        //       {
        //         this.imageInfos[i].imagesArray[j].guestId=guestInfo.guestId;
        //       }
        //       this.imageInfos[i].imagesArray[j].status="A";          
        //     }
        //     else if(this.imageInfos[i].userType==2 && this.imageInfos[i].userId==this.service.getUser().id) 
        //     {
        //         this.imageInfos[i].imagesArray[j].status="P";
        //       // this.images[i].imagesArray[j].guestId=this.filterInput.guestId;
        //     }
        //   }
        // }

        for(var i=0;i<images.length;i++)
        {
            for(var j=0;j<images[i].imagesArray.length;j++)
            {
                if(images[i].imagesArray[j].selected)
                {
                    for(var k=0;k<this.imageInfos.length;k++)
                    {
                        for(var l=0;l<this.imageInfos[k].imagesArray.length;l++)
                        {
                            if(images[i].imagesArray[j].id==this.imageInfos[k].imagesArray[l].id)
                            {
                                this.imageInfos[k].imagesArray [l].status="A";
                                this.imageInfos[k].imagesArray [l].sharedGuestId=guestInfo.guestId;
                            }
                        }
                    }
                    images[i].imagesArray[j].selected=false;
                }
            }
        }
        // this.events.publish('fetch:images',this.imageInfos);

        this.service.showToast2("Successfully approved");
        this.getFilterImages(guestInfo); 
    }
    sharedImages(imageInfo)
    {   
        // this.imageInfo.message=imageInfo.message;
        this.imageInfos=this.imageInfos.concat(imageInfo);
        this.getFilterImages(imageInfo); 
        
        // this.events.publish('fetch:images',this.imageInfos);  
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
    allMessages:any=[];
    userMessages:any=[];
    constructor(public events:Events,public service:SessionService)
    {

    }


    sendMessage(messageInfo)
    {
       this.allMessages.push(messageInfo);
       this.getMessages(null);
    }


    getMessages(receiverId)
    {
      for(var i=0;i<this.allMessages.length;i++)
      {
          if(this.allMessages[i].senderId==this.service.getUser().id)
          {
              if(receiverId)
              {
                if(this.allMessages[i].receiverId==receiverId)
                {
                    this.userMessages.push(this.allMessages[i])  
                }
                
              }
              else
              {
                this.userMessages.push(this.allMessages[i])
              }

          }
      }  
      this.events.publish('messages:fetches',this.userMessages);
    }
}


@Injectable()
export class EventService{
    eventList:any=[];
    constructor(public events:Events,public service:SessionService)
    {
        this.eventList=[{id:1,name:"Wedding",description:"This is new wedding"},
                        {id:2,name:"Mehandi",description:"This is mehandi function"},
                        {id:3,name:"Sanget",description:"This is Sanget function"},
                        {id:4,name:"Reception",description:"This is Reception function"}
                       ] 
    }
    getEvents()
    {
        // alert("event calleddddddddddddddddddd");
        this.events.publish('events:fetch',this.eventList)
    }
    
}


    