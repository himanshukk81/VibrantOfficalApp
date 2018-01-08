import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,AlertController,Platform  } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  reminders: FirebaseListObservable<any[]>;
  constructor(public db: AngularFireDatabase,public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
    this.reminders=this.db.list('/reminders');

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemindersPage');
  }

  reminderDetail(reminder)
  {
    this.service.setReminder(reminder);
    // this.navCtrl.push(ManageBudgetsPage);
    let profileModal = this.modalCtrl.create(ManageRemindersPage);
    profileModal.present();
  }

  removeReminder(reminder)
  {
    // this.db.list('/budget').delete();
    this.db.object('/reminders/' + reminder.$key).remove().then(()=>{
      console.log("Successfully deleted");
    },error=>{
      console.log("failed to deleted");
    })
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
  
  constructor(public platform: Platform,public alertCtrl:AlertController,public localNotifications:
    LocalNotifications,public viewCtrl:ViewController,public db: AngularFireDatabase,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {

    this.db.list('/reminders', { preserveSnapshot: true})
    .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          this.remindersList.push(snapshot.val());
          // console.log("85 line======"+snapshot.key, snapshot.val());
        });
    })
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

  saveReminderInfo()
  {


    // console.log("time===="+JSON.stringify(this.reminder));
    // console.log("time==="+this.reminder.time);


    // console.log("Before update:::"+this.reminder.date)
    //  console.log("Notifications to be scheduled: ", new Date(this.notifications[0].at));

    this.reminder.hour=this.reminder.time.split(":")[0];
    this.reminder.minute=this.reminder.time.split(":")[1];

    this.reminder.date=new Date(this.reminder.date).setHours(this.reminder.hour);
    this.reminder.date=new Date(this.reminder.date).setMinutes(this.reminder.minute);
    this.db.list('/reminders').push(this.reminder).then(({key}) => 
    {
      this.reminder.key=key;
      this.updateKey()
    },error=>{
      this.loader=false;
      this.service.showToast2("Something went wrong please try again");
      // this.service.showToast2("Something went wrong please try again");
    })
  }
  
 
  updateKey()
  {
      this.db.object('/reminders/'+this.reminder.key).update(this.reminder).then((profile: any) =>{
            
            

            this.setNotification();
            
            console.log("Successfully updated reminders====");
        })
      .catch((err: any) => {
          this.loader=false;
          this.service.showToast2("Something went wrong please try again");
      });
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

  updateReminderInfo()
  {
    this.reminder.modifiedDate=new Date();
    this.loader=true;
    this.updateKey();

  }
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}

