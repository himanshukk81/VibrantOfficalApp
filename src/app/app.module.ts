import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule,Content } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
// import { HomePage2 } from '../pages/home1/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Http, Response} from '@angular/http';
import { HttpModule }    from '@angular/http';
import { SessionService,CateogryService,LoginService,GuestService,ApprovePhotoService,
  BudgetService,ToDoService ,ReminderService,ShareImageService,MessageService,EventService,PaymentService,UserService,GroupMessageService,GroupImageService} from './sessionservice';
import { LoginPage } from '../pages/Login/Login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Toast } from '@ionic-native/toast';
import { UsersPage} from '../pages/users/users';
import { profile} from '../pages/profile/profile';
import { UserDetailPage} from '../pages/user-detail/user-detail';
import { EventsPage,MemberPage,Places} from '../pages/events/events';
import { ManageEventsPage} from '../pages/events/events';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Network } from '@ionic-native/network';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BudgetsPage} from '../pages/budgets/budgets';
import { ManageBudgetsPage} from '../pages/budgets/budgets';
import { FunctionsPage} from '../pages/functions/functions';
import { ManageFunctionsPage} from '../pages/functions/functions';
import { RemindersPage} from '../pages/reminders/reminders';
import { ManageRemindersPage} from '../pages/reminders/reminders';
import { SharePhotoPage,ManageSharePhotoPage} from '../pages/share-photo/share-photo';
import { GuestInvitationPage} from '../pages/guest-invitation/guest-invitation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ImagePicker } from '@ionic-native/image-picker';
// import { ImagePickerMock } from '@ionic-native-mocks/image-picker';
import { Base64 } from '@ionic-native/base64';
import { Facebook } from '@ionic-native/facebook';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { FirstPage} from '../pages/first/first';
import { GroupsPage,createGroup} from '../pages/groups/groups';
import { MessagesPage} from '../pages/messages/messages';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { LocationTrackerProvider } from '../../providers/location-tracker';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
// import { Keyboard } from '@ionic-native/keyboard';
import { environment} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable,AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { EventFilterPipe } from '../filter/event-filter';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UserDetailPage,
    UsersPage,
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
    FirstPage,
    GuestInvitationPage,
    ManageSharePhotoPage,
    MessagesPage,
    MemberPage,
    EventFilterPipe,
    GroupsPage,createGroup
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UserDetailPage,
    UsersPage,
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
    FirstPage,
    GuestInvitationPage,
    ManageSharePhotoPage,
    MessagesPage,
    MemberPage,
    GroupsPage,createGroup
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
    Facebook,
    Geolocation,
    CateogryService,
    LoginService,
    GuestService,
    MessageService,
    ShareImageService,
    ReminderService,
    ToDoService,
    BudgetService,
    EventService,
    PaymentService,
    UserService,
    LocationTrackerProvider,
    BackgroundGeolocation,
    LocationAccuracy,
    AngularFireDatabase,
    GroupMessageService,
    GroupImageService,

    // Keyboard,
    // { provide: ImagePicker, useClass: imagePickerMock },
    // { provide: Base64, useClass: Base64Mock },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
