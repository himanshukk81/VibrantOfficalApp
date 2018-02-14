import { Component,ViewChild,ElementRef ,NgZone,Pipe} from '@angular/core';
// import { DatePipe} from '@angular/common';
import { IonicPage, NavController, NavParams,ModalController,ActionSheetController,ViewController,Events,Platform,AlertController} from 'ionic-angular';
import { SessionService,EventService,ReminderService,BudgetService, GuestService } from '../../app/sessionservice';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation'; // Newly Added
import { Jsonp } from '@angular/http/src/http';
import { LocationTrackerProvider } from '../../../providers/location-tracker';
import {LatLngBounds,GoogleMaps,LatLng, GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';
import { EventFilterPipe } from '../../filter/event-filter';
// import { setTimeout } from 'timers';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {
  eventList:any=[];
  reminderList:any=[];
  lat:any;
  lng:any;
  loader:boolean=true;
  // map: GoogleMap;
  userInfo:any={};
  constructor(public platform:Platform,public budgetService:BudgetService, public events:Events,public reminderService:ReminderService,public eventService:EventService,public geolocation:Geolocation,public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
    // this.userInfo.id=1;
    // this.userInfo.userType=1;
    // this.service.setUser(this.userInfo);
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
      
      setTimeout(()=>{
        this.eventList=events;  
        this.loader=false;
      },1000)
      
      
      console.log("Events info==="+JSON.stringify(this.eventList));
    }) 
  }
    
  eventDetail(eventInfo)
  {
    console.log("Event Detail Page.....................................");
    this.service.setEventInfo(eventInfo)
    this.navCtrl.push(ManageEventsPage);
  }



  

}
declare var google:any;
@Component({
  selector: 'page-events1',
  templateUrl: 'manage-events.html',
})
export class ManageEventsPage {
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
  autocompleteItems: any=[];
  filterSegment:any;
  geocoder:any;
  constructor(public guestService:GuestService,public zone:NgZone,public locationTracker:LocationTrackerProvider, public eventService:EventService,public platform:Platform,public service:SessionService, public events:Events,public modalCtrl:ModalController, public viewCtrl:ViewController,public camera: Camera,public actionCtrl:ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
    this.event=this.service.getEventInfo();
    this.event.date=new Date(this.event.date).toISOString();
    this.event.time=new Date(this.event.time).toISOString();
    console.log("event info======"+JSON.stringify(this.event));
    this.event.totalInvites=0;
    this.event.viewInfo="1";
    this.event.totalInvites=this.guestService.totalInvitationCount1();
    // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.userInfo=this.service.getUser();    
    
  }


  ionViewWillLeave()
  {
    console.log("Page leave now")
    this.events.publish('event:updated')
  }
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
      // this.events.unsubscribe('destination:changed')
      // this.events.subscribe('destination:changed', destination => {

      //   console.log("Destination changed");
      //   this.autocomplete.input=destination.address;
      //   // this.event.address=this.autocomplete.input;
      //   this.event.lat=destination.lat;
      //   this.event.lng=destination.lng;
        
      //   var dest = new LatLng(destination.lat,destination.lng);
      //   console.log("markers====="+JSON.stringify(this.markers));
      //   this.markers[0].setPosition(dest);
      //   this.fitMarkerOnMap();
      //   console.log("destinations==="+JSON.stringify(destination));
      // })  
      this.events.unsubscribe('fetch:location:success')

      this.events.unsubscribe('location:enabled')

      this.events.subscribe('location:enabled', location => {
        this.locationTracker.startTracking()
      })
      
      this.events.subscribe('fetch:location:success', location => {
        console.log("Current location fetch===="+JSON.stringify(this.currentLocation));
        this.currentLocation.lat=location.latitude;
        this.currentLocation.lng=location.longitude;
        var currentLatLng = new LatLng(this.currentLocation.lat,this.currentLocation.lng);
        console.log("Markers length==="+this.markers.length);

        if(this.markers.length>0)
        {
          if(this.markers.length==1)
          {
            this.addMarker(this.currentLocation,"Me","red")
          }
          else 
          {
            this.markers[1].setPosition(currentLatLng); 
          }
        }
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
          this.markers.push(marker);
          console.log("Markers length======="+JSON.stringify(this.markers));
        }).catch((err: any) => {
          var  error="error marker=="+err;
          console.log("Error==="+error);
      });
  }
  loadMap()
  {    
        console.log("Map loading===");
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
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready2222222!');
            this.addMarker(this.event,"Event","blue")
          }).catch((error)=>{
            alert("Map is not ready!="+error);
          });
  }



  // openPlaces()
  // {
  //   let profileModal = this.modalCtrl.create(Places);
  //   profileModal.present();
  // }

   closeModal()
   {
     this.viewCtrl.dismiss()
   }

   updateEventInfo()
   {
    this.navCtrl.push(MemberPage,{modify:true})
    // let profileModal = this.modalCtrl.create(MemberPage,{modify:true});
    // profileModal.present();   
   }

   viewInvitation(viewType)
   {
    this.navCtrl.push(MemberPage,{modify:false,viewTypeInfo:viewType})
    //  let profileModal = this.modalCtrl.create(MemberPage,{modify:false});
    //  profileModal.present();   
   }
}

@Component({
  selector: 'page-member',
  templateUrl: 'members.html'
})

export class MemberPage {
  eventInfo:any;
  userInfo:any={};
  autocomplete:any={};
  modifyInvitation:boolean=false;
  viewTypeinfo:any;
  invitations:any=[];
  // map1: GoogleMap;

  map2:any;
  
