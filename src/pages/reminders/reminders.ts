import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,AlertController,Platform,Events  } from 'ionic-angular';
import { SessionService,ReminderService} from '../../app/sessionservice';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Event } from '_debugger';

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
  constructor(public platform:Platform, public localNotifications:LocalNotifications, public events:Events,public reminderService:ReminderService, public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  //  this.loader=true;
  }

  ionViewDidLoad() {

    setTimeout(() => {  
      this.reminderService.getReminders()            
    },100); 

       this.events.unsubscribe('reminder:fetches');
      this.events.subscribe('reminder:fetches', reminders=> {        
        this.reminderList=reminders;

        this.platform.ready().then(() => {
          // alert("dssdfsd") ;
          this.localNotifications.cancelAll().then(() => {   
              console.log("Reminder list===="+JSON.stringify(this.reminderList));
              for(var i=0;i<this.reminderList.length;i++)
              {
                   this.notifications.push({"id":i,"title":this.reminderList[i].title,"text":this.reminderList[i].name,
                   "at":new Date(this.reminderList[i].at).getTime()})
                  console.log("Notify Time===="+i+"  "+new Date(this.reminderList[i].at).getTime());
              }
              console.log("Notify Data==="+JSON.stringify(this.notifications));
              // alert("Notfications=="+JSON.stringify(this.notifications));
              this.localNotifications.schedule(this.notifications);
              // alert("Local Notification data=="+JSON.stringify(this.localNotifications));
              console.log("Local Notify data==="+JSON.stringify(this.localNotifications));
            })
          }); 
        //   this.loader=false;
        })
  
        console.log('ionViewDidLoad RemindersPage');
  }

  getAll()
  {
     console.log("alll===="+JSON.stringify(this.localNotifications.getAllScheduled()));
  }
  enableNotification()
  {
    this.platform.ready().then(() => { 
      this.localNotifications.cancelAll().then(() => {   

        // this.notifications.push({"id":this.service.getRandomString(4),"title":"old Data","text":"this is text","at":"Mon Jan 15 2018 15:07:00 GMT+0530"})
        // this.notifications.push({"id":this.service.getRandomString(4),"title":"New Data","text":"this is new text","at":"Mon Jan 15 2018 15:08:00 GMT+0530"})


        
          for(var i=0;i<3;i++)
          {
            this.notifications.push({"id":i,"title":"helloo=="+i,"text":"helllooo==="+i,"at":new Date().getTime() + (10+i*10)*1000})            
          }
          // alert("Notfications=="+JSON.stringify(this.notifications));
          console.log("Notfications=="+JSON.stringify(this.notifications));
          this.localNotifications.schedule(this.notifications);
          // alert("Local Notification data=="+JSON.stringify(this.localNotifications));
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
  // myDate:any=new Date();
  // tzoffset:any = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
  
  constructor(public reminderService:ReminderService,public platform: Platform,public alertCtrl:AlertController,public localNotifications:
    LocalNotifications,public viewCtrl:ViewController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {

    
    this.platform.ready().then((readySource) => {
      // this.localNotifications.on('click', (notification, state) => {
      //   // let json = JSON.parse(notification.data);
      //   let alert = alertCtrl.create({
      //     title: notification.title,
      //     subTitle:notification.text
      //   });
      //   alert.present();
      // })
      // this.remindersList=this.db.list('/reminders');

      
      // this.remindersList.forEach(element => {
        
      //         alert(element);
      //         console.log(element);
      //        });
    });
    // console.log("date:::"+this.myDate);
    // this.reminder.time=(new Date(Date.now() - this.tzoffset)).toISOString().slice(0,-1);
  }

  ionViewDidLoad() {

    // this.reminder.hour=new Date().getHours();
    // this.reminder.minute=new Date().getMinutes();

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

  // timeChange(time){
  //   this.reminder.hour = time.hour.value;
  //   this.reminder.minute = time.minute.value;

  //   console.log("Time===="+JSON.stringify(time));

  
  // }


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
    let firstNotificationTime = new Date();
    console.log("reminder time===="+JSON.stringify(this.reminder));
    firstNotificationTime.setHours(this.reminder.hour);
    firstNotificationTime.setMinutes(this.reminder.minute);
    this.reminder.createDate=new Date();
    this.reminder.id=this.service.getRandomString(4);
    this.reminder.at=firstNotificationTime;
    // this.notifications.push(this.reminder);
   
    this.reminderService.saveReminder(this.reminder);
    this.closeModal();

    // for(var i=0;i<3;i++)
    // {
    //   this.notifications.push({"id":i,"title":"helloo=="+i,"text":"helllooo==="+i,"at":new Date(new Date().getTime() + (10+i*10)*1000)}) 
    // }

    // this.reminderService.saveReminder(this.notifications);
    // this.closeModal();
    
  }
  
  
  setNotification()
  {

   
    // this.reminder.date=new Date(this.reminder.date);
    console.log("After update:::"+new Date(this.reminder.date));

    // let notification = {
    //     id: new Date(this.reminder.date).getDay(),
    //     title: 'Reminder!',
    //     text: this.reminder.name,
    //     at: this.reminder.date
    //     // sound:'file://assets/sounds/sounds.ogg'
    // };
    // this.remindersList.forEach(element => {

    //   alert(element);
    //   console.log(element);
    //  });
    
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
      
      
      
      // this.service.showToast(message);
      
  }

 
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}

