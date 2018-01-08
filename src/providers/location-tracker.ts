
import { Injectable,NgZone } from '@angular/core';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';
import { Toast } from '@ionic-native/toast';
import {Events,ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { SessionService } from '../app/sessionservice';

@Injectable()
export class LocationTrackerProvider {
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  user:any={};
  firstTime:boolean=true;
  constructor(public service:SessionService,public db:AngularFireDatabase,public backgroundGeolocation:BackgroundGeolocation,public geolocation:Geolocation,public zone:NgZone,public toast:Toast,public events:Events) {
    console.log('Hello LocationTrackerProvider Provider');
  }

showToast(message)
{
  this.toast.show(message, '5000', 'bottom').subscribe(
    toast => {
      console.log(toast);
    }
  );
}
  

  startTracking() {

        let config = {
          desiredAccuracy: 0,
          stationaryRadius: 20,
          distanceFilter: 10,
          debug: true,
          interval: 2000
        };
        var users=this.service.getUser();


        // alert("users=="+JSON.stringify(users));
        this.user=users;
        this.backgroundGeolocation.configure(config).subscribe((location) => {
      
          console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
          // this.showToast("background==");
          // Run update inside of Angular's zone
          this.zone.run(() => {
            
            
            this.lat = location.latitude;
            this.lng = location.longitude;
            var message="lat=="+this.lat+"lng=="+this.lng;
          
            var userInfo="info==="+JSON.stringify(this.user);
            this.service.showToast(userInfo);
            var user:any={};
            user.latitude=this.lat;
            user.longitude=this.lng;
            var message="lat=="+this.lat+"lng=="+this.lng;
            this.events.publish('fetch:location:success',user); 
            // alert("Fetch succcess")
          });
      
        }, (err) => {
           var error;
           error="Error199=="+err;
          //  alert(error);
          console.log(error);
          
          // this.showToast(error);
      
        });
      
        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();
      
      
        // Foreground Tracking
      
      let options = {
        frequency: 3000,
        enableHighAccuracy: true
      };
      
      this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      
        console.log(position);

  
        var message="lat222=="+this.lat+"lng222=="+this.lng;
        // this.showToast(message);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

          var message="lat=="+this.lat+"lng=="+this.lng;
          var  user:any={};
          user.latitude=this.lat;
          user.longitude=this.lng;
          var message="user=="+JSON.stringify(this.user);

          alert("Fetch succcess")
          this.events.publish('fetch:location:success',position.coords); 
            
        });
      },(err)=>
        {
          alert("Fetch failed")
          var error;
          error="Error231=="+err;
          this.showToast(error);
          console.log(error);
        });
  }
    
  stopTracking() {

    console.log('stopTracking');
    
     this.backgroundGeolocation.finish();
     this.watch.unsubscribe();
  }

}
