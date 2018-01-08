import { Component,ViewChild } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from '../../app/sessionservice';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { Nav, Platform,AlertController,NavController,NavParams,MenuController,ModalController,ViewController} from 'ionic-angular';
import {Events,ToastController } from 'ionic-angular';

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
  constructor(public navParams: NavParams,public events:Events,public modalCtrl:ModalController,public menu: MenuController,public navCtrl: NavController,public service:SessionService){
    this.user={};
    this.menu.swipeEnable(false);
    this.userTypeId=this.navParams.get('id');
    //  alert("sdfsdf"+this.navParams.get('id'));
  }

  ionViewDidLoad()
  {
    this.guests=this.service.getGuests();
    console.log("Ion view load");
  }
  
  
  login()
  {    
     
  }

  getOtp()
  {
    alert("Thank you");
  }
 

  
}




