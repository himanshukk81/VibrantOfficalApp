import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController  } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { SessionService } from '../../app/sessionservice';
/**
 * Generated class for the FunctionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-functions',
  templateUrl: 'functions.html',
})
export class FunctionsPage {
  functions: FirebaseListObservable<any[]>;
  loader:boolean;
  constructor(public modalCtrl:ModalController, public service:SessionService,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {

    this.functions=this.db.list('/functions')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FunctionsPage');
  }


  functionDetail(function2)
  {
    this.service.setFunction(function2);
    this.addFunction();
  }
  removeFunction(function2)
  {
    // this.db.list('/budget').delete();
    this.db.object('/functions/' + function2.$key).remove().then(()=>{
      console.log("Successfully deleted");
    },error=>{
      console.log("failed to deleted");
    })
  }
  addFunction()
  {
   let profileModal = this.modalCtrl.create(ManageFunctionsPage);
   profileModal.present();
  }
}

@Component({
  selector: 'page-manage-functions',
  templateUrl: 'manage-functions.html',
})
export class ManageFunctionsPage {
  functionInfo:any={};
  loader:boolean;
  update:boolean;
  constructor(public viewCtrl:ViewController, public service:SessionService,public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    if(this.service.getFunction())
    {
      this.functionInfo=this.service.getFunction();
      this.update=true;
      console.log('ionViewDidLoad ManageBudgetsPage');
    }
    else
    {
      this.update=false;
    }
    
  }

  saveFunctionInfo()
  {
    this.loader=true;
    this.functionInfo.createDate=new Date();
    this.db.list('/functions').push(this.functionInfo).then(({key}) => 
    {
      this.functionInfo.key=key;
      this.updateKey()
    },error=>{
      // this.service.showToast2("Something went wrong please try again");
    })
  }

  updateFunctionInfo()
  {
    this.loader=true;
    this.updateKey();
  }
  updateKey()
  {
      this.db.object('/functions/'+this.functionInfo.key).update(this.functionInfo).then((profile: any) =>{
            
            this.closeModal();
            console.log("Successfully updated functions====");
        })
      .catch((err: any) => {
          
          this.service.showToast2("Something went wrong please try again");
      });
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}
