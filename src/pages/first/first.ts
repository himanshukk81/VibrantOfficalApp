import { Component,ViewChild,NgZone } from '@angular/core';
import {NavController, NavParams,Nav,AlertController,Events } from 'ionic-angular';
import { LoginPage } from '../../pages/Login/Login';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable,AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { SessionService } from '../../app/sessionservice';
var moment = require('moment');


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
  currentDate:any;
  constructor(public service:SessionService, public ngZone:NgZone, public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {
   this.userButtonColor="light";
   this.joinneButtonColor="light"; 
   this.pushPage=LoginPage;
   this.joinneButtonColor="light";
   
  }

  ionViewDidLoad() {

    // var day = moment(new Date());
    // var tommorow= new Date().getMonth()
    // moment().set('year', 2019);
    var day=moment(new Date()).set('year', 2019).format('MMMM Do YYYY, h:mm:ss a');
    console.log("Hour==="+moment().get('hour')); 
    console.log("Day======="+day);


    console.log("Unix time==="+moment(new Date()));
    this.userInfo.phoneNumber=9971672881;
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
}
