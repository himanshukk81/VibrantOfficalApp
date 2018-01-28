import { Component,ViewChild,ElementRef ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ActionSheetController,ViewController,Events,Platform} from 'ionic-angular';
import { SessionService,EventService,ReminderService,BudgetService, GuestService } from '../../app/sessionservice';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation'; // Newly Added
import { Jsonp } from '@angular/http/src/http';
import { LocationTrackerProvider } from '../../../providers/location-tracker';
import {LatLngBounds,GoogleMaps,LatLng, GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';
// import { Keyboard } from '@ionic-native/keyboard';

// import { LocationTrackerProvider } from '../../providers/location-tracker';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  eventList:any=[];
  reminderList:any=[];
  lat:any;
  lng:any;
  map: GoogleMap;
  constructor(public platform:Platform,public budgetService:BudgetService, public events:Events,public reminderService:ReminderService,public eventService:EventService,public geolocation:Geolocation,public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
    //  this.eventService.getEvents()   
  }

  ionViewDidEnter()
  {
    setTimeout(() => {  


      this.eventService.getEvents()   
              
    },100); 
    console.log('ionViewDidLoad EventsPage')
    this.events.subscribe('event:updated', events=> {        
      this.eventService.getEvents()
    }) 
    this.events.subscribe('events1:fetch', events=> {        
      this.eventList=events;
      console.log("Events info==="+JSON.stringify(this.eventList));
    }) 
  }
    
  eventDetail(eventInfo)
  {
    this.service.setEventInfo(eventInfo)
    // let profileModal = this.modalCtrl.create(ManageEventsPage);
    // profileModal.present();
    this.navCtrl.push(ManageEventsPage);
  }



  

}
declare var google:any;
@Component({
  selector: 'page-events1',
  templateUrl: 'manage-events.html',
})
export class ManageEventsPage {
  // @ViewChild('map') mapElement: ElementRef; // Added
  capturedImage:any;
  event:any={};
  latLng:any;
  map:any;
  marker:any;
  loader:any;
  GoogleAutocomplete: any;
  autocomplete:any={};
  markers:any=[];
  currentLocation:any={};
  userInfo:any={};
  lat:any;
  lng:any;
  bounds:any;
  destination:any={};
  // autocomplete:any={};
  autocompleteItems: any=[];
  // GoogleAutocomplete:any;
  geocoder:any;
  constructor(public guestService:GuestService,public zone:NgZone,public locationTracker:LocationTrackerProvider, public eventService:EventService,public platform:Platform,public service:SessionService, public events:Events,public modalCtrl:ModalController, public viewCtrl:ViewController,public camera: Camera,public actionCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
    this.event=this.service.getEventInfo();

    this.event.totalInvites=0;

    console.log("Total Invites=="+this.guestService.totalInvitation());
    this.event.totalInvites=this.guestService.totalInvitation();
    // this.event.lat=28.459497;
    // this.event.lng=77.026638;


    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.userInfo=this.service.getUser();    
    // this.userInfo.userType=1;
  }


  ionViewWillLeave()
  {
    console.log("Page leave now")
    this.events.publish('event:updated')
  }


