import { Component,ViewChild } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from '../../app/sessionservice';
import { HomePage } from '../home/home';
import { SharePhotoPage } from '../share-photo/share-photo';
import { GuestInvitationPage } from '../guest-invitation/guest-invitation';
import { Observable } from 'rxjs/Observable';
import { Nav, Platform,AlertController,NavController,NavParams,MenuController,ModalController,ViewController} from 'ionic-angular';
import {Events,ToastController } from 'ionic-angular';
import { LoginService,GuestService,UserService } from '../../app/sessionservice';
import { NativeStorage } from '@ionic-native/native-storage';
import { MessagesPage } from '../messages/messages';
import { EventsPage} from '../events/events';

@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  user:any;
  loader:any;
  userStatus:boolean;
  firstTimeUser:any;
  userTypeId:any;
  guests:any;
  guestInfo:any={};
  otpTriggered:boolean=false;
  guestId:any;
  users:any;
  userGuests:any=[];
  otp:any;
  guest:any={};
  otpSent:boolean=false;
    constructor(public userservice:UserService,public guestService:GuestService,public nativeStorage:NativeStorage,public menu: MenuController,public navParams: NavParams,public navCtrl:NavController, public loginservice:LoginService,public http: Http,public events:Events,public service:SessionService){
    this.user={};
    this.menu.swipeEnable(false);
    this.userTypeId=this.navParams.get('id');
    console.log("user type id==="+this.userTypeId);
  }

  ionViewDidLoad()
  {
    setTimeout(() => {  
      if(this.userTypeId==2)
      {
        this.userservice.getUsers()
      }
    },100);
    
    this.events.unsubscribe('login:success')
    this.events.subscribe('login:success', user => {
      this.loader=false;
      user.userType=this.userTypeId;
      this.events.publish('menu:load',user);
      this.service.setUser(user)
      if(this.service.getUser().userType==1)
      {
        this.navCtrl.setRoot(HomePage);
      }
      else 
      {
        this.navCtrl.setRoot(EventsPage);
      }
      this.navCtrl.popToRoot();
    })


    this.events.subscribe('guest:fetch:info', guestInfo => {
      this.loader=false;
      this.service.setUser(guestInfo)
      this.guestInfo=guestInfo;
      this.otpSent=true;
      this.events.publish('login:success',this.guestInfo);
    })

    
    this.events.subscribe('fetch:guests', guests => {
      this.guests=guests;
      this.loader=false;
      
    })

    this.events.subscribe('fetch:users', users => {
      this.users=users;
      this.loader=false;
    })

    this.events.subscribe('fetch:user:guests',userGuests1 => {
      this.userGuests=userGuests1;
      this.loader=false;
    })
    console.log("Ion view load");
  }
  

  getGuestList(info)
  {
    console.log("info===="+JSON.stringify(info));
    this.guestService.getUserGuests(this.guestInfo.userId);
  }
  login()
  {    
    //  alert("Callll");
     if(!this.user.email)
     {
      this.service.showToast2("Please Enter Email");
      return;
     }

     if(!this.user.password)
     {
      this.service.showToast2("Please Enter Password");
      return;
     }
     this.loader=true;
     this.loginservice.login(this.user,"u");
  }
  getOtp1()
  {
    this.loginservice.login(this.guestInfo,"g");    
  }


  getOtp()
  {
    this.guestService.getGuestLoginWithoutOtp(this.guestInfo)
  }
  verifyOtp()
  {
    var mobile=this.guestInfo.mobile;
    this.otpSent=false;
    var smsUrl="https://control.msg91.com/api/verifyRequestOTP.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile="+mobile+"&otp="+this.guestInfo.otp; 
    this.http.get(smsUrl)
     .map(val => val.json())
     .subscribe(data => 
       {
         this.guestInfo.userType=this.userTypeId;
         this.service.showToast2("Successfully verified");
         this.events.publish('login:success',this.guestInfo);
         this.service.setUser(this.guestInfo);
         this.navCtrl.setRoot(EventsPage);
         this.navCtrl.popToRoot();
         console.log(JSON.stringify(data))
       })
      err =>
       {
        this.service.showToast2("Failed to verify otp please try again"); 
        alert("Error"+err);
       } 
  }  

  
}




