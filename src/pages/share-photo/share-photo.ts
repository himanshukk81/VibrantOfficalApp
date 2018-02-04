import { Component, group } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController,ModalController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { SessionService,ShareImageService,GuestService,GroupImageService,GroupMessageService} from '../../app/sessionservice';
import { json } from 'body-parser';

/**
 * Generated class for the SharePhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-share-photo',
  templateUrl: 'share-photo.html',
})
export class SharePhotoPage {
  imageOptions:any;
  imagesArray:any=[];
  images:any;
  guests:any;
  chooseUserType:any;
  filterInput:any={}; 
  userInfo:any={};
  loader:boolean=false;
  first:boolean=true;
  groupImages:any=[];
  constructor(public guestservice:GuestService, public service:SessionService,public modalCtrl:ModalController,public events:Events,public imageService:ShareImageService,public imagePicker: ImagePicker,public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo=this.service.getUser();
  }

  ionViewDidLoad() {

    setTimeout(() => {  
      // this.userInfo=this.service.getUser();

     
      if(this.userInfo.userType==2)
      {
        this.loader=true;
        console.log("Calling guest data");
        this.imageService.getFilterImages(null);
      }
      
      // this.imageService.getSharedImages()
      this.guestservice.getGuests();
      
    },100);
    

    
    this.events.unsubscribe('fetch:guests')
    this.events.subscribe('fetch:guests', guests=> {
      this.guests=guests;
    })


    this.events.unsubscribe('fetch:group:images')
    this.events.subscribe('fetch:group:images', images=> {
      this.groupImages=images;
    })

    this.events.unsubscribe('fetch:images')
    this.events.subscribe('fetch:images', images1=> {
      // this.service.showToast2("Successfully upload images");
        // this.images=[];

        // if(this.service.getUser().userType==1)
        // {
        //   this.filterInput.selectedUserType="1";
        // }
        
        this.imagesArray=[];
        this.images=images1;
        
        this.loader=false;
        this.first=false;
        console.log("images ======="+JSON.stringify(this.images));
        // console.log("Images===="+this.images);
      // this.events.unsubscribe('fetch:images');
    })
    console.log('ionViewDidLoad SharePhotoPage');
  }


  

  filterUser()
  {
    
    // this.filterQuery.selectedUserType=this.chooseUserType;

    this.imageService.getFilterImages(this.filterInput);
  }

  filterGuestImages()
  {
    this.imageService.getFilterImages(this.filterInput)
  }

  getGroupImages()
  {
    // this.groupImageService.getGroupImages(this.imageInfo);
  }
  addImages()
  {
    this.filterInput.selectedUserType=1;
    let profileModal = this.modalCtrl.create(ManageSharePhotoPage);
    profileModal.present();
  }
  approveImage1()
  {
    this.loader=true;
    if(!this.filterInput.guestId)
    {
      this.filterInput.guestId=0;
    }
    // for(var i=0;i<this.images.length;i++)
    // {
    //   for(var j=0;j<this.images[i].imagesArray.length;j++)
    //   {
    //     if(this.images[i].imagesArray[j].selected)
    //     {
    //       if(this.images[i].imagesArray[j].status!="A")
    //       {
    //         this.images[i].imagesArray[j].guestId=this.filterInput.guestId;
    //       }
          
    //       this.images[i].imagesArray[j].status="A";

          
    //     }
    //     else if(this.images[i].userType==2 && this.images[i].userId==this.service.getUser().id) 
    //     {
    //       this.images[i].imagesArray[j].status="P";
    //       // this.images[i].imagesArray[j].guestId=this.filterInput.guestId;
    //     }
    //   }
    // }
    this.imageService.approveImage(this.images,this.filterInput)
  }

}

@Component({
  selector: 'page-manage-share-photo',
  templateUrl: 'manage-share-photo.html',
})
export class ManageSharePhotoPage {
  imageOptions:any;
  imagesArray:any;
  imageInfo:any={};
  imageCounter:number=0;
  loader:boolean=false;
  filter:any={};
  guests:any;
  userInfo:any;
  groupImagesIds:any=[];
  groupImages:any=[];
  groups:any;
  constructor(public groupMessageService:GroupMessageService, public groupImageService:GroupImageService,public guestservice:GuestService,public service:SessionService,public events:Events,public viewCtrl:ViewController,public imageService:ShareImageService, public imagePicker: ImagePicker,public navCtrl: NavController, public navParams: NavParams) {
    this.imageInfo.imagesArray=[];

    console.log("user info===="+JSON.stringify(this.service.getUser()));
    this.userInfo=this.service.getUser();
    // this.imageInfo.userType=this.service.
  
  }

  ionViewDidLoad() {
    // this.imageInfo.imagesArray=[];

    setTimeout(() => {  
      this.guestservice.getGuests();
    },100);

    this.events.subscribe('fetch:guests', guests=> {
      this.guests=guests;

      this.groupMessageService.getGroups(1);
    })

   


    this.events.subscribe('fetch:groups', groups=> {
      this.groups=groups;
      
    })


    
    if(this.service.getUser().userType==1)
    {
      if(!this.imageInfo.guestId)
      {
        this.imageInfo.guestId=0;

      }
      // this.imageInfo.id=this.service.getUser().id;
      this.imageInfo.senderId=this.service.getUser().id;
      this.imageInfo.userId=this.service.getUser().id;
      this.imageInfo.status="A";
    }
    else
    {
      // this.imageInfo.status='P';
      // this.imageInfo.imagesArray.push({"imageUrl":this.service.getRandomString(5)});      
      // this.imageInfo.id=this.service.getUser().id;
      this.imageInfo.senderId=this.service.getUser().id;
      this.imageInfo.guestId=this.service.getUser().id;
      this.imageInfo.userId=this.service.getUser().userId;
      this.imageInfo.status="P";
    }
    this.imageInfo.id=this.service.getRandomString(4);
    this.imageInfo.userType=this.service.getUser().userType;


    console.log('ionViewDidLoad SharePhotoPage'+this.imageInfo);


  }



  getGroupImages()
  {
    // this.groupImageService.getGroupImages(this.imageInfo);
  }
  chooseImages()
  { 

    for(var i=0;i<3;i++)
    {
      this.imageInfo.imagesArray.push({"id":this.service.getRandomString(5),"imageUrl":this.service.getRandomString(5),"status":'A',"groupId":this.imageInfo.groupId,"userId":this.service.getUser().id});
    }
    
    // this.imageInfo.imagesArray=[];
    // this.imageOptions= {
    //   maximumImagesCount:50, 
    //   quality: 100, 
    //   width: 200, 
    //   height: 200
    // };   
    // this.imagePicker.getPictures(this.imageOptions).then((results) => {
    //   var base64File;

    //   if(this.imageInfo.imageType==1)
    //   {
    //     for (var i = 0; i < results.length; i++) {

    //       this.imageInfo.imagesArray.push({"id":this.service.getRandomString(5),"imageUrl":results[i],"status":this.imageInfo.status,"guestId":this.imageInfo.guestId});      
    //       // this.imageInfo.imagesArray.push({"imageUrl":results[i]});
    //       console.log('Image URI: ' + base64File);
    //     }
    //   }
    //   else
    //   {
    //     for (var i = 0; i < results.length; i++) {
    //       if(this.service.getUser().userType==1)
    //       {
    //         this.imageInfo.imagesArray.push({"id":this.service.getRandomString(5),"imageUrl":results[i],"status":'A',"groupId":this.imageInfo.groupId,"userId":this.service.getUser().id});
    //       }
    //       else
    //       {
    //         this.imageInfo.imagesArray.push({"id":this.service.getRandomString(5),"imageUrl":results[i],"status":'P',"groupId":this.imageInfo.groupId,"guestId":this.service.getUser().id});
    //       }  
    //       // this.imageInfo.imagesArray.push({"imageUrl":results[i]});
    //       console.log('Image URI: ' + base64File);
    //     }
    //   }
    
    // }, (err) => { 
    //   alert("Error 68==="+JSON.stringify(err));
    //   console.log("Failed to fetch images===="+JSON.stringify(err));
    // });
  }

 
  sharePhoto()
  {
    this.loader=true;
    console.log("image arrray==="+JSON.stringify(this.imageInfo));

    if(this.imageCounter==this.imageInfo.imagesArray.length)
    {
      console.log("Image counter=="+this.imageCounter);


      if(this.imageInfo.imageType==1)
      {
        this.imageService.sharedImages(this.imageInfo);
      }
      else
      {
        this.groupImageService.shareGroupImages(this.imageInfo)
      }
      

      console.log("Sharing.................................");
      this.closeModal();
      this.imageCounter=0;
      this.loader=false;
    }
    else
    {
      console.log("Image counter=="+this.imageCounter);
      this.convertToBase64(this.imageInfo.imagesArray[this.imageCounter].imageUrl, 'image/png').then(
        data => {
          // alert("Base64 image===");
          console.log("Base64 file===="+data.toString());
          this.imageInfo.imagesArray[this.imageCounter].imageUrl=data.toString();
          // alert("Converted successfully=="+JSON.stringify(this.imageInfo.imagesArray));
          this.imageCounter++;
          this.sharePhoto();
        },err=>{
          alert("Error===90"+err);
        }
      ); 
    }


  }

  approveGroupImages()
  {
    

    for(var i=0;i<this.groupImages.length;i++)
    {
      for(var j=0;j<this.groupImages[i].imagesArray.length;j++)
      {
        if(this.groupImages[i].imagesArray[j].selected)
        {
          this.groupImagesIds.push(this.groupImages[i].imagesArray[j].id);
        }
      }
    }
  }
  sharePhotoInGroup()
  {
    if(this.imageCounter==this.imageInfo.imagesArray.length)
    {
      this.imageService.sharedImages(this.imageInfo);
      this.closeModal();
      this.loader=false;
    }
    else
    {
      this.convertToBase64(this.imageInfo.imagesArray[this.imageCounter].imageUrl, 'image/png').then(
        data => {
          // alert("Base64 image===");
          console.log("Base64 file===="+data.toString());
          this.imageInfo.imagesArray[this.imageCounter].imageUrl=data.toString();
          // alert("Converted successfully=="+JSON.stringify(this.imageInfo.imagesArray));
          this.imageCounter++;
          this.sharePhoto();
        },err=>{
          alert("Error===90"+err);
        }
      ); 
    }
  }
  convertToBase64(url, outputFormat) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        canvas = null;
        resolve(dataURL);
      };
      img.src = url;
    });
  }

  deleteImages()
  {
    this.imageService.deleteImages(this.imageInfo);
    this.closeModal();
  }


  closeModal()
  {
    this.viewCtrl.dismiss();
  }

}
