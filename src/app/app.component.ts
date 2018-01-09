import { Component, ViewChild,ElementRef } from '@angular/core';
import { Nav, Platform,AlertController,NavController,NavParams,Events} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SessionService } from './sessionservice';
import { LoginPage } from '../pages/Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { profile } from '../pages/profile/profile';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UsersPage } from '../pages/users/users';
import { BudgetsPage} from '../pages/budgets/budgets';
import { FunctionsPage} from '../pages/functions/functions';
import { RemindersPage} from '../pages/reminders/reminders';
import { EventsPage} from '../pages/events/events';
import { Places} from '../pages/events/events';
import { FirstPage} from '../pages/first/first';
import { GuestInvitationPage} from '../pages/guest-invitation/guest-invitation';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(NavController) navCtrl: NavController;
  rootPage: any=FirstPage;
  headers:any;
  pages: Array<{title: string, component: any}>;

  constructor(public events:Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public service:SessionService,public native:NativeStorage,public sharing:SocialSharing,public alertCtrl:AlertController  
    ,public nativeStorage:NativeStorage,public network:Network,public localNotifications:LocalNotifications,public http:Http) {
    this.events.subscribe('menu:load', user => {
      if(user.userType==1)
      {
        this.pages = [
          { title: 'Home', component: HomePage},
          {title:'Share Photo',component:HomePage},
          {title:'Users',component:UsersPage},
          {title:'Profile',component:profile},
          {title:'Budgets',component:BudgetsPage},
          {title:'Functions',component:FunctionsPage},
          {title:'Reminders',component:RemindersPage},
          {title:'Logout',component:LoginPage},
    
        ];
      } 
      else
      {
        this.pages = [
          {title:'Home',component:GuestInvitationPage},
          {title:'Users',component:UsersPage},
          {title:'Profile',component:profile},
          {title:'Logout',component:LoginPage}
          
        ];
      } 
    })

  }
  

  ionViewDidLoad()
  {
   
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.checkUserStatus();
      // this.initPushNotification();
      this.checkNetwork();
      this.initLocalNotification();
      // this.enableLocation();
      this.initLocalNotification();
    });
  }
 
  checkNetwork()
  {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      var message="Your Are Offline";
    });
    let connectSubscription = this.network.onConnect().subscribe(() => {
    var message="Your Are Online";
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          var message="You Got Wifi Connection"
        }
      }, 3000);
    });
  }   
  checkUserStatus()
  {
    //  this.service.showToast("Checking User status");  
     this.native.getItem('userInfo')
        .then
        ( 
            data =>
            {
                if(data)
                {
                  // this.service.showToast("Data===");  
                  this.rootPage=HomePage;
                  this.events.publish('menu:load',data);
                  this.service.setUser(data);

                }
                else
                {
                  this.service.showToast("No Data===");
                  this.rootPage=LoginPage;
                }       
            },
            error =>{
              // alert("Errror="+error)
              let error2="Error="+error;
              this.service.showToast("Error="+error2);
              this.rootPage=LoginPage;
            }  
        );
  }

  initLocalNotification()
  {
    this.localNotifications.on('click', () => {

      console.log("Notify local notification");
      // alert("Notificy")
      // let json = JSON.parse(notification.data);
      this.rootPage=RemindersPage;
    })
  }
  // initPushNotification()
  // {

  //   this.fcm.subscribeToTopic('Notification');

  //   this.fcm.getToken().then(token=>{
  //     // alert("token=="+token);  
  //     console.log("token=="+JSON.stringify(token));

  //     this.service.setToken(token);
  //   }).catch( (e) => {
  //       // alert("error"+e);
  //       // //alert(JSON.stringify(e));
  //       });

  //   this.fcm.onNotification().subscribe(data=>{
  //     this.service.setOtherUserInfo(data);
  //     if(data.wasTapped){
  //           this.navCtrl.push(UserDetailPage);
  //         // alert("recieved notification=="+JSON.stringify(data));
  //     } else {
  //           this.navCtrl.push(UserDetailPage);
  //       //  alert("received notification without tap=="+JSON.stringify(data))
  //     };
  //   })

  //   this.fcm.onTokenRefresh().subscribe(token=>{
  //       console.log("refresh token==="+JSON.stringify(token));
  //       this.service.setToken(token);
  //   })

  //   this.fcm.unsubscribeFromTopic('Notification');
  // }
  openPage(page) {
      if(page.title=="Logout")
      {
        this.presentConfirm();
      }
      else
      {
        this.nav.setRoot(page.component);
      }
  }
  presentConfirm()
  {
    let alert = this.alertCtrl.create({
      title: 'LogOut',
      message: 'Are You Sure you want to Logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            // console.log('Buy clicked');
            // this.native.clear()        
              // .then(()=>{
                // this.service.setUser(null);
                // this.nativeStorage.clear();
                this.nav.setRoot(LoginPage);
                this.nav.popToRoot();
              },
        }
      ]
    })    
    alert.present();
  }
}
