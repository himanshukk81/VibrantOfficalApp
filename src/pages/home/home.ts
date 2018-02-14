import { Component,ViewChild,ElementRef,NgZone } from '@angular/core';
import { NavController,ActionSheetController,Platform,ModalController, NavParams,ViewController,Events } from 'ionic-angular';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';
import { SessionService,EventService, BudgetService } from '../../app/sessionservice';
import { LoginPage } from '../Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { map, filter, tap } from 'rxjs/operators';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BudgetsPage} from '../../pages/budgets/budgets';
import { EventsPage} from '../../pages/events/events';
import { MessagesPage} from '../../pages/messages/messages';
import { SharePhotoPage} from '../../pages/share-photo/share-photo';
import { GoogleMaps, GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';
declare var google:any;
declare var navigator: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  budget:any;
  budgets:any;
  loader:boolean=true;
  totalEstimateCost:number=0;
  totalFinalCost:number=0;
  totalPaid:number=0;
  totalPending:number=0;

  lat:any;
  lng:any;
  map: GoogleMap;
  firstTimeLoad:boolean=false;
  constructor(public budgetservice:BudgetService ,public navCtrl: NavController,public http:Http,public camera: Camera,
    public actionCtrl:ActionSheetController,public socialSharing: SocialSharing,
    public service:SessionService,public platform:Platform,
    public native:NativeStorage,public ngZone:NgZone,public modalCtrl: ModalController,public events:Events,public localNotification:LocalNotifications){

    
    }
    ionViewDidLoad()
    {

      if(!this.firstTimeLoad)
      {
        setTimeout(() => {  
          this.budgetservice.getBudgets();         
         },100); 
         this.events.unsubscribe('budgets:fetch')
         this.events.subscribe('budgets:fetch', budgets=> {
  
  
            this.budgets=budgets
            this.totalEstimateCost=0;
            this.totalFinalCost=0;
            this.totalPaid=0;
            this.totalPending=0;  
            
            console.log("Budget info===="+JSON.stringify(budgets));
            for(var i=0;i<this.budgets.length;i++)
            {
              this.totalEstimateCost+=parseInt(this.budgets[i].estimatedCost);
              this.totalFinalCost+=parseInt(this.budgets[i].finalCost);
              this.totalPaid+=parseInt(this.budgets[i].paid);
            }
      
            if(this.totalFinalCost>=this.totalPaid)
            {
              this.totalPending=this.totalFinalCost-this.totalPaid;
            }
            else
            {
              this.totalPending=0;
            }    
            this.loader=false;
            // this.closeModal();
        
         })
         this.firstTimeLoad=true;
      }
      
    }


       goToSharePhoto()
    {
      this.navCtrl.setRoot(SharePhotoPage);
      this.navCtrl.popToRoot();
    }

    goToMessage()
    {
      this.navCtrl.setRoot(MessagesPage);
      this.navCtrl.popToRoot();
    }


    goToBudgets()
    {
      this.navCtrl.setRoot(BudgetsPage);
      this.navCtrl.popToRoot();
    }

    gotToEvent()
    {
      this.navCtrl.setRoot(EventsPage);
      this.navCtrl.popToRoot();
    }




     
   
}
