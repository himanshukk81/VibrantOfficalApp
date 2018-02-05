import { Component, group } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ModalController} from 'ionic-angular';
import { SessionService,MessageService,GuestService,GroupMessageService} from '../../app/sessionservice';
import { Event } from '@firebase/database/dist/esm/src/core/view/Event';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  groups:any;
  loader:boolean=true;
  groupInfo:any={};
  guests:any;

  constructor(public modalCtrl:ModalController,public guestService:GuestService,public service:SessionService,public events:Events,public groupMessageService:GroupMessageService,public navCtrl: NavController, public navParams: NavParams) {
    this.groupInfo.guestIds=[];
    
  }

  ionViewDidLoad() {

    setTimeout(()=>{
      this.groupMessageService.getGroups(1);
    },100)
    this.events.subscribe('fetch:groups', groups=> {        
      this.groups=groups;
      this.loader=false;
    })


    this.events.subscribe('refresh:groups', groups=> {        
      this.groupMessageService.getGroups(1);
      this.loader=false;
    })

    console.log('ionViewDidLoad GroupsPage');
  }

  createGroup()
  {
    let profileModal = this.modalCtrl.create(createGroup);
    profileModal.present();   
  }



}
@Component({
  selector: 'page-manage-groups',
  templateUrl: 'manage-groups.html',
})
export class createGroup
{

  groupInfo:any={};
  guests:any=[];
  loader:boolean=true;
  availableGuests:any=[];
  guestExistInGroup:boolean=false;
  constructor(public viewCtrl:ViewController,public events:Events,public guestService:GuestService,public service:SessionService,public groupMessageService:GroupMessageService)
  {
    setTimeout(()=>{
      this.guestService.getGuests();
    },100)    
  }

  ionViewDidLoad()
  {


    this.events.subscribe('fetch:groups1', groups=> {   
   
        this.availableGuests=[];     
        for(var i=0;i<this.guests.length;i++)
        {
          this.guestExistInGroup=false;
          for(var j=0;j<groups.length;j++)
          {
            for(var k=0;k<groups[j].guestIds.length;k++)
            {
              if(this.guests[i].id==groups[j].guestIds[k].id)
              {
                this.guestExistInGroup=true;
                break;
              }
            }
            if(this.guestExistInGroup)
            {
              break;
            }
          }
          if(!this.guestExistInGroup)
          {
            if(this.guests[i].userId=this.service.getUser().id)
            {
              this.availableGuests.push(this.guests[i]);
            } 
          }
        }
        console.log("Available Guests======="+JSON.stringify(this.availableGuests));
        this.loader=false;
    })
    this.events.subscribe('group:created',groups=>{
      this.loader=false;
      this.closeModal();   
    })

    this.events.subscribe('fetch:guests',guests=>{ 
      this.guests=guests;
    
      this.groupMessageService.getGroups(2);
    })
  }

  closeModal()
  {
    this.viewCtrl.dismiss()
  }
  ionViewWillLeave()
  {
    console.log("Page leave now")
    this.events.publish('refresh:groups')
  }
  

  createGroup()
  {
    this.loader=true;
    this.groupInfo.userId=this.service.getUser().id;
    this.groupInfo.id=this.service.getRandomString(5);
    this.groupInfo.guestIds=[];

    console.log("Availble  Guests====="+JSON.stringify(this.availableGuests));
    for(var i=0;i<this.availableGuests.length;i++)
    {
      if(this.availableGuests[i].guestSelected)
      {
        console.log("Selected  availble");
        this.groupInfo.guestIds.push(this.availableGuests[i].id);
      }
    }

    console.log("Group infosssssss::::::::;"+JSON.stringify(this.groupInfo.guestIds));
    if(!this.groupInfo.name)
    {
      this.service.showToast2("Please Enter Your Group name");
      return;
    }
    if(this.groupInfo.guestIds.length==0)
    {
      this.service.showToast2("Please Select Atleast One Group");
      return;
    }
    this.groupMessageService.createGroup(this.groupInfo)
  }
}
