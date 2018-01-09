import { Component,ViewChild } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from '../../app/sessionservice';
import { GuestService } from '../../app/sessionservice';

import { HomePage } from '../home/home';

import { GuestInvitationPage } from '../guest-invitation/guest-invitation';

import { Observable } from 'rxjs/Observable';
import { Nav, Platform,AlertController,NavController,NavParams,MenuController,ModalController,ViewController} from 'ionic-angular';
import {Events,ToastController } from 'ionic-angular';
import { LoginService } from '../../app/sessionservice';
import { NativeStorage } from '@ionic-native/native-storage';

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
    constructor(public guest:GuestService,public nativeStorage:NativeStorage,public menu: MenuController,public navParams: NavParams,public navCtrl:NavController, public loginservice:LoginService,public http: Http,public events:Events,public service:SessionService){
    this.user={};
    this.menu.swipeEnable(false);

    if(this.service.getUser())
    {
      this.userTypeId=this.service.getUser().userType;
    }
    else 
    {
      this.userTypeId=this.navParams.get('id');
    }
     
    //  alert("sdfsdf"+this.navParams.get('id'));
  }

  ionViewDidLoad()
  {

    this.service.setUser(null);
    this.nativeStorage.clear();
    this.guests=this.guest.getGuests();
    
    this.events.subscribe('login:success', user => {
      this.loader=false;
      user.userType=this.userTypeId;
      this.events.publish('menu:load',user);
      this.service.setUser(user)
      this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    })
    
    console.log("Ion view load");
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
     this.loginservice.login(this.user);

  }

  getOtp()
  {
    

    if(!this.guestId)
    {
      this.service.showToast2("Please Choose your name") ;
      return;
    }
    this.guestInfo.userType=this.userTypeId;
    this.guestInfo.id=this.guestId;
    for(var i=0;i<this.guests.length;i++)
    {
      if(this.guests[i].id==this.guestInfo.id)
      {
        this.guestInfo.mobile=this.guests[i].mobile;
      }
    }

    
    // this.events.publish('login:success',this.guestInfo);
    // this.service.setUser(this.guestInfo);
    // this.navCtrl.setRoot(GuestInvitationPage);
    // this.navCtrl.popToRoot();
    
      var mobile="91"+this.guestInfo.mobile;
      var smsUrl="https://control.msg91.com/api/sendotp.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile="+mobile+"&otp_expiry=15"; 
      this.http.get(smsUrl)
      .map(val => val.json())
      .subscribe(data => 
       {
         this.otpTriggered=true;
         this.service.showToast2("Message Successfully sent to your registered number") ;
         console.log(JSON.stringify(data))
       })
      err =>
       {
        this.service.showToast2("Message Failed to send please try again"); 
        alert("Error"+err);
       } 
  }
 
  verifyOtp()
  {
    var mobile="91"+this.guestInfo.mobile;
    var smsUrl="https://control.msg91.com/api/verifyRequestOTP.php?authkey=169096A9g9vil6eKqv598ab8f0&mobile="+mobile+"&otp="+this.guestInfo.otp; 
    this.http.get(smsUrl)
     .map(val => val.json())
     .subscribe(data => 
       {
         this.guestInfo.userType=this.userTypeId;
         this.service.showToast2("Successfully verified");
         this.events.publish('login:success',this.guestInfo);
         this.service.setUser(this.guestInfo);
         this.navCtrl.setRoot(GuestInvitationPage);
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




