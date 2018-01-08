import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDetailPage} from '../user-detail/user-detail';
import { SessionService } from '../../app/sessionservice';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  // users:any=[];
  users: FirebaseListObservable<any[]>;
  userInfo:any;
  constructor(public db:AngularFireDatabase,public navCtrl: NavController,public service:SessionService) 
    {
      this.userInfo=this.service.getUser();
      this.users=this.db.list('/user_detail');
      // this.users.push("Yogesh"); 
    }
    userDetail(info)
    {
      // alert("user detail page")
      this.service.setOtherUserInfo(info);
      this.navCtrl.push(UserDetailPage);
    }
}
