import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController,ModalController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { SessionService,ShareImageService} from '../../app/sessionservice';
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
  
  constructor(public service:SessionService,public modalCtrl:ModalController,public events:Events,public imageService:ShareImageService,public imagePicker: ImagePicker,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    setTimeout(() => {  
      this.imageService.getSharedImages()         
    },100);
    
    this.events.subscribe('fetch:images', images1=> {
      // alert("Images===="+JSON.stringify(images));


      this.service.showToast2("Successfully upload images");

      console.log("image upload==="+JSON.stringify(images1));
      this.imagesArray=[];

      // if(images[0])
      // {
      //   for(var i=0;i<images[0].length;i++)
      //   {
      //     this.imagesArray.push(images[0][i]);
      //   }
      //   alert("image array==="+JSON.stringify(this.imagesArray));
      // }

      // console.log("Imagess==="+images1);
      this.images=images1;

      console.log("Images===="+this.images);
      // for(var i=0;i<images.length;i++)
      // {
      //   this.imagesArray.push(images[i].imagesArray[0])  
      // }

      // this.imagesArray=images;
      
      
      
    })
    console.log('ionViewDidLoad SharePhotoPage');
  }

  addImages()
  {
    let profileModal = this.modalCtrl.create(ManageSharePhotoPage);
    profileModal.present();
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

  constructor(public service:SessionService,public events:Events,public viewCtrl:ViewController,public imageService:ShareImageService, public imagePicker: ImagePicker,public navCtrl: NavController, public navParams: NavParams) {
    this.imageInfo.imagesArray=[];
    // this.imageInfo.userType=this.service.
  
  }

  ionViewDidLoad() {
    // this.imageInfo.imagesArray=[];
    console.log('ionViewDidLoad SharePhotoPage'+this.imageInfo);
  }




  chooseImages()
  { 
    this.imageOptions= {
      maximumImagesCount:50, 
      quality: 100, 
      width: 200, 
      height: 200
    };   
    this.imagePicker.getPictures(this.imageOptions).then((results) => {
      var base64File;
      for (var i = 0; i < results.length; i++) {
        this.imageInfo.imagesArray.push({"imageUrl":results[i]});
        console.log('Image URI: ' + base64File);
      }
    }, (err) => { 
      alert("Error 68==="+JSON.stringify(err));
      console.log("Failed to fetch images===="+JSON.stringify(err));
    });
  }

  sharePhoto()
  {

    this.loader=true;
    console.log("image arrray==="+JSON.stringify(this.imageInfo));

    // this.imageInfo.imagesArray.push({"imageUrl":"data:image/png;base64,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"})
    // this.imageInfo.imagesArray[0].imageUrl="data:image/png;base64,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";
    // this.imageService.sharedImages(this.imageInfo);
    // this.closeModal();
    // this.imageInfo.imagesArray=[5, 4, 3];

    // console.log("image info==="+JSON.stringify(this.imageInfo));
    // // this.imageInfo.imagesArray=[6, 4, 3];
    // this.imageInfo.imagesArray.concat([6, 4, 3]);
    // console.log("image info2==="+JSON.stringify(this.imageInfo));


    // var arr1 = ['a', 'b', 'c'];
    // var arr2 = ['d', 'e', 'f'];
    
    // arr1 = arr1.concat(arr2);


    // console.log("Array3==="+arr1);
    // return;
    // this.loader=true;
    // this.imageInfo.userId=this.service.getUser().id;
    // this.imageInfo.userType=this.service.getUser().userType;
    // alert("image array==="+this.imageInfo.imagesArray.length);
    if(this.imageCounter==this.imageInfo.imagesArray.length)
    {
      // alert("Image counter in if=="+this.imageCounter);
      console.log("Image counter=="+this.imageCounter);
      this.imageService.sharedImages(this.imageInfo);
      this.closeModal();
      this.loader=false;
    }
    else
    {
      // alert("Image counter in else=="+JSON.stringify(this.imageInfo.imagesArray[this.imageCounter]));
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
