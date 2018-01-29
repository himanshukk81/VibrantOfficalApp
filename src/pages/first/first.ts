import { Component,ViewChild,NgZone } from '@angular/core';
import {NavController, NavParams,Nav,AlertController,Events } from 'ionic-angular';
import { LoginPage } from '../../pages/Login/Login';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable,AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {
  @ViewChild(Nav) nav: Nav;
  
  userButtonColor:any;
  joinneButtonColor:any;
  selectedUserInfo:any;
  pushPage:any;
  params:any={};
  user:any={};
  userInfo:any={};
  phoneNumber:number;

  confirmationResult:any;

  otpReceived:boolean=false;
  // public recaptchaVerifier:firebase.auth.RecaptchaVerifier;
  constructor(public service:SessionService, public ngZone:NgZone, public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
   this.userButtonColor="light";
   this.joinneButtonColor="light"; 
   this.pushPage=LoginPage;
  // //  this.selectedUserInfo="1";
  // //  this.params={id:this.selectedUserInfo};
  //   this.userButtonColor="secondary";
    this.joinneButtonColor="light";
   
  }

  ionViewDidLoad() {
    // this.user.name="Himanshu";
    // this.user.email="Himanshukk81@gmail.com";
    // this.db.list('user_detail').push(this.user);

    this.userInfo.phoneNumber=9971672881;
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    console.log('ionViewDidLoad FirstPage');
  }

  selectedUser(user)
  {
    this.selectedUserInfo=user;
    this.params.id=this.selectedUserInfo;
    if(user==1)
    {
      this.userButtonColor="secondary";
      this.joinneButtonColor="light";
    }
    else
    {
      this.joinneButtonColor="secondary"; 
      this.userButtonColor="light";
    }
  }


  // verify()
  // {
  //    console.log("User info 75===="+JSON.stringify(this.userInfo));
  //    console.log("User info 77===="+JSON.stringify(this.userInfo));
  //    console.log("Verifying otp==============");
  //   //  var confirmation=this.confirmationResult;
  //    this.confirmationResult.confirm(this.userInfo.confirmationCode)
  //         .then(result => {
  //           // User signed in successfully.
  //           console.log("user info===="+result.user);  
  //           // this.next(error) 
  //           // console.log("User info Success===="+JSON.stringify(this.userInfo));
  //             this.service.showToast2("Successfully Logged in");
  //           // ...
  //         }).catch(error =>{
  //             // console.log("User info error===="+JSON.stringify(this.userInfo));

  //             console.log("Error==="+error);
              
  //             this.service.showToast2(error);
  //           });
  // }


  // getOtp(){
  //   const appVerifier = this.recaptchaVerifier;
  //   const phoneNumberString = "+91" +this.userInfo.phoneNumber;
  //   // firebase.auth().signInWithPhoneNumber(phoneNumberString, appVerifier)
  //     firebase.auth().signInWithPhoneNumber(phoneNumberString,appVerifier)
  //     .then( confirmationResult => {
  //       this.confirmationResult=confirmationResult;

  //   })
  //   .catch(error => {
  //     this.service.showToast2("Sms Not sent");
  //     console.error("SMS not sent", error);
  //   });
  // }   
}
