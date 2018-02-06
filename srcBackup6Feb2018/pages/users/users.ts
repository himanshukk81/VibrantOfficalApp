import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDetailPage} from '../user-detail/user-detail';
import { SessionService } from '../../app/sessionservice';
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
  
  userInfo:any;
  constructor(public navCtrl: NavController,public service:SessionService) 
    {
      this.userInfo=this.service.getUser();
      // this.users.push("Yogesh"); 
    }
    userDetail(info)
    {
      // alert("user detail page")
      this.service.setOtherUserInfo(info);
      this.navCtrl.push(UserDetailPage);
    }
}
