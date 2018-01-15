import { Component,ViewChild,ElementRef,NgZone } from '@angular/core';
import { NavController,ActionSheetController,Platform,ModalController, NavParams,ViewController,Events } from 'ionic-angular';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionService,EventService } from '../../app/sessionservice';
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
  loader:boolean=false;
  eventList:any;
  data:any={};
  constructor(public eventService:EventService,public navCtrl: NavController,public http:Http,public camera: Camera,
    public actionCtrl:ActionSheetController,public socialSharing: SocialSharing,
    public service:SessionService,public platform:Platform,
    public native:NativeStorage,public ngZone:NgZone,public modalCtrl: ModalController,public events:Events,public localNotification:LocalNotifications){
      setTimeout(() => {  
        
                // alert("Get event called")
                this.eventService.getEvents()            
              },1000); 
    
    }
    ionViewDidLoad()
    {
      // alert("Event calledd");
      this.loader=true;
      this.events.subscribe('events:fetch', events => {
        // alert("Events Fetching.....")
        this.eventList=events;
        this.loader=false;
      })
      
    }




     
   
}
