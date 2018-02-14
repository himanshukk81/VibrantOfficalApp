import { Component,ViewChild, group } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events,Content,TextInput} from 'ionic-angular';
import { SessionService,MessageService,GuestService,GroupMessageService} from '../../app/sessionservice';
import { PENDING } from '@angular/forms/src/model';

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
  groupMessageInfo:any={};
  messages:any=[];
  loader:boolean=true;
  guest:any={};
  guests:any=[];
  userInfo:any={};
  type:any;
  messageType:any="user";
  groupMessages:any=[];
  groupFilterInfo:any={};
  groups:any;
  userInfo1:any={};
  constructor(public groupMessageService:GroupMessageService,public service:SessionService,public guestService:GuestService, public messageService:MessageService,public events:Events,public navCtrl: NavController, public navParams: NavParams) {
    this.messageInfo.editorMsg='';
    this.groupMessageInfo.editorMsg='';
    // this.userInfo1.id=1;
    // this.userInfo1.userType=1;
    // this.service.setUser(this.userInfo1)
    this.userInfo=this.service.getUser();
    this.groupMessageService.getGroups(1);
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
      this.messages=[];
      this.messages=messages1;
      this.loader=false;
      this.groupMessages=[];
      this.groupMessageService.getGroups(1);
      // this.messageInfo.editorMsg='';
    })

    this.events.subscribe('fetch:guests', guests=> {        
      this.guests=guests;
      this.messageService.getMessages();
    })

    this.events.subscribe('fetch:group:messages',groupMessages=> {   
      this.groupMessages=[];     
      this.groupMessages=groupMessages;
      this.messages=[];
      this.loader=false;
    })

    this.events.subscribe('fetch:groups', groups=> {        
      this.groups=groups;
      this.loader=false;
    })

    this.events.subscribe('group:message:approve',approved=>{
      this.getGroupMessages();
      this.service.showToast2("SuccessFully approved");
      this.loader=false;
    })
  }

  onFocus() {
    this.content.resize();
    this.scrollToBottom();
  }

  getGroupMessages()
  {
    console.log("Group Message calll");
    // this.groupFilterInfo.userId=this.service.getUser().id;
    this.loader=true;
    this.groupMessageService.getGroupMessages(this.groupMessageInfo)
  }

  getIndividualMessages()
  {
    this.messageService.getMessages();
  }


  sendGroupMessage()
  {
    var newGroupMessageInfo={};

    if(!this.groupMessageInfo.groupId)
    {
      this.service.showToast2("Please Select Group");
      return;
    }
    this.groupMessageInfo.id=this.service.getRandomString(5);
    this.groupMessageInfo.createDate=new Date();
    this.groupMessageInfo.senderId=this.service.getUser().id;
    this.groupMessageInfo.senderName=this.service.getUser().name;
    this.groupMessageInfo.senderType=this.service.getUser().userType;
    
    if(this.service.getUser().userType==1)
    {
      this.groupMessageInfo.userId=this.service.getUser().id;
      this.groupMessageInfo.status='A';
    }
    else
    {
      this.groupMessageInfo.guestId=this.service.getUser().id;
      this.groupMessageInfo.userId=this.service.getUser().userId;
      this.groupMessageInfo.status='P';
    }
    this.groupMessages.filterGroupMessages.push(Object.assign({},this.groupMessageInfo));
    newGroupMessageInfo=Object.assign({},this.groupMessageInfo);
    this.groupMessageService.sendGroupMessage(newGroupMessageInfo)
    this.groupMessageInfo.editorMsg='';
  }

  approveGroupMessages()
  {
    this.loader=true;
    var groupMessageIds=[];
    for(var i=0;i<this.groupMessages.filterGroupMessages.length;i++)
    {
      if(this.groupMessages.filterGroupMessages[i].selected)
      {
        groupMessageIds.push(this.groupMessages.filterGroupMessages[i].id);
      }
    }
    this.groupMessageService.approveGroupMessages(groupMessageIds)
  }

  scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
  }

  sendMessage()
  {
    var newMessageInfo={};
    this.messageInfo.createDate=new Date();
    this.messageInfo.senderId=this.userInfo.id;
    this.messageInfo.senderType=this.userInfo.userType;
    this.messageInfo.sender=true;
    this.messageInfo.senderName=this.userInfo.name;
    this.messageInfo.messageStatus=false;
    this.messageInfo.messageId=this.service.getRandomString(4);
    if(this.userInfo.userType=="2")
    {
      if(this.messageType=="user")
      {
        this.messageInfo.receiverId=this.userInfo.userId;
        this.messageInfo.receiverType=1;
        this.messageInfo.messageStatus=true;
        this.messageInfo.status='A';
      }
      else 
      {
        this.messageInfo.receiverId=0;
        this.messageInfo.receiverType=2;
        this.messageInfo.messageStatus=false;
        this.messageInfo.status='P';
      }
      this.messageInfo.userId=this.userInfo.userId;
    }
    else
    {
      this.messageInfo.messageStatus=true;
      this.messageInfo.receiverId=this.messageInfo.guestId;
      this.messageInfo.userId=this.userInfo.id;
      this.messageInfo.receiverType=2;
      this.messageInfo.status='A';
    }
    this.messages.push(Object.assign({},this.messageInfo));
    newMessageInfo=Object.assign({},this.messageInfo);
    this.messageService.sendMessage(newMessageInfo);
    this.messageInfo.editorMsg='';
    // this.loader=true;
  }
  approveMessage1()
  {
    this.messageService.approveMessage(this.messages)
  }



  // getSingleGuestMessage(guestInfo)
  // {
  //   console.log("ng model data==="+guestInfo);
  //   console.log("data guest id==="+this.messageInfo.guestId);
  //   this.messageService.getMessages()
  // }

}
