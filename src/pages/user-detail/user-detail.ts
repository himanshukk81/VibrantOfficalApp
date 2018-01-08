import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,TextInput } from 'ionic-angular';
import { SessionService } from '../../app/sessionservice';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { count } from 'rxjs/operators/count';
import { Base64 } from '@ionic-native/base64';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';


import * as base64 from 'base64-img';

/**
 * Generated class for the UserDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var counter:0;
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})






export class UserDetailPage {
  @ViewChild(Content) content: Content;
  @ViewChild('chat_input') messageInput: TextInput;
  userInfo:any;
  // messageInfo1:any={};
  messageInfo:any={};
  // messages:any=[];
  imageOptions:any={};
  imagesArray:any=[];
  loader:boolean=false;
  selectedImages:any;
  storageRef:any=firebase.storage().ref();
  counter:number=0;
  counterDB:number=0;
  messages: FirebaseListObservable<any[]>;
  
  constructor(public db:AngularFireDatabase, public base64:Base64,public camera:Camera,public imagePicker: ImagePicker,public navCtrl: NavController,public service:SessionService) 
  {
    this.messageInfo.editorMsg='';
    this.userInfo=this.service.getOtherUserInfo();
    this.messages=this.db.list('/messages');
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
  isYou(message) {
    if(message.receiverId==this.service.getUser().key)
    {
      
      if(message.senderId==this.service.getOtherUserInfo().key)
      {
        return true;
      }
    }
  }
  isMe(message) { 
    if(message.senderId==this.service.getUser().key)
    {
      if(this.service.getOtherUserInfo().key==message.receiverId)
      {
        return true;
      }
    }  
  }


  showMessage(message)
  {
    if(message.senderId==this.service.getUser().key)
    {
      if(this.service.getOtherUserInfo().key==message.receiverId)
      {
        return true;
      }
    }
    if(message.receiverId==this.service.getUser().key)
    {
      if(message.senderId==this.service.getOtherUserInfo().key)
      {
        return true;
      }  
    }
  }
  sendMessage()
  {
    // this.messages.push({"editorMsg":this.messageInfo.editorMsg});
    // this.messageInfo.editorMsg='';
    // if(this.imagesArray.length>0)
    // {
    //   this.imageUpload();
    // }
    // var base64=null;
    // this.uploadServer(base64);
    this.loader=true;
    // this.messageInfo.editorMsg='';  
    if(this.imagesArray.length>0)
    {
      this.imageUpload();
    }
    else
    {
      this.addInDB();
    }
    
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
      for (var i = 0; i < results.length; i++) {
        this.imagesArray.push({"imageUrl":results[i]});
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { 
      alert("Error 68==="+JSON.stringify(err));
      console.log("Failed to fetch images===="+JSON.stringify(err));
    });
  }
  uploadInDB()
  {
    if(this.imagesArray.length==this.counterDB)
    {   
      this.loader=false;
      
      this.imagesArray=[];
      console.log("Completely uploaded");
    }
    else
    {
      this.messageInfo.imageUrl=this.imagesArray[this.counterDB].imageUrl;
      this.addInDB();
    }
  }

  addInDB()
    {
      this.messageInfo.receiverId=this.userInfo.key;
      this.messageInfo.senderId=this.service.getUser().key;
      this.db.list('/messages').push(this.messageInfo).then(({key}) => 
      {
         if(this.imagesArray.length>0)
         {
          this.imagesArray.splice(this.counterDB,1);
         }
        console.log("Insert");
        this.scrollToBottom();
        this.messageInfo.key=key;
        this.updateKey(this.messageInfo)
      },error=>{
        this.addInDB();
        this.service.showToast2("Something went wrong please try again");
      })

      
    }

    updateKey(message)
    {

        // alert("Message===="+JSON.stringify(message));
        this.db.object('/messages/'+message.key).update(message).then((message2: any) =>{
              console.log("update key===="+this.counterDB);
              this.messageInfo.editorMsg='';  
              if(this.imagesArray.length>0)
              {
                this.counterDB++;
                this.uploadInDB();
              }
          })
        .catch((err: any) => {
            // this.service.showToast2("Failed"+err);
            console.log("error===="+err);
            // this.updateKey(message);
        });
    }
  imageUpload()
  {
    
    console.log("array=="+this.imagesArray.length);
    // this.imagesArray.push({"imageUrl":"file:///data/data/com.vibrant.application/cache/tmp_IMG-20180102-WA0001-795329927.jpg"});
   
    
    if(this.imagesArray.length==this.counter)
    {
      // this.loader=false;
      // alert("Upload in s3");
      console.log("Upload in s3");
      this.uploadInDB();
    }
    else
    {
      console.log("New image upload");
      console.log("image="+this.imagesArray[this.counter]);
      let filePath: string = this.imagesArray[this.counter];
      this.convertToBase64(this.imagesArray[this.counter].imageUrl, 'image/png').then(
        data => {
          var base64File = data.toString();
          console.log("Base64==="+base64File);
          this.uploadServer(base64File);
        },err=>{
          alert("Error==="+err);
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

  uploadServer(base64)
  {


      const filename = Math.floor(Date.now() / 1000);
      const imagstorageRefeRef = this.storageRef.child(`images/${filename}.jpg`);
      console.log("firebase string=="+firebase.storage.StringFormat.DATA_URL);
      imagstorageRefeRef.putString(base64, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      // alert("Successfully uploaded==="+this.counter);
      // alert("image Array=="+JSON.stringify(this.imagesArray));
      // alert("image object=="+JSON.stringify(this.imagesArray[this.counter]));
      // alert("image Value=="+this.imagesArray[this.counter].imageUrl);
      console.log("image Array=="+JSON.stringify(this.imagesArray));
      // console.log("snapshot==="+snapshot.downloadURL);
      // alert("snapshot==="+snapshot.downloadURL);
      this.imagesArray[this.counter].imageUrl=snapshot.downloadURL;
      
      console.log("Url======"+JSON.stringify(this.imagesArray));
      this.counter++;
      this.imageUpload();
      }, (err) => {
            console.log("Error::::::;"+err);
            alert("Failed to upload on server")
      });
  }
}