  markers:any=[];
  totalInvitations:any=[];

  
  constructor(public guestService:GuestService,public alertCtrl:AlertController,public navParams: NavParams,public platform:Platform,public modalCtrl:ModalController,public params: NavParams,public navCtrl:NavController,public viewCtrl:ViewController,public events:Events,public service:SessionService,public eventService:EventService){

    this.userInfo={};
    this.userInfo=this.service.getUser();
    this.eventInfo=this.service.getEventInfo();
    this.modifyInvitation=this.navParams.get('modify')
    if(this.navParams.get('viewTypeInfo'))
    {
      this.viewTypeinfo=this.navParams.get('viewTypeInfo');
      this.invitations=[];
      if(this.viewTypeinfo==1)
      {
        // this.invitations=this.guestService.totalInvitation();
        this.invitations=this.guestService.getDetailForEvent('T');
      }
      else if(this.viewTypeinfo==2)
      {
        this.invitations=this.guestService.getDetailForEvent('A');
      }
      else if(this.viewTypeinfo==3)
      {
        this.invitations=this.guestService.getDetailForEvent('R');
      }
      else
      {
        this.invitations=this.guestService.getDetailForEvent('P');
      }
    }


  }

  ionViewWillLeave()
  {
    console.log("Page leave now")
    this.events.publish('member:updated')
  }
  openPlaces()
  {
    let profileModal = this.modalCtrl.create(Places);
    profileModal.present();
  }
  ionViewDidLoad()
  {
    // this.loadMap()
    this.userInfo.status=null;
    this.userInfo.adultMember=0;
    this.userInfo.childMember=0;
    this.userInfo.comment='';
    this.platform.ready().then(() => {
      this.loadMap()
    })
    this.events.unsubscribe('event:update')
    this.events.subscribe('event:update', event=> {        
        this.closeModal();
    })  
    this.events.unsubscribe('event:update:invitations')
    this.events.subscribe('event:update:invitations', event=> { 
      
      this.guestService.updateEventStatus(this.userInfo)
        this.closeModal();
    })      
  }
  // addMarker(location,title,iconColor)
  // {
  //   this.map.addMarker({
  //     title: title,
  //     icon: iconColor,
  //     animation: 'DROP',
  //     position: {
  //       lat:location.lat,
  //       lng:location.lng
  //     }
      
  //   }).then(marker => {


  //       console.log("marker====="+JSON.stringify(marker));

  //       console.log("marker position==="+marker.getPosition())
  //         this.markers.push(marker);
  //         console.log("Markers length======="+JSON.stringify(this.markers));
  //       }).catch((err: any) => {
  //         var  error="error marker=="+err;
  //         console.log("Error==="+error);
  //     });
  // }
  loadMap()
  {    
        console.log("Map loading 342 ===");
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat:this.eventInfo.lat,
              lng:this.eventInfo.lng
            },
            zoom: 9,
            tilt: 30
          }
        };
        this.map2 = GoogleMaps.create('map', mapOptions);
        this.map2.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready For Members Page!');
            // this.addMarker(this.eventInfo,"Event","blue")
          }).catch((error)=>{
            alert("Map is not ready!="+error);
          });
  }
  closeModal()
  {
    this.viewCtrl.dismiss()
  }
  invitationModify()
  {
    this.userInfo.eventId=this.eventInfo.id;
    this.userInfo.guestId=this.service.getUser().id;
    this.userInfo.name=this.service.getUser().name;
    this.userInfo.userType=this.service.getUser().userType;

    console.log("user info==========398"+JSON.stringify(this.userInfo));
    if(this.userInfo.status=='R')
    {
      if(!this.userInfo.comment)
      {
        this.service.showToast2("Please Enter Comment");
        return;
      }

      this.presentConfirm();
      
    }
    else
    {
      if(!this.userInfo.adultMember)
      {
        this.service.showToast2("Please Enter Adult Member");
        return;
      }
      if(!this.userInfo.childMember)
      {
        this.service.showToast2("Please Enter Child Member ");
        return;
      }
      this.eventService.updateEventStatus(this.userInfo)
     
    }
   
  }

  presentConfirm()
  {
    let alert = this.alertCtrl.create({
      title: 'Reject Confirmation',
      message: 'Are You Sure Want To Reject Event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
              this.eventService.updateEventStatus(this.userInfo)
              },
        }
      ]
    })    
    alert.present();
  }
  updateEventInformation()
  {

    if(!this.eventInfo.title)
    {
      this.service.showToast2("Please Enter Title!")
      return;
    }
    if(!this.eventInfo.date)
    {
      this.service.showToast2("Please Choose Date!")
      return;
    }
    if(!this.eventInfo.time)
    {
      this.service.showToast2("Please Choose Time!")
      return;
    }
    if(!this.eventInfo.venueName)
    {
      this.service.showToast2("Please Enter Venue Name!")
      return;
    }
    this.eventService.updateEvent(this.eventInfo)
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
  filter:any={};
  constructor(public zone:NgZone,params: NavParams,public viewCtrl:ViewController,public events:Events) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
    console.log("sdfdsfdsfds"+this.autocompleteItems);
  }
   ionViewDidLoad()
   {
     
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
     console.log("Selected Search Results============"+item);
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
         console.log("Items===="+JSON.stringify(item));
         var itemLength=item.length;
         
        //  console.log("Address===="+item[item.length-itemLength].value)
        //  console.log("city===="+item[itemLength-3].value)
        //  console.log("State===="+item[itemLength-2].value)
        //  console.log("country===="+item[itemLength-1].value)
         
         
         console.log("Result addresss==="+JSON.stringify(results[0]));
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

