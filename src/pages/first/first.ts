import { Component,ViewChild,NgZone } from '@angular/core';
import {NavController, NavParams,Nav,AlertController,Events } from 'ionic-angular';
import { LoginPage } from '../../pages/Login/Login';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable,AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { SessionService } from '../../app/sessionservice';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
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
  //var messageInfo="Hi this is me";
  headers:any;

  constructor(public http:Http,public service:SessionService, public ngZone:NgZone, public db:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController) {

  this.headers = new Headers({'Content-Type':'application/json'});  
  
  
  


   this.userButtonColor="light";
   this.joinneButtonColor="light"; 
   this.pushPage=LoginPage;
   this.joinneButtonColor="light";

  //  this.userInfo.date="02/13/2017";  
  //  this.userInfo.date=new Date();
   
  //  var hour=moment(new Date()).get('hour');
  //  var minute=moment(new Date()).get('minute'); 
  // //  hour+=5;
  //  minute+=30;
  //  var currentDate=moment(new Date()).set('hour', hour,'minute', minute)


  //  console.log("Set Date========"+new Date(currentDate));
  //  moment(new Date()).set('minute', minute)

  //  this.userInfo.time=new Date(new Date(currentDate).toISOString());
  //  this.userInfo.date=new Date(currentDate).toISOString();

  //  var hour=moment(this.userInfo.date).get('hour');
  //  var minute=moment(this.userInfo.date).get('minute'); 
  //  console.log("Time before load===="+this.userInfo.time);
  //  console.log("Date before Load===="+this.userInfo.date);
  }




  ionViewDidLoad() {

    // var day = moment(new Date());
    // var tommorow= new Date().getMonth()
    // moment().set('year', 2019);
    // var day=moment(new Date()).set('year', 2019).format('MMMM Do YYYY, h:mm:ss a');
    // console.log("Hour==="+moment().get('hour')); 
    // console.log("Day======="+day);

    console.log("Time after load===="+this.userInfo.time);
    console.log("Date after Load===="+this.userInfo.date);
    console.log("Unix time==="+moment(new Date()));
    this.userInfo.phoneNumber=9971672881;
    

    // console.log("Current Date=="+this.userInfo.date);
    console.log('ionViewDidLoad FirstPage');

    console.log("Date and time========="+JSON.stringify(this.userInfo));
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
