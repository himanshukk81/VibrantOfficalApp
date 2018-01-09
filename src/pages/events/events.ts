import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ActionSheetController,ViewController,Events,Platform } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation'; // Newly Added
import { LocationTrackerProvider } from '../../providers/location-tracker';

/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google:any;
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  // events: FirebaseListObservable<any[]>;
  events:any=[];
  
  // cards: any;
  // category: string = 'gear';
  constructor(public locationTracker:LocationTrackerProvider, public geolocation:Geolocation,public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
    // this.events=this.db.list('/events');

    this.events=[{id:1,name:"Reception",date:new Date()},{id:2,name:"Wedding",date:new Date()},{id:3,name:"Mehandi",date:new Date()}]
      // this.cards = new Array(10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
    this.locationTracker.startTracking();
  }

  reminderDetail(event)
  {
    this.service.setEvent(event);
    // this.navCtrl.push(ManageBudgetsPage);
    let profileModal = this.modalCtrl.create(ManageEventsPage);
    profileModal.present();
  }


  addEvent()
  {
    // this.service.setEvent(null);
    let profileModal = this.modalCtrl.create(ManageEventsPage);
    profileModal.present();
  }


  

}

@Component({
  selector: 'page-manage-events',
  templateUrl: 'manage-events.html',
})
export class ManageEventsPage {
  @ViewChild('map') mapElement: ElementRef; // Added
  capturedImage:any;
  event:any={};
  latLng:any;
  map:any;
  marker:any;
  loader:any;
  constructor(public platform:Platform,public service:SessionService, public events:Events,public modalCtrl:ModalController, public viewCtrl:ViewController,public camera: Camera,public actionCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
   
    // alert("Call manage events page");
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageEventsPage');
    this.platform.ready().then(() => {
      alert("Loading map.......");
      this.loadMap(28.4479248,77.0582817); 
    });
    this.events.subscribe('fetch:location:success', event => {
      console.log("Location Fetched by location======"+event.lat);
      this.event.lat=event.lat;
      this.event.lng=event.lng;
      // alert("Fetch in broadcast");
      if(event.lat && event.lng)
        {
          this.latLng=new google.maps.LatLng(this.event.lat,this.event.lng);
          alert("Complete");
          this.marker.setPosition(this.latLng);
          // this.displayRoute(this.directionsDisplay,this.directionsService,this.latLng,this.destinationLatLng);
        }
      
    })

    this.events.subscribe('destination:changed', event => {
      this.event.lat=event.lat;
      this.event.lng=event.lng;
      // alert("Fetch in broadcast");
      if(event.lat && event.lng)
        {
          // alert("Complete 99");
          this.latLng=new google.maps.LatLng(this.event.lat,this.event.lng);
          this.marker.setPosition(this.latLng);
          // this.displayRoute(this.directionsDisplay,this.directionsService,this.latLng,this.destinationLatLng);
        }
      
    })
  }
  takePicture()
  { 
    // //alert("Calling");

    let actionSheet = this.actionCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePictureWithType(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePictureWithType(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
  takePictureWithType(type)
  {
    const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: type,
    }

    this.camera.getPicture(options).then((imageData) => {
    // this.capturedImage=imageData;
    this.capturedImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }

  loadMap(lat,lng)
  {

    this.event.lat=lat;
    this.event.lng=lng;
    this.latLng = new google.maps.LatLng(lat,lng);
    // this.service.setUserLocation(this.user);
    let mapOptions = 
            {
                center:this.latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
                // mapTypeId: google.maps.MapTypeId.ROADMAP,
                //  mapTypeControl: true,
                //   mapTypeControlOptions: {
                //       style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                //       position: google.maps.ControlPosition.TOP_CENTER
                //   },
                //   zoomControl: true,
                //   zoomControlOptions: {
                //       position: google.maps.ControlPosition.LEFT_CENTER
                //   },
                //   scaleControl: true,
                //   streetViewControl: true,
                //   streetViewControlOptions: {
                //       position: google.maps.ControlPosition.LEFT_TOP
                //   },
                //   fullscreenControl: true
            }
            this.map = new google.maps.Map(mapOptions);
            this.marker = new google.maps.Marker({
              map: this.map,
              position:this.latLng
            });
              // google.maps.event.addListener(marker, 'click', ()=> {
              //   this.showAddress(marker,this.latLng,2);
              // });                  
            // this.userMarker=marker;
            // this.markers.push(marker);
            // this.directionsDisplay = new google.maps.DirectionsRenderer({preserveViewport:true});
            // this.directionsService = new google.maps.DirectionsService(); 
            // this.directionsDisplay.setMap(this.map);
            // this.directionsDisplay.setOptions( { suppressMarkers: true } );

            // this.infoWindow=new google.maps.InfoWindow();
            // if(this.firstTimeDestinationMarker)
            //   {
            //    setTimeout(() => {  
            //      this.createMarker(this.directionsDisplay,this.directionsService);                
            //     },500);
            //     this.firstTimeDestinationMarker=false;
            //   } 
  }
  searchLocation()
  {
    let profileModal = this.modalCtrl.create(Places);
    profileModal.present();
  }

  saveEvent()
  {
    
  }
   updateKey()
  {
     
  }

  
}
@Component({
  selector: 'page-home',
  templateUrl: 'places.html'
})
export class Places {
 user:any={};
 myGroup:any; 
 destination:any={};
 constructor(params: NavParams,public viewCtrl:ViewController,public events:Events) {

  this.myGroup = new FormGroup({
                placeAutofill: new FormControl()
               });
  
    
  //  console.log('UserId', params.get('userId'));
 }
  ionViewDidLoad()
  {
  this.loadAutoComplete();
  }

  loadAutoComplete()
  {
    
      var places= document.getElementById('googlePlaces').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(places, {types: ['geocode']});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        // retrieve the place object for your use
        let place = autocomplete.getPlace();

        
        var location=place.geometry.location;


        console.log(location.lat());
        // //alert(JSON.stringify(place.geometry.location));
        this.destination={}; 
        this.destination.lat=location.lat();
        this.destination.lng=location.lng();
        this.events.publish('destination:changed',this.destination);
        this.closeModal();

      });

  }
    closeModal()
  {
    this.viewCtrl.dismiss();
  }

 

}

