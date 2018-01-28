import { Component } from '@angular/core';
import { NavController,Events,Platform } from 'ionic-angular';
import { LocationTrackerProvider } from '../../../providers/location-tracker';
import {LatLngBounds,GoogleMaps,LatLng, GoogleMap,GoogleMapsEvent,GoogleMapOptions,CameraPosition,MarkerOptions,Marker } from '@ionic-native/google-maps';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  currentLocation:any={};
  map: GoogleMap;
  markers:any=[];
  currentLocationFetching:boolean=false;
  constructor(public platform:Platform,public events:Events,public navCtrl: NavController,public locationTracker:LocationTrackerProvider) {
    
  }

  ionViewDidLoad()
  {
    // setTimeout(() => {  
    //   this.locationTracker.startTracking()
    // },100);



    this.platform.ready().then(() => {
      this.loadMap();
    })    
    this.events.unsubscribe('fetch:location:success')
    this.events.subscribe('fetch:location:success', location => {

      console.log("current location===="+JSON.stringify(location));
      this.currentLocation.lat=location.latitude;
      this.currentLocation.lng=location.longitude;
      this.currentLocationFetching=true;
      var dest = new LatLng(this.currentLocation.lat,this.currentLocation.lng);
      if(this.markers.length>0)
      {
        this.markers[0].setPosition(dest);
      }
    })


    this.events.unsubscribe('location:enabled')
    this.events.subscribe('location:enabled', location => {
     console.log("Markers=="+JSON.stringify(this.markers));
     if(!this.currentLocationFetching)
     {
      if(this.markers.length>0)
      {
        this.locationTracker.startTracking()
      }
      else
      {
        setTimeout(()=>{
          console.log("Fetching location without marker define");
          this.locationTracker.startTracking()
        },10000)
      }
     }
  
    })

  }

  loadMap()
  {    
        console.log("Map loading===");
        this.currentLocation.lat=28.459497;
        this.currentLocation.lng=77.026638;
        // console.log("============> 12"+this.lat+" ---- "+this.lng);
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat:this.currentLocation.lat,
              lng:this.currentLocation.lng
            },
            zoom: 9,
            tilt: 30
          }
        };
        this.map = GoogleMaps.create('map', mapOptions);
        // alert("Map==="+this.map);

        console.log("Map is ready now");
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {

            console.log("Map is ready fo task");
            this.addMarker(this.currentLocation,"Me","red")

            setTimeout(()=>{
              console.log("Fetching Current location after 6 second");
              this.locationTracker.startTracking()
            },6000)
            
            console.log('Marker added');
          }).catch((error)=>{
            console.log("Map is not ready=="+error);
            // alert("Map is not ready!="+error);
          });
  }

  addMarker(location,title,iconColor)
  {
    console.log("location===="+location +"title==="+title +"color==="+iconColor);
    console.log("Adding marker===");
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
        }).catch((err: any) => {
          var  error="error marker=="+err;
          console.log("Error==="+error);
          // alert(error);
      });
  }



}
