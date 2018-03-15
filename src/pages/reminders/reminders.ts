import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,AlertController,Platform,Events  } from 'ionic-angular';
import { SessionService,ReminderService} from '../../app/sessionservice';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Event } from '_debugger';
var moment = require('moment');

// import { Event } from '_debugger';

/**
 * Generated class for the RemindersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reminders',
  templateUrl: 'reminders.html',
})
export class RemindersPage {
  reminder:any={};
  reminderList=[];
  loader:boolean;
  notifications:any=[];
  timeCounter:number=0;
  constructor(public platform:Platform, public localNotifications:LocalNotifications, public events:Events,public reminderService:ReminderService, public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  //  this.loader=true;
  }

  ionViewDidLoad() {
    var day=moment(new Date()).set('year', 2019).format('MMMM Do YYYY, h:mm:ss a');
    console.log("Hour==="+moment().get('hour')); 
    console.log("Day======="+day);


    console.log("Unix time==="+moment(new Date()));

    console.log("New time==="+new Date(moment(new Date())))
    setTimeout(() => {  
      this.reminderService.getReminders()            
    },100); 

      this.events.unsubscribe('refresh:reminder:list');
      this.events.subscribe('refresh:reminder:list', reminders=> {        
        this.reminderService.getReminders();
      })
      
      this.events.unsubscribe('reminder:fetches');
      this.events.subscribe('reminder:fetches', reminders=> {        
        this.reminderList=reminders;

              this.notifications=[]; 
        
             
              this.platform.ready().then(() => {
                this.localNotifications.cancelAll().then(() => {   
                    console.log("Reminder list===="+JSON.stringify(this.reminderList));
                    
                  //   var ReminderMinute=moment(new Date(this.reminderList[i].at)).get('minute');
                  //   for(var i=0;i<this.reminderList.length;i++)
                  //   {
                  //       if(this.timeCounter<4)
                  //       {
                  //         ReminderMinute=ReminderMinute-1;
                  //         var day=moment(new Date(this.reminderList[i].at)).set('minute',ReminderMinute).format('MMMM Do YYYY, h:mm:ss a'); 
                  //         this.notifications.push({"id":i,"title":this.reminderList[i].title,"text":this.reminderList[i].name,
                  //       "at":day})
                  //         this.timeCounter++;
                  //       }
                        
                  //       // console.log("Notify Time===="+i+"  "+new Date(this.reminderList[i].at).getTime());
                  //   }
                  //   console.log("Notify Data==="+JSON.stringify(this.notifications));
                  //   // alert("Notfications=="+JSON.stringify(this.notifications));
                  //   this.localNotifications.schedule(this.notifications);
                  //   // alert("Local Notification data=="+JSON.stringify(this.localNotifications));
                  //   console.log("Local Notify data==="+JSON.stringify(this.localNotifications));

                      for(var i=0;i<this.reminderList.length;i++)
                      {
                        var ReminderMinute=moment(new Date(this.reminderList[i].at)).get('minute');
                        for(var j=0;j<3;j++)
                        {
                          
                            
                            var day=moment(new Date(this.reminderList[i].at)).set('minute',ReminderMinute); 
        
                            console.log("new Date format========"+day);
                            this.notifications.push({"id":i*3+j,"title":this.reminderList[i].title,"text":this.reminderList[i].name,
                          "at":new Date(day)})
                            ReminderMinute=ReminderMinute-1;
                        }
                      }
                      this.localNotifications.schedule(this.notifications);
                      console.log("Reminder Time======"+JSON.stringify(this.notifications));
                      console.log("Local Notifications======"+JSON.stringify(this.localNotifications));
                  })
              }); 
      })
  
        console.log('ionViewDidLoad RemindersPage');
  }

  
  enableNotification()
  {
    this.platform.ready().then(() => { 
      this.localNotifications.cancelAll().then(() => {   
          for(var i=0;i<3;i++)
          {
            this.notifications.push({"id":i,"title":"helloo=="+i,"text":"helllooo==="+i,"at":new Date().getTime() + (10+i*10)*1000})            
          }
          console.log("Notfications=="+JSON.stringify(this.notifications));
          this.localNotifications.schedule(this.notifications);
          console.log("Local Notify data==="+JSON.stringify(this.localNotifications));
        })
      }); 
      // this.loader=false;
  }

  reminderDetail(reminder)
  {
    this.service.setReminder(reminder);
    let profileModal = this.modalCtrl.create(ManageRemindersPage);
    profileModal.present();
  }

  removeReminder(reminder)
  {
    this.reminderService.deleteReminder(reminder);     
    
  }


  addReminder()
   {
    
    this.service.setReminder(null);
    let profileModal = this.modalCtrl.create(ManageRemindersPage);
    profileModal.present();
   }

}

@Component({
  selector: 'page-manage-reminders',
  templateUrl: 'manage-reminders.html',
})
export class ManageRemindersPage {
  reminder:any={};
  loader:any;
  update:boolean;
  notifications:any=[];
  remindersList:any=[];
 
  
  constructor(public events:Events,public reminderService:ReminderService,public platform: Platform,public alertCtrl:AlertController,public localNotifications:
    LocalNotifications,public viewCtrl:ViewController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLeave()
  {
    console.log("Page leave now")
    this.events.publish('refresh:reminder:list')
  }

  ionViewDidLoad() {

    // this.reminder.hour=new Date().getHours();
    // this.reminder.minute=new Date().getMinutes();
    // var Hour=moment(new Date()).get('hour');
    // var Minute=moment(new Date()).get('minute');

    // moment(new Date()).set('minute',Minute+30); 
    // moment(new Date()).set('hour',Hour+5); 

    // this.reminder.time=new Date(moment());
    console.log("reminder time==="+this.reminder.time);
    if(this.service.getReminder())
    {
      this.update=true;
      this.reminder=this.service.getReminder();
    }
    else
    {
      this.reminder={};
      this.update=false;
    }
    console.log('ionViewDidLoad ManageBudgetsPage');
  }

  timeChange(time){
    this.reminder.hour = time.hour.value;
    this.reminder.minute = time.minute.value;

    console.log("Time===="+JSON.stringify(time));

  
  }


  // pushData()
  // {
  //   this.reminder.hour=this.reminder.time.split(":")[0];
  //   this.reminder.minute=this.reminder.time.split(":")[1];
  //   // this.reminder.date=new Date(this.reminder.date).setHours(this.reminder.hour);
  //   // this.reminder.date=new Date(this.reminder.date).setMinutes(this.reminder.minute);
  //   let firstNotificationTime = new Date();

  //   console.log("reminder time===="+JSON.stringify(this.reminder));
  //   firstNotificationTime.setHours(this.reminder.hour);
  //   firstNotificationTime.setMinutes(this.reminder.minute);
  //   this.reminder.createDate=new Date();
  //   this.reminder.id=this.service.getRandomString(4);
  //   this.reminder.at=firstNotificationTime;
  //   this.notifications.push(this.reminder);
  //   this.reminder={};

  //   console.log("Notificatin array===="+JSON.stringify(this.notifications));
  
  //   // this.closeModal();


  // }
  saveReminderInfo()
  {
    this.reminder.hour=this.reminder.time.split(":")[0];
    this.reminder.minute=this.reminder.time.split(":")[1];
    let firstNotificationTime = new Date(this.reminder.date);
    console.log("reminder time===="+JSON.stringify(this.reminder));
    firstNotificationTime.setHours(this.reminder.hour);
    firstNotificationTime.setMinutes(this.reminder.minute);
    this.reminder.createDate=new Date();
    this.reminder.id=this.service.getRandomString(4);
    this.reminder.at=firstNotificationTime;
    this.reminder.status="P";
    this.reminderService.saveReminder(this.reminder);
    this.closeModal();
  }


  updateReminderInfo()
  {
    this.reminder.hour=this.reminder.time.split(":")[0];
    this.reminder.minute=this.reminder.time.split(":")[1];
    let firstNotificationTime = new Date(this.reminder.date);
    console.log("reminder time===="+JSON.stringify(this.reminder));
    firstNotificationTime.setHours(this.reminder.hour);
    firstNotificationTime.setMinutes(this.reminder.minute);
    this.reminder.modifiedDate=new Date();
    this.reminder.at=firstNotificationTime;
    this.reminderService.updateReminder(this.reminder);
    this.closeModal();
  }
  
  
  setNotification()
  {
    console.log("After update:::"+new Date(this.reminder.date));   
    for(var i=0;i<this.remindersList.length;i++)
    {
      this.notifications.push(this.remindersList[i]);
    }                                                                     
      this.localNotifications.cancelAll().then(() => {
                   this.loader=false;         
                   this.localNotifications.schedule(this.notifications);
                   this.notifications=[];
                   var message="You have set Reminder";
                   this.closeModal();
               });
  }

 
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}

