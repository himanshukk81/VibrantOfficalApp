import { Component,ViewChild,ElementRef,NgZone } from '@angular/core';
import { NavController,ActionSheetController,Platform,ModalController, NavParams,ViewController,Events } from 'ionic-angular';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionService } from '../../app/sessionservice';
import { LoginPage } from '../Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { map, filter, tap } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications';

declare var google:any;
declare var navigator: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  mobileNo:any;
  otp:any;
  
  constructor(public navCtrl: NavController,public http:Http,public camera: Camera,
    public actionCtrl:ActionSheetController,public socialSharing: SocialSharing,
    public service:SessionService,public platform:Platform,
    public native:NativeStorage,public ngZone:NgZone,public modalCtrl: ModalController,public events:Events,public localNotification:LocalNotifications) {
  }



     
   
}
