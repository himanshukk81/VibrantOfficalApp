import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { SessionService,MessageService,GuestService} from '../../app/sessionservice';

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  messageInfo:any={};
  messages:any=[];
  loader:boolean=true;
  guest:any={};
  guests:any=[];
  userInfo:any={};
  constructor(public service:SessionService,public guestService:GuestService, public messageService:MessageService,public events:Events,public navCtrl: NavController, public navParams: NavParams) {
    this.messageInfo.editorMsg='';
    this.guestService.getGuests();
    this.userInfo=this.service.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');

    this.events.unsubscribe('messages:fetches');
    this.events.subscribe('messages:fetches', messages=> {        
      this.messages=messages;
      this.loader=false;
    })

    this.events.subscribe('fetch:guests', guests=> {        
      this.guests=guests;
      this.messageService.getMessages(null);
    })
  }


  

  sendMessage()
  {
    this.messageInfo.createDate=new Date();
    this.messageInfo.senderId=this.userInfo.id;
    this.messageInfo.userType=this.userInfo.userType;

    if(this.userInfo.userType=="2")
    {
      this.messageInfo.receiverId=this.userInfo.userId;
    }
    else
    {
      this.messageInfo.receiverId=this.messageInfo.guestId;
    }
    
    this.loader=true;
    this.messageService.sendMessage(this.messageInfo);
  }

  getSingleGuestMessage()
  {
    this.messageService.getMessages(this.messageInfo.guestId)
  }

}
