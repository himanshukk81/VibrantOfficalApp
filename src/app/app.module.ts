import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Http, Response} from '@angular/http';
import { HttpModule }    from '@angular/http';
import { SessionService } from './sessionservice';
import { LoginPage } from '../pages/Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { environment } from '../environments/environment';
import { ListPage} from '../pages/list/list';
import { UsersPage} from '../pages/users/users';
import { profile} from '../pages/profile/profile';
import { UserDetailPage} from '../pages/user-detail/user-detail';
import { EventsPage} from '../pages/events/events';
import { Places} from '../pages/events/events';

import { ManageEventsPage} from '../pages/events/events';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase, FirebaseListObservable,AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { AngularFireModule } from 'angularfire2';
import { BudgetsPage} from '../pages/budgets/budgets';
import { ManageBudgetsPage} from '../pages/budgets/budgets';
import { FunctionsPage} from '../pages/functions/functions';
import { ManageFunctionsPage} from '../pages/functions/functions';
import { RemindersPage} from '../pages/reminders/reminders';
import { ManageRemindersPage} from '../pages/reminders/reminders';
import { SharePhotoPage} from '../pages/share-photo/share-photo';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ImagePicker } from '@ionic-native/image-picker';
// import { ImagePickerMock } from '@ionic-native-mocks/image-picker';
import { Base64 } from '@ionic-native/base64';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import { LocationTrackerProvider } from '../providers/location-tracker';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { FirstPage} from '../pages/first/first';

// class imagePickerMock extends ImagePicker {
//   getPictures(options) {
//     return new Promise((resolve, reject) => {
      
//       resolve("file:///data/data/com.vibrant.application/cache/tmp_IMG-20171227-WA00231298561602.jpg");
//     })
//   }
// }

// class Base64Mock extends Base64 {

//   encodeFile(options) {
//     return new Promise((resolve, reject) => {
//       resolve("data:image/*;charset=utf-8;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsK");
//     })
//   }
  
  // getBase64Mock(options) {
  //   return new Promise((resolve, reject) => {
  //     resolve("data:image/*;charset=utf-8;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsK");
  //   })
  // }
// }
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserDetailPage,
    UsersPage,
    ListPage,
    profile,
    BudgetsPage,
    ManageBudgetsPage,
    FunctionsPage,
    ManageFunctionsPage,
    RemindersPage,
    ManageRemindersPage,
    SharePhotoPage,
    EventsPage,
    ManageEventsPage,
    Places,
    FirstPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserDetailPage,
    UsersPage,
    ListPage,
    profile,
    BudgetsPage,
    ManageBudgetsPage,
    FunctionsPage,
    ManageFunctionsPage,
    RemindersPage,
    ManageRemindersPage,
    SharePhotoPage,
    EventsPage,
    ManageEventsPage,
    Places,
    FirstPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SessionService,
    NativeStorage,
    LocalNotifications,
    Toast,
    SocialSharing,
    Network,
    Camera,
    LocalNotifications,
    ImagePicker,
    Base64,
    AuthService,
    AngularFireAuth,
    Facebook,
    LocationTrackerProvider,
    BackgroundGeolocation,
    Geolocation,
    // { provide: ImagePicker, useClass: imagePickerMock },
    // { provide: Base64, useClass: Base64Mock },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