  // keyboardCheck() {
  //   return ! this.keyboard.onKeyboardShow();
  //  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageEventsPage');   
    this.platform.ready().then(() => {
      this.loadMap()

      setTimeout(() => {  
        this.locationTracker.startTracking()
        
      },100);

      

       this.events.unsubscribe('member:updated')
      this.events.subscribe('member:updated', member => {
        this.event=this.service.getEventInfo();
      })  
      this.events.unsubscribe('destination:changed')
      this.events.subscribe('destination:changed', destination => {

        console.log("Destination changed");
        this.autocomplete.input=destination.address;
        this.event.address=this.autocomplete.input;
        this.event.lat=destination.lat;
        this.event.lng=destination.lng;
        
        var dest = new LatLng(destination.lat,destination.lng);

        // console.log("Markers===="+this.markers);
        console.log("markers====="+JSON.stringify(this.markers));
        // alert("Markers===="+this.markers);
        this.markers[0].setPosition(dest);
        this.fitMarkerOnMap();
        console.log("destinations==="+JSON.stringify(destination));
      })  
      this.events.unsubscribe('fetch:location:success')

      this.events.unsubscribe('location:enabled')

      this.events.subscribe('location:enabled', location => {
        this.locationTracker.startTracking()
      })
      
      this.events.subscribe('fetch:location:success', location => {
        console.log("Current location fetch===="+JSON.stringify(this.currentLocation));
        this.currentLocation.lat=location.latitude;
        this.currentLocation.lng=location.longitude;
        this.addMarker(this.currentLocation,"Me","red")
      })
      
      this.events.unsubscribe('event:update')
      this.events.subscribe('event:update', event=> {        
          this.closeModal();
      })  
    });

  }

  fitMarkerOnMap()
  {
    this.bounds = new LatLngBounds();  
    for(var i=0;i<this.markers.length;i++)
      {
        this.bounds.extend(this.markers[i].getPosition());
      }

      console.log("Fit bounds====="+this.bounds);
    this.map.setBounds(this.bounds); 


  }
  addMarker(location,title,iconColor)
  {
    this.map.addMarker({
      title: title,
      icon: iconColor,
      animation: 'DROP',
      position: {
        lat:location.lat,
        lng:location.lng
      }
      
    }).then(marker => {


        console.log("marker====="+JSON.stringify(marker));

        console.log("marker position==="+marker.getPosition())
        // var dest = new google.maps.LatLng(location.lat,location.lng);
        // marker.setPosition(dest)

        if(this.markers.length<3)
        {
          this.markers.push(marker);
          this.fitMarkerOnMap();

          console.log("Working");
        }

        else
        {
          console.log("Not working");
        }
        


        
        // if(this.markers.length==2)
        // {
        //   this.fitMarkerOnMap()
        // }
        // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //   this.markers.push(marker);
        //   alert("marker===="+marker)
        //   console.log("marker===="+marker);
        // });

        }).catch((err: any) => {
          var  error="error marker=="+err;
          console.log("Error==="+error);
          // alert(error);
      });
  }


   updateEventInfo()
   {
    this.eventService.updateEvent(this.event)
   } 
  loadMap()
  {    
        console.log("Map loading===");
        // this.lat=28.459497;
        // this.lng=77.026638;
        // console.log("============> 12"+this.lat+" ---- "+this.lng);
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat:this.event.lat,
              lng:this.event.lng
            },
            zoom: 9,
            tilt: 30
          }
        };
        this.map = GoogleMaps.create('map', mapOptions);
        // alert("Map==="+this.map);
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready2222222!');
            this.addMarker(this.event,"Event","blue")
          }).catch((error)=>{
            alert("Map is not ready!="+error);
          });
  }



  // updateSearch(){
  //   // this.autocomplete.input='';

  //   console.log("Input====="+this.autocomplete.input);
  //   console.log("auto complete data====="+this.autocomplete.input);
  //   if (this.autocomplete.input == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }
  //   this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  //   (predictions, status) => {
  //     this.autocompleteItems = [];
  //     this.zone.run(() => {
  //       predictions.forEach((prediction) => {
  //         this.autocompleteItems.push(prediction);
  //       });
  //     });
  //   });
  // }

  // selectSearchResult(item){
  //   // this.clearMarkers();
  //   this.autocompleteItems = [];
  
  //   this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
  //     if(status === 'OK' && results[0]){
  //       let position = {
  //           lat: results[0].geometry.location.lat,
  //           lng: results[0].geometry.location.lng
  //       };

  //       this.destination.lat=results[0].geometry.location.lat();
  //       this.destination.lng=results[0].geometry.location.lng();
  //       this.destination.address=results[0].formatted_address;
     
        
  //       this.closeModal()
  //       this.events.publish('destination:changed',this.destination);
  //       console.log("position===="+position);
  //     }
  //     else
  //     {
  //       alert("Not ok");
  //     }
  //   })
  // }

 
  openPlaces()
  {
    let profileModal = this.modalCtrl.create(Places);
    profileModal.present();
  }

   closeModal()
   {
     this.viewCtrl.dismiss()
   }

   updateInvitationStatus()
   {

    let profileModal = this.modalCtrl.create(MemberPage,{modify:true});
    profileModal.present();   
   }

   viewInvitation()
   {
     let profileModal = this.modalCtrl.create(MemberPage,{modify:false});
     profileModal.present();   
   }
}

@Component({
  selector: 'page-member',
  templateUrl: 'members.html'
})

export class MemberPage {
  eventInfo:any;
  // attende:any={};
  userInfo:any={};
  modifyInvitation:boolean=false;
  constructor(public params: NavParams,public navCtrl:NavController,public viewCtrl:ViewController,public events:Events,public service:SessionService,public eventService:EventService){
    this.eventInfo=this.service.getEventInfo();
    this.modifyInvitation=params.get('modify');
  }

  ionViewWillLeave()
  {
    console.log("Page leave now")
    this.events.publish('member:updated')
  }
  ionViewDidLoad()
  {
    
    this.events.unsubscribe('event:update')
    
    this.events.subscribe('event:update', event=> {        
        this.closeModal();
        this.navCtrl.pop();
    })  

    this.events.unsubscribe('event:update:invitations')
    
    this.events.subscribe('event:update:invitations', event=> {        
        this.closeModal();
    })  
  }
  closeModal()
  {
    this.viewCtrl.dismiss()
  }
  invitationModify()
  {
    this.userInfo.id=this.eventInfo.id;
    this.userInfo.guestId=this.service.getUser().id;
    this.userInfo.userType=this.service.getUser().userType;
    this.eventService.updateEventStatus(this.userInfo)
   
  }


}
@Component({
  selector: 'page-home',
  templateUrl: 'places.html'
})
export class Places {
  user:any={};
  destination:any={};
  autocomplete:any={};
  autocompleteItems: any=[];
  GoogleAutocomplete:any;
  geocoder:any;
  constructor(public zone:NgZone,params: NavParams,public viewCtrl:ViewController,public events:Events) {
   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
   //  console.log('UserId', params.get('userId'));
    this.geocoder = new google.maps.Geocoder;
    console.log("sdfdsfdsfds"+this.autocompleteItems);
  }
   ionViewDidLoad()
   {
     //  this.loadAutoComplete();
   }
 
 
   updateSearch(){
     if (this.autocomplete.input == '') {
       this.autocompleteItems = [];
       return;
     }
     this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
     (predictions, status) => {
       this.autocompleteItems = [];
       this.zone.run(() => {
         predictions.forEach((prediction) => {
           this.autocompleteItems.push(prediction);
         });
       });
     });
   }
 
   selectSearchResult(item){
     // this.clearMarkers();
     this.autocompleteItems = [];
   
     this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
       if(status === 'OK' && results[0]){
         let position = {
             lat: results[0].geometry.location.lat,
             lng: results[0].geometry.location.lng
         };
 
         this.destination.lat=results[0].geometry.location.lat();
         this.destination.lng=results[0].geometry.location.lng();
         this.destination.address=results[0].formatted_address;
      
         
         this.closeModal()
         this.events.publish('destination:changed',this.destination);
         console.log("position===="+position);
       }
       else
       {
         alert("Not ok");
       }
     })
   }


 
     closeModal()
   {
     this.viewCtrl.dismiss();
   }
 
  
}

