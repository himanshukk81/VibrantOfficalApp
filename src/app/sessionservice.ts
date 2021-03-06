import { Injectable,Directive, group } from '@angular/core';
import {Http, Response,RequestOptions,Request, RequestMethod,Headers,URLSearchParams} from '@angular/http';
import {Events,ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { HomePage } from '../pages/home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as firebase from 'firebase';

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
    eventInfo:any={};
    guests:any;

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

  
    setGuests(guests)
    {
      this.guests=guests;
    }
    getGuests()
    {
      return this.guests;  
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
        this.nativeStorage.setItem('userInfo',userInfo)
        .then(
            () =>
                {
                    var message="stored";
                    this.showToast("stored user type")
                },
            error =>{
                var message="stored error user type="+error;
                    this.showToast(message)
            } 
        );   
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

    setEventInfo(event)
    {
        this.eventInfo=event;
    }

    getEventInfo()
    {
    //     console.log("total invites=="+this.guestService.totalInvitation())
    //    this.eventInfo.totalInvites=this.guestService.totalInvitation();
       return this.eventInfo;
    }
}

@Injectable()
export class EventService{
    userEvents:any=[];
    guestList:any=[];
    eventInvitations:any=[];
    eventList:any=[{id:1,userId:1,title:"Wedding 1", date:new Date(),time:new Date(),venueName:"Hilton Prague Old Town",address:"Okhla",city:"New Delhi",
    State:"Delhi",zipCode:"110020",description:"this is best wedding",lat:28.5609534,lng:77.2748794,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:2,userId:1,title:"Wedding 2", date:new Date(),time:new Date(),venueName:"Card Wala",address:"Lajpat Nagar",city:"New Delhi",
    State:"Delhi",zipCode:"110024",description:"this is Excellent",lat:28.5697126,lng:77.2326572,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:3,userId:1,title:"Wedding 3", date:new Date(),time:new Date(),venueName:"Delhi Wedding Venue",address:"Malviya Nagar",city:"New Delhi",
    State:"Delhi",zipCode:"110017",description:"this is best wedding",lat:28.5697078,lng:77.2063924,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:4,userId:1,title:"Wedding 4", date:new Date(),time:new Date(),venueName:"YSD Event Management",address:"Laxmi nagar",city:"New Delhi",
    State:"Delhi",zipCode:"110092",description:"this is best wedding",lat:28.5696314,lng:77.1013261,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:5,userId:2,title:"Wedding 5", date:new Date(),time:new Date(),venueName:"Khushi Party Hall",address:"Pritam Pura",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.6632901,lng:77.1377298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:6,userId:2,title:"Wedding 6", date:new Date(),time:new Date(),venueName:"Kumkum Marriage Hall",address:"Shalimar bagh",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.6632901,lng:77.1377298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:7,userId:2,title:"Wedding 7", date:new Date(),time:new Date(),venueName:"abcd",address:"Punjabi bagh",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.7609534,lng:77.2377298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:8,userId:3,title:"Wedding 8", date:new Date(),time:new Date(),venueName:"xyz",address:"Laxmi nagar",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.6832901,lng:77.1577298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:9,userId:3,title:"Wedding 9", date:new Date(),time:new Date(),venueName:"poppp",address:"Jamia",city:"New Delhi",
     State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.7232901,lng:77.1477298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:10,userId:4,title:"Wedding 10", date:new Date(),time:new Date(),venueName:"koierur",address:"Sarita vihar",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.7832901,lng:77.2377298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:11,userId:4,title:"Wedding 11", date:new Date(),time:new Date(),venueName:"kloper",address:"Badarpur",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.8032901,lng:77.2377298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    {id:12,userId:1,title:"Wedding 12", date:new Date(),time:new Date(),venueName:"wertryui",address:"Anand Vihar",city:"New Delhi",
    State:"Delhi",zipCode:"110034",description:"this is best wedding",lat:28.8132901,lng:77.4377298,member:0,approve:0,reject:0,pending:0,guestInfos:[]},
    ]
    
    constructor(public events:Events,public service:SessionService)
    {

        // this.events.subscribe('fetch:user:guests',userGuests1 => {
        //     this.guestList=userGuests1;
        //   })
    }


    getEventsData()
    {
        return this.eventList;
    }
    getEvents()
    {
        this.userEvents=[];
        if(this.service.getUser().userType==1)
        {
            for(var i=0;i<this.eventList.length;i++)
            {
                this.eventList[i].approve=0;
                this.eventList[i].reject=0;
                if(this.eventList[i].userId==this.service.getUser().id)
                {
                    if(this.eventList[i].guestInfos.length>0)
                    {
                        for(var k=0;k<this.eventList[i].guestInfos.length;k++)
                        {
                            if(this.eventList[i].guestInfos[k].status=='A')
                            {
                                this.eventList[i].approve+=1;
                                this.userEvents.push(this.eventList[i]);   
                            }
                            else if(this.eventList[i].guestInfos[k].status=='R')
                            {
                                this.eventList[i].reject+=1;
                                this.userEvents.push(this.eventList[i]);    
                            }
                            // else
                            // {
                            //     this.eventList[i].pending+=1;
                            //     this.userEvents.push(this.eventList[i]);     
                            // }
                        }
                    }
                    else
                    {
                        this.userEvents.push(this.eventList[i]); 
                    }
                    
                }
            }
        }   
        else
        {
            var user=this.service.getUser();

            console.log("user=="+user);

            console.log("Event ids=="+user.eventIds.length);

            if(user.eventIds.length>0)
            {
                for(var i=0;i<user.eventIds.length;i++)
                {
                    for(var j=0;j<this.eventList.length;j++)
                    {

                        console.log("event Id 1221===="+user.eventIds[i]);
                        if(user.eventIds[i].eventId==this.eventList[j].id)
                        {
                            this.userEvents.push(this.eventList[i]);
                        }
                    }
                }   
            }
        }
        this.events.publish('events1:fetch',this.userEvents);
        console.log("Event list==="+JSON.stringify(this.eventList));
    }


    // getEventDetail(eventId)
    // {
    //   for(var i=0;i<this.eventList.length;i++)
    //   {
    //       if(this.eventList[i].id==eventId)
    //       {
    //         this.eventList[i].totalInvites=  
    //       }
    //   }  
    // }

    updateEventStatus(eventInfo)
    {
        for(var i=0;i<this.eventList.length;i++)
        {
            if(this.eventList[i].id==eventInfo.eventId)
            {
              if(this.eventList[i].guestInfos.length>0)
              {
                for(var j=0;j<this.eventList[i].guestInfos.length;j++)
                {
                    if(this.eventList[i].guestInfos[j].guestId==eventInfo.guestId)
                    {
                        this.eventList[i].guestInfos=[];  
                    }
                }
              }  
              if(eventInfo.status=='A')
              {
                this.eventList[i].guestInfos.push({"guestId":eventInfo.guestId,"name":eventInfo.name,"status":eventInfo.status,"adultMember":eventInfo.adultMember,"childMember":eventInfo.child}); 
              }                     
              else if(eventInfo.status=='R')
              { 
                this.eventList[i].guestInfos.push({"guestId":eventInfo.guestId,"name":eventInfo.name,"status":eventInfo.status,"comment":eventInfo.comment});   
              }
            }
        } 
        
        // for(var k=0;k<this.service.getGuests().length;i++)
        // {

        //    if(this.service.getGuests()[k].eventIds[]) 
        // }
        
        
        this.events.publish('event:update:invitations')
    }

    updateEvent(eventInfo)
    {
        console.log("Updating Event=====================");
        for(var i=0;i<this.eventList.length;i++)
        {
            if(this.eventList[i].id==eventInfo.id)
            {
                this.eventList[i]=eventInfo;
                
            }
        }
        this.service.showToast2("Successfully updated");
        this.events.publish('event:update')
    }
}
@Injectable()
export class GuestService{
    Guests:any;
    guestInvitation:any;
    guestType:any;
    userGuests:any=[];
    totalInvites:any=[];
    totalApproves:any=[];
    totalPending:any=[];
    totalReject:any=[];
    confirmationResult:any;
    guestInformation:any;
    totalInvitationCount:number=0;
    totalForEvents:any=[];
    
    // public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
    constructor(public eventservice:EventService,public service:SessionService,public http:Http,public events:Events,public toastCtrl:ToastController,public nativeStorage:NativeStorage,public toast:Toast)
    {
        // this.Guests=
        // [{"id":1,"name":"Himanshu","mobile":"9971672881","guestTypeId":1,"userId":1,"uniqueId":"abcd","eventIds":["1","2"],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        // {"id":2,"name":"Shahid","mobile":"9891914661","guestTypeId":1,"userId":1,"uniqueId":"xyz","eventIds":["5","6","1"],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        // {"id":3,"name":"Manoj","mobile":"98745612312","guestTypeId":2,"userId":2,"uniqueId":"nma1","eventIds":[{"eventId":3,"status":"P"},{"eventId":"4","status":"P"},{"eventId":"1","status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        // {"id":4,"name":"Yash","mobile":"789456123123","guestTypeId":3,"userId":4,"uniqueId":"pot","eventIds":[{"eventId":10,"status":"P"},{"eventId":11","status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        // {"id":5,"name":"Rahul","mobile":"78945612354","guestTypeId":1,"userId":3,"uniqueId":"nope","eventIds":[{"eventId":8,"status":"P"},{"eventId":9","status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0}]
        

        this.Guests=
        [{"id":1,"name":"Himanshu","mobile":"9971672881","guestTypeId":1,"userId":1,"uniqueId":"abcd","eventIds":[{"eventId":1,"status":"P"},{"eventId":2,"status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        {"id":2,"name":"Shahid","mobile":"9891914661","guestTypeId":1,"userId":1,"uniqueId":"xyz","eventIds":[{"eventId":1,"status":"P"},{"eventId":5,"status":"P"},{"eventId":6,"status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        {"id":3,"name":"Manoj","mobile":"98745612312","guestTypeId":2,"userId":1,"uniqueId":"nma1","eventIds":[{"eventId":3,"status":"P"},{"eventId":4,"status":"P"},{"eventId":1,"status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        {"id":4,"name":"Yash","mobile":"789456123123","guestTypeId":3,"userId":4,"uniqueId":"pot","eventIds":[{"eventId":10,"status":"P"},{"eventId":11,"status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        {"id":5,"name":"Rahul","mobile":"78945612354","guestTypeId":1,"userId":3,"uniqueId":"nope","eventIds":[{"eventId":8,"status":"P"},{"eventId":9,"status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0},
        {"id":6,"name":"Abhinav","mobile":"98745612312","guestTypeId":2,"userId":2,"uniqueId":"abhi","eventIds":[{"eventId":3,"status":"P"},{"eventId":12,"status":"P"},{"eventId":1,"status":"P"}],"totalInvites":0,"totalApprove":0,"totalReject":0,"totalPending":0}
        ]
        
        this.service.setGuests(this.Guests);
    }
    getGuests()
    {
        this.events.publish("fetch:guests",this.Guests);
    }

    getGuestsForGroup()
    {
       return this.Guests; 
    }


    updateEventStatus(userInfo)
    {
        for(var i=0;i<this.Guests.length;i++)
        {
            if(this.Guests[i].id==userInfo.guestId)
            {
                for(var j=0;j<this.Guests[i].eventIds.length;j++)
                {
                    if(userInfo.eventId==this.Guests[i].eventIds[j].eventId)
                    {
                        if(userInfo.status=='A')
                        {
                            this.Guests[i].eventIds[j].adultMember=userInfo.adultMember;
                            this.Guests[i].eventIds[j].childMember=userInfo.childMember;

                        }
                        else if(userInfo.status=='R')
                        {
                            this.Guests[i].eventIds[j].comment=userInfo.comment;
                        }
                        this.Guests[i].eventIds[j].status=userInfo.status;
                    }
                }
            }
        }
        this.service.setGuests(this.Guests);
    }

    totalInvitation()
    {
        this.totalInvites=[];
        console.log("event info data0000======"+JSON.stringify(this.service.getEventInfo()));
        for(var i=0;i<this.Guests.length;i++)
        {
            this.Guests[i].totalInvites=0;
            for(var j=0;j<this.Guests[i].eventIds.length;j++)
            {
                
                console.log("session Event id==="+this.service.getEventInfo().id)  
                console.log("Session user id===="+this.service.getUser().id)
                if(this.Guests[i].userId==this.service.getUser().id && this.service.getEventInfo().id==this.Guests[i].eventIds[j].eventId)
                {
                    this.Guests[i].totalInvites+=1;
                    this.totalInvites.push(this.Guests[i])
                }
            }
        }
        console.log("Total Invitations======="+JSON.stringify(this.totalInvites));
        return this.totalInvites;
    }
    // totalApproves1()
    // {
    //     this.totalApproves=[];
    //     console.log("event info data0000======"+JSON.stringify(this.service.getEventInfo()));
    //     var eventInfos=this.service.getEventInfo();

    //     if(eventInfos.guestInfos.length>0)
    //     {
    //         for(var i=0;i<eventInfos.guestInfos.length;i++)
    //         {
    //             if(eventInfos.guestInfos[i].status=='A')
    //             {
    //                 for(var j=0;j<this.Guests.length;j++)
    //                 {
    //                     if(this.Guests[j].id==eventInfos.guestInfos[i].id)
    //                     {
    //                         this.Guests[j].totalApprove+=1;  
    //                         this.totalApproves.push(this.Guests[j]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     // console.log("Total Invitations======="+JSON.stringify(this.totalInvites));
    //     return this.totalApproves; 
    // }

    // totalReject1()
    // {
    //     this.totalReject=[];
    //     console.log("event info data0000======"+JSON.stringify(this.service.getEventInfo()));
    //     var eventInfos=this.service.getEventInfo();

    //     if(eventInfos.guestInfos.length>0)
    //     {
    //         for(var i=0;i<eventInfos.guestInfos.length;i++)
    //         {
    //             if(eventInfos.guestInfos[i].status=='R')
    //             {
    //                 for(var j=0;j<this.Guests.length;j++)
    //                 {
    //                     if(this.Guests[j].id==eventInfos.guestInfos[i].id)
    //                     {
    //                         this.Guests[j].totalReject+=1;  
    //                         this.totalReject.push(this.Guests[j]);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return this.totalReject; 
    // }

    // totalPending1()
    // {
    //    this.totalPending=[];
    //     for(var i=0;i<this.Guests.length;i++)
    //     {
    //        for(var j=0;j<this.Guests[i].eventIds.length;j++)
    //         {
    //             if(this.Guests[i].userId==this.service.getUser().id && this.service.getEventInfo().id==this.Guests[i].eventIds[j].id)
    //             {
    //                 if(this.Guests[i].eventIds[j].status=='P')
    //                 {
    //                     this.totalPending.push(this.Guests[i]);
    //                 }
    //             }
    //         } 
    //     } 
    // }

    getDetailForEvent(type)
    {
       this.totalForEvents=[];  
       for(var i=0;i<this.Guests.length;i++)
       {
          for(var j=0;j<this.Guests[i].eventIds.length;j++)
           {
               console.log("user id==="+this.service.getUser().id);
               console.log("event Ids====="+this.Guests[i].eventIds[j].eventId)
               if(this.Guests[i].userId==this.service.getUser().id && this.service.getEventInfo().id==this.Guests[i].eventIds[j].eventId)
               {
                   if(type=='T')
                   {
                    this.totalForEvents.push(this.Guests[i]);
                   }
                   else
                   {
                    if(this.Guests[i].eventIds[j].status==type)
                    {
                        this.totalForEvents.push(this.Guests[i]);
                    }
                   }  
               }
           } 
       } 
       return this.totalForEvents;
    }


    totalInvitationCount1()
    {
        this.totalInvitationCount=0;
        console.log("event info data0000======"+JSON.stringify(this.service.getEventInfo()));
        
        for(var i=0;i<this.Guests.length;i++)
        {
            for(var j=0;j<this.Guests[i].eventIds.length;j++)
            {
                console.log("session Event id==="+this.service.getEventInfo().id)  
                console.log("Session user id===="+this.service.getUser().id)
                if(this.Guests[i].userId==this.service.getUser().id && this.service.getEventInfo().id==this.Guests[i].eventIds[j].eventId)
                {
                    this.totalInvitationCount+=1
                }
            }
        }
        return this.totalInvitationCount;
    }

    

    getUserGuests(userId)
    {
     this.userGuests=[];
     for(var i=0;i<this.Guests.length;i++)
     {
         if(this.Guests[i].userId==userId)
         {
            this.userGuests.push(this.Guests[i])
         }
     }
     this.events.publish("fetch:user:guests",this.userGuests);
    }


    getGuestLogin(loginInfo)
    {
       var verify=false;
       for(var i=0;i<this.Guests.length;i++)
       {
        if(loginInfo.uniqueId==this.Guests[i].uniqueId)
        {
          console.log("OTP verified==="+this.Guests[i].otp);
          this.sendOtp(this.Guests[i])
          verify=true;
        }
       }
       if(!verify)
       {
        this.service.showToast2("Invalid Unique code");
        return;
       }
    }


    getGuestLoginWithoutOtp(loginInfo)
    {
        var verify=false;
        for(var i=0;i<this.Guests.length;i++)
        {
         if(loginInfo.uniqueId==this.Guests[i].uniqueId)
         {
           console.log("OTP verified==="+this.Guests[i].otp);
           this.events.publish("guest:fetch:info",this.Guests[i]);  
           verify=true;
         }
        }
        if(!verify)
        {
         this.service.showToast2("Invalid Unique code");
         return;
        }  
    }

    sendOtp(guestInfo)
    {
        // this.events.publish("guest:fetch:info",guestInfo); 
        var smsUrl="https://control.msg91.com/api/sendotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile="+guestInfo.mobile+"&otp_expiry=15"; 
        this.http.get(smsUrl)
        .map(val => val.json())
        .subscribe(data => 
        {
            // this.otpTriggered=true;
            this.events.publish("guest:fetch:info",guestInfo);  
            this.service.showToast2("Message Successfully sent to your registered number") ;
            console.log(JSON.stringify(data))
        })
        err =>
        {
            this.service.showToast2("Message Failed to send please try again"); 
            alert("Error"+err);
        }  
        //    guestInfo.otp=this.service.getRandomString(4);
       
        //    this.getOtp(guestInfo)
       
    }



    // verify(confirmationCode)
    // {
    //    this.confirmationResult.confirm(confirmationCode)
    //         .then(result => {
    //             this.service.showToast2("Successfully Logged in");
    //             this.events.publish("guest:fetch:info",this.guestInformation); 
    //           // ...
    //         }).catch(error =>{
    //             console.log("Error==="+error);
    //             this.service.showToast2(error);
    //           });
    // }
  
  
    // getOtp(guestInfo){
    //   const appVerifier = this.recaptchaVerifier;
    //   const phoneNumberString = "+91" +guestInfo.mobile;
    //   firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
    //     .then( confirmationResult => {
    //       this.guestInformation=guestInfo;
    //       this.confirmationResult=confirmationResult;
  
    //   })
    //   .catch(function (error) {
    //     this.service.showToast2("Sms Not sent");
        
        
    //     console.error("SMS not sent", error);
    //   });
    // }

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

export class UserService{
    users:any=[];

    constructor(public guestService:GuestService, public events:Events,public service:SessionService)
    {
        this.users=[{id:1,name:"Himanshu",email:"himanshukk81@gmail.com",password:"123"},
                    {id:2,name:"Shahid",email:"shahid@gmail.com",password:"123"},
                    {id:3,name:"Manoj",email:"manoj@gmail.com",password:"123"},
                    {id:4,name:"Nakul",email:"nakul@gmail.com",password:"123"},
                    {id:5,name:"Rahul",email:"rahul@gmail.com",password:"123"}
                   ] 
    }

    getUsers()
    {
        this.events.publish("fetch:users",this.users);  
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
        console.log("Budgets fetch==="+JSON.stringify(this.budgets));    
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
   constructor(public service:SessionService,public events:Events,public localNotifications:LocalNotifications){}

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
    this.events.publish('reminder:fetches',this.reminders)
    this.service.showToast2("Successfully saved")
   }

   updateReminder(reminderInfo)
   {

        for(var i=0;i<this.reminders.length;i++)
        {
            if(this.reminders[i].id==reminderInfo.id)
            {
                this.reminders[i]=reminderInfo;
            }
        }
      this.events.publish('reminder:fetches',this.reminders);
      this.service.showToast2("Successfully updated")
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
                if(this.imageInfos[i].userId==this.service.getUser().id)
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
                if(this.imageInfos[i].userId==this.service.getUser().id )
                {
                    if(this.imageInfos[i].userType==1 && info.selectedUserType==this.imageInfos[i].userType)
                    {
                        if(info.guestId!=0)
                        {
                            if(this.imageInfos[i].guestId)
                            {
                                if(info.guestId==this.imageInfos[i].guestId)
                                {
                                    imageList.push(this.imageInfos[i]); 
                                }
                            }
                            else
                            {
                                imageList.push(this.imageInfos[i]); 
                            }
                        }
                        else 
                        {
                            imageList.push(this.imageInfos[i]);  
                        }  
                    }     
                    else if(this.imageInfos[i].userType==2 && info.selectedUserType==this.imageInfos[i].userType)
                    {
                       
                                if(info.guestId!=0)
                                {
                                    if(this.imageInfos[i].guestId)
                                    {
                                        if(info.guestId==this.imageInfos[i].guestId)
                                        {
                                        imageList.push(this.imageInfos[i]); 
                                        }
                                    }
                                    else
                                    {
                                        imageList.push(this.imageInfos[i]); 
                                    }
                                }
                                else 
                                {
                                    imageList.push(this.imageInfos[i]);  
                                }



                            // if(!info.guestId || info.guestId==0)
                            // {
                            //     imageList.push(this.imageInfos[i]);  
                            // }
                            // else if(info.guestId==this.imageInfos[i].guestId)
                            // {
                            //     imageList.push(this.imageInfos[i]); 
                            // } 
                    }     
                }                     
            } 
        }
        else if(this.service.getUser().userType==2)
        {
            console.log("Current User======="+JSON.stringify(this.service.getUser()));
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
                                // if(this.imageInfos[i].imagesArray[l].sharedGuestId)
                                // {

                                   if(this.imageInfos[i].imagesArray[l].sharedGuestId==0)
                                   {
                                    newArray[0].imagesArray.push(this.imageInfos[i].imagesArray[l]);
                                   } 
                                   
                                   else if(this.service.getUser().id==this.imageInfos[i].imagesArray[l].sharedGuestId) 
                                   {
                                    newArray[0].imagesArray.push(this.imageInfos[i].imagesArray[l]); 
                                   }

                                   
                                // }  
                                // else if(this.imageInfos[i].imagesArray[l].status=='A')
                                // {
                                //     newArray[0].imagesArray.push(this.imageInfos[i].imagesArray[l]);
                                // }
                              }
                            }
                            if(newArray[0].imagesArray.length==0)
                            {
                                newArray=[]; 
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
        var selected=false;
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
                                this.imageInfos[k].imagesArray [l].sharedGuestId=guestInfo.approveGuestId;

                            }
                        }
                    }
                    selected=true;
                    images[i].imagesArray[j].selected=false;
                }
            }
        }
        // this.events.publish('fetch:images',this.imageInfos);
        if(!selected)
        {
            this.service.showToast2("Please Select At least one image");
            return;     
        }
        this.service.showToast2("Successfully approved");
        this.getFilterImages(guestInfo); 
    }
    sharedImages(imageInfo)
    {   
        this.imageInfos=this.imageInfos.concat(imageInfo);
        this.getFilterImages(imageInfo); 
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
       messageInfo.sender=true; 
       this.allMessages.push(messageInfo);
    //    this.getMessages(null);
    }


    approveMessage(messages)
    {
        for(var i=0;i<messages.length;i++)
        {
            if(messages[i].selected)
            {
                for(var j=0;j<this.allMessages.length;j++)
                {
                    if(messages[i].id==this.allMessages[j].id)
                    {
                        this.allMessages[j].status='A';
                    }
                } 
            }
        }

        this.getMessages()
    }




    getMessages()
    {
        this.userMessages=[];
        if(this.service.getUser().userType==1)
        {
            for(var i=0;i<this.allMessages.length;i++)
            {
                if(this.allMessages[i].userId==this.service.getUser().id)
                {
                    if(this.allMessages[i].senderId==this.service.getUser().id && this.allMessages[i].senderType==1)
                    {
                        this.allMessages[i].sender=true;
                        this.userMessages.push(this.allMessages[i]);  
                    }
                    else
                    {
                        this.allMessages[i].sender=false;
                        this.userMessages.push(this.allMessages[i]);  
                    }
                    
                }
            }
        }
        else 
        {
            for(var i=0;i<this.allMessages.length;i++)
            {
                if(this.allMessages[i].senderId==this.service.getUser().id && this.allMessages[i].senderType==2) 
                {
                    this.allMessages[i].sender=true;
                    this.userMessages.push(this.allMessages[i]);
                }
                else
                {
                    if(this.allMessages[i].receiverId==this.service.getUser().id && this.allMessages[i].senderType==1) 
                    {
                        this.allMessages[i].sender=false;
                        this.userMessages.push(this.allMessages[i]);
                    }  
                    else if((!this.allMessages[i].receiverId || this.allMessages[i].receiverId==0) && this.allMessages[i].status=='A')
                    {
                        if(this.allMessages[i].userId==this.service.getUser().userId)
                        {
                            this.allMessages[i].sender=false;

                            // if(this.allMessages[i].status=='P')
                            // {
                            
                            // }
                            this.userMessages.push(this.allMessages[i]);  
                        }
                    } 
                }
                 
            }
        }
        this.events.publish('messages:fetches',this.userMessages);
    }
}

@Injectable()
export class GroupImageService{
    groups:any=[{id:1,name:"Friends",userId:1,guestIds:[{"id":1},{"id":2},{"id":3},{"id":6}]},{id:2,name:"Family",userId:2,guestIds:[{"id":1},{"id":2},{"id":3},{"id":6}]}];
    allImages:any=[];
    userImages:any=[];
    filterImages:any=[];
    newArray: any = []; 
    // userImages:any=[];
    constructor(public events:Events,public service:SessionService)
    {

    }

    shareGroupImages(imageInfo)
    {
        //    this.allImages.push(imageInfo);
       this.allImages=this.allImages.concat(imageInfo);
    //    this.getGroupImages(imageInfo);

       this.events.publish('image:shared:successfully');
    }

    approvedGroupImages(selectedImagesIds)
    {
        for(var i=0;i<selectedImagesIds.length;i++)
        {
           for(var k=0;k<this.allImages.length;k++)
           {
                for(var j=0;j<this.allImages[k].imagesArray.length;j++)
                {
                    if(this.allImages[k].imagesArray[j].id==selectedImagesIds[i])
                    {
                        this.allImages[k].imagesArray[j].status='A';
                    }
                }
           } 
        }

        this.events.publish('group:image:successfully:approved'); 
    }



    getGroupImages(imageInfo)
    {
        this.filterImages=[];
        if(this.service.getUser().userType==1)
        {
         for(var i=0;i<this.allImages.length;i++)
         {
            if(this.allImages[i].groupId==imageInfo.groupId)
            {
                if(this.allImages[i].senderId==this.service.getUser().id)
                {
                   this.allImages[i].senderName="Me"; 
                   this.allImages[i].sender=true; 
                   this.filterImages.push(this.allImages[i]);
                }
                // else if((this.allImages[i].senderId!=this.service.getUser().id && this.allImages[i].userType==2))

                else if(this.allImages[i].userType==2)
                {
                    // if(this.allImages[i].senderId!=this.service.getUser().id)
                    // {

                    // }
                    // else
                    // {

                    // }

                    if(this.allImages[i].userId==this.service.getUser().id)
                    {
                        this.allImages[i].sender=false; 
                        this.filterImages.push(this.allImages[i]);   
                    }
                    
                } 
            } 
         }
        }
        else
        {
            for(var i=0;i<this.allImages.length;i++)
            {

               if(this.allImages[i].groupId==imageInfo.groupId)
               {
                    if(this.allImages[i].senderId==this.service.getUser().id)   //in this is case User admin guest can also match if it is on the first
                    {
                        if(this.allImages[i].userType==2)
                        {
                            this.allImages[i].senderName="Me"; 
                            this.allImages[i].sender=true; 
                            this.filterImages.push(this.allImages[i]); 
                        }
                        else if(this.allImages[i].userType==1)
                        {
                            this.allImages[i].sender=false; 
                            this.filterImages.push(this.allImages[i]);                             
                        }   
                    }
                    else if((this.allImages[i].senderId!=this.service.getUser().id))
                    {
                        // if(this.allImages[i].userType==1)
                        // {
                        //     this.allImages[i].sender=false; 
                        //     this.filterImages.push(this.allImages[i]);                              
                        // }
                        // else if(this.allImages[i].userType==2)
                        // {
                            for(var j=0;j<this.groups.length;j++)
                            {
                                if(this.groups[j].id==imageInfo.groupId)
                                {
                                    for(var k=0;k<this.groups[j].guestIds.length;k++)
                                    {
                                        if(this.service.getUser().id==this.groups[j].guestIds[k].id)
                                        {
                                            console.log("Image array length====="+this.allImages[i].imagesArray.length);
                                         
                                         
                                            // if(this.allImages[i].userType==1)

                                            if(this.allImages[i].userId==this.service.getUser().userId)
                                            {
                                                console.log("user id match");
                                                if(this.allImages[i].userType==1)
                                                {
                                                    this.filterImages.push(Object.assign({},this.allImages[i]));    
                                                }
                                                else if(this.allImages[i].userType==2)
                                                {
                                                    for(var l=0;l<this.allImages[i].imagesArray.length;l++)
                                                    {
                                                        console.log("Image loop======"+this.allImages[i].imagesArray[l]+"index inner loop==="+l)
                                                        if(this.allImages[i].imagesArray[l].status=='A')
                                                        {
                                                            this.allImages[i].sender=false;  
                                                            this.newArray.push(Object.assign({}, this.allImages[i]))
                                                            this.newArray[0].imagesArray=[];
                                                            this.newArray[0].imagesArray.push(this.allImages[i].imagesArray[l])
                                                            this.filterImages.push(Object.assign({},this.newArray[0]));   
                                                            this.newArray=[];
                                                        }
                                                    }  
                                                } 
                                            }
                                            
                                            
                                        }
                                    } 
                                } 
                            } 
                        // }
                         
                       
                    }  
               } 
               
            } 
        }
        
        this.events.publish('fetch:group:images',this.filterImages);
    }



}

@Injectable()

export class GroupMessageService{
    groups:any=[{id:1,name:"Friends",userId:1,guestIds:[{"id":1},{"id":2}]},{id:2,name:"Family",userId:2,guestIds:[{"id":1},{"id":2}]}];
    groupsMessages:any=[];
    filterGroupMessageInfo:any={};
    filterGroupMessages:any=[];
    pendingMessages:number=0;
    constructor(public events:Events,public service:SessionService,public guestService:GuestService)
    { }
    createGroup(groupInfo)
    {
      this.groups.push(groupInfo);
      this.events.publish('group:created',this.groups);    
    }
    getGroups(type)
    {
        if(type==1)
        {
            this.events.publish('fetch:groups',this.groups);    
        }
        else if(type==2)
        {
            this.events.publish('fetch:groups1',this.groups);    
        }
        
    }
    sendGroupMessage(groupMessageInfo)
    {
       this.groupsMessages.push(groupMessageInfo)
       this.getGroupMessages(groupMessageInfo)

    }

    approveGroupMessages(groupMessageIds)
    {
        for(var i=0;i<groupMessageIds.length;i++)
        {
            for(var j=0;j<this.groupsMessages.length;j++)
            {
               if(groupMessageIds[i]==this.groupsMessages[j].id)
               {
                this.groupsMessages[j].status='A'; 
               }     
            } 
        }
        this.events.publish('group:message:approve')
    }
    getGroupMessages(groupInfo)
    {
      this.filterGroupMessageInfo.filterGroupMessages=[];  
      this.filterGroupMessageInfo.pending=0;
    //   this.filterGroupMessages=[];  
      if(this.service.getUser().userType==1)
        {
            for(var i=0;i<this.groupsMessages.length;i++)
            {
                if(this.groupsMessages[i].groupId==groupInfo.groupId &&
                     
                     this.groupsMessages[i].userId==this.service.getUser().id && 
                     
                     (this.groupsMessages[i].senderId==this.service.getUser().id && this.groupsMessages[i].senderType==1))
                {
                    this.groupsMessages[i].sender=true;
                    this.filterGroupMessageInfo.filterGroupMessages.push(this.groupsMessages[i])
                }
                else if(this.groupsMessages[i].groupId==groupInfo.groupId && this.groupsMessages[i].userId==this.service.getUser().id && (this.groupsMessages[i].senderId!=this.service.getUser().id || this.groupsMessages[i].senderType==2))
                {
                    // this.pendingMessages++;
                    this.groupsMessages[i].sender=false;

                    if(this.groupsMessages[i].status=='P')
                    {
                        this.filterGroupMessageInfo.pending++; 
                    }
                    
                    this.filterGroupMessageInfo.filterGroupMessages.push(this.groupsMessages[i])
                    // this.filterGroupMessages[0].pending=true;
                    
                }
            }
        }   
      else
        {
            for(var i=0;i<this.groupsMessages.length;i++)
            {
                console.log("Message info========="+JSON.stringify(this.service.getUser()));
              
                console.log(i +" index "+this.groupsMessages[i].groupId);
                console.log(i +" index "+this.groupsMessages[i].senderId);
                console.log(i +" index "+this.service.getUser().id);
                console.log(i +" index "+this.groupsMessages[i].senderType);
                if(this.groupsMessages[i].senderId==this.service.getUser().id && this.groupsMessages[i].senderType==2)
               {
                   this.groupsMessages[i].sender=true;
                   this.filterGroupMessageInfo.filterGroupMessages.push(this.groupsMessages[i])
               }
            //    else  if(this.groupsMessages[i].groupId==groupInfo.groupId && (this.groupsMessages[i].senderId==this.service.getUser().userId && this.groupsMessages[i].senderType==1))
            //    {
                   
            //        this.groupsMessages[i].sender=false;
            //        this.filterGroupMessages.push(this.groupsMessages[i])
            //    }
               else if(this.groupsMessages[i].status=='A')
               {
                   for(var j=0;j<this.groups.length;j++)
                   {
                      if(this.groups[j].id==groupInfo.groupId)
                      {
                         for(var k=0;k<this.groups[j].guestIds.length;k++)
                         {
                             if(this.service.getUser().id==this.groups[j].guestIds[k].id)
                             {
                                this.groupsMessages[i].sender=false;
                                this.filterGroupMessageInfo.filterGroupMessages.push(this.groupsMessages[i]) 
                             }
                         } 
                      } 
                   }    
               }
             
            }
        }    
      this.events.publish('fetch:group:messages',this.filterGroupMessageInfo);
    }
}





    