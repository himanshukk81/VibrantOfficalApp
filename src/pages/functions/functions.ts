import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController  } from 'ionic-angular';
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
  loader:boolean;
  constructor(public modalCtrl:ModalController, public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {

    
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
  constructor(public viewCtrl:ViewController, public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
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

  }

  updateFunctionInfo()
  {
    this.loader=true;
    this.updateKey();
  }
  updateKey()
  {

  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}
