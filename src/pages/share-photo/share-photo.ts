import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,ViewController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { SessionService,ShareImageService} from '../../app/sessionservice';

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
  
  constructor(public events:Events,public imageService:ShareImageService,public imagePicker: ImagePicker,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    setTimeout(() => {  
      this.imageService.getSharedImages()         
    },100);
    
    this.events.subscribe('fetch:images', images=> {
      this.imagesArray=images;
    })
    console.log('ionViewDidLoad SharePhotoPage');
  }

}


export class ManageSharePhotoPage {
  imageOptions:any;
  imagesArray:any=[];
  imageInfo:any={};
  constructor(public viewCtrl:ViewController,public imageService:ShareImageService, public imagePicker: ImagePicker,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePhotoPage');
  }

  chooseImage()
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

        this.convertToBase64(results[i], 'image/png').then(
          data => {
            base64File = data.toString();
            console.log("Base64==="+base64File);
          },err=>{
            alert("Error==="+err);
          }
        );
        this.imagesArray.push({"imageUrl":base64File});
        console.log('Image URI: ' + base64File);
      }
    }, (err) => { 
      alert("Error 68==="+JSON.stringify(err));
      console.log("Failed to fetch images===="+JSON.stringify(err));
    });
  }

  sharePhoto()
  {
    this.imageInfo.images=this.imagesArray;
    this.imageService.sharedImages(this.imageInfo);
    this.closeModal();
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
