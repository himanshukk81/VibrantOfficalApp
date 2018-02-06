import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events} from 'ionic-angular';
import { GuestService } from '../../app/sessionservice';
import { SessionService } from '../../app/sessionservice';

/**
 * Generated class for the GuestInvitationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-guest-invitation',
  templateUrl: 'guest-invitation.html',
})
export class GuestInvitationPage {
  invitationList:any;
  loader:boolean=true;
  constructor(public events:Events, public service:SessionService,public guest:GuestService, public navCtrl: NavController, public navParams: NavParams) {
    var userId=this.service.getUser().id;
  }

  ionViewDidLoad() {
    setTimeout(() => {  
      this.guest.getGuestInvitation(this.service.getUser().id)            
    },100); 
      this.events.subscribe('guestlist:fetch', invitations=> {
        this.invitationList=invitations;
        this.loader=false;
      })

      this.events.subscribe('guestinvitation:removed', invitations=> {
        this.invitationList=invitations;
        this.loader=false;
      })
     
  }

  rejectInvite(invite)
  {
    this.loader=true;
    this.guest.rejectInvitation(this.invitationList,invite.id) 
  }

}
