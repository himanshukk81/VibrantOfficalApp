import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,Content,TextInput} from 'ionic-angular';
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
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  messageInfo:any={};
  messages:any=[];
  loader:boolean=true;
  guest:any={};
  guests:any=[];
  userInfo:any={};
  type:any;
  messageType:any="user";
  constructor(public service:SessionService,public guestService:GuestService, public messageService:MessageService,public events:Events,public navCtrl: NavController, public navParams: NavParams) {
    this.messageInfo.editorMsg='';
    this.userInfo=this.service.getUser()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
    console.log("messagess="+JSON.stringify(this.messages));

    setTimeout(() => {  
      this.guestService.getGuests()       
    },100); 
    this.events.unsubscribe('fetch:guests')
    this.events.unsubscribe('messages:fetches')
    this.events.subscribe('messages:fetches', messages1=> {        
      this.messages=messages1;
      this.loader=false;
      // this.messageInfo.editorMsg='';
    })

    this.events.subscribe('fetch:guests', guests=> {        
      this.guests=guests;
      this.messageService.getMessages("0");
    })
  }

  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
  }


  // isYou(message)
  // {
  // //  if(message.receiverId==this.userInfo.id)
  // //  {
  // //    return true;
  // //  }
  //   return false;
  // //  if(message.receiverId==this.messageInfo.guestId)
  // //  {
  // //   return true;
  // //  }
    
  // }
  // isMe(message)
  // {
  //   if(message.senderId==this.userInfo.id)
  //   {
  //     return true;
  //   }
  // }

  sendMessage()
  {
    var newMessageInfo={};
    this.messageInfo.createDate=new Date();
    this.messageInfo.senderId=this.userInfo.id;
    this.messageInfo.senderType=this.userInfo.userType;
    this.messageInfo.sender=true;
    this.messageInfo.messageStatus=false;
    this.messageInfo.messageId=this.service.getRandomString(4);
    if(this.userInfo.userType=="2")
    {
      if(this.messageType=="user")
      {
        this.messageInfo.receiverId=this.userInfo.userId;
        this.messageInfo.receiverType=1;
        this.messageInfo.messageStatus=true;
      }
      else 
      {
        this.messageInfo.receiverId=0;
        this.messageInfo.receiverType=2;
        this.messageInfo.messageStatus=false;
      }
    }
    else
    {
      this.messageInfo.messageStatus=true;
      this.messageInfo.receiverId=this.messageInfo.guestId;
      this.messageInfo.receiverType=2;
    }
    this.messages.push(Object.assign({},this.messageInfo));
    newMessageInfo=Object.assign({},this.messageInfo);
    this.messageService.sendMessage(newMessageInfo);
    this.messageInfo.editorMsg='';
    // this.loader=true;
  }
  approveMessage()
  {
    for(var i=0;i<this.messages.length;i++)
    {
      if(this.messages[i].selected)
      {
        this.messages[i].messageStatus=true;
      }
    }
    this.messageService.approveMessage(this.messages)
  }

  getSingleGuestMessage(guestInfo)
  {
    console.log("ng model data==="+guestInfo);
    console.log("data guest id==="+this.messageInfo.guestId);
    this.messageService.getMessages(guestInfo)
  }

}
