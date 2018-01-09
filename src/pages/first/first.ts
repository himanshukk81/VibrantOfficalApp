import { Component,ViewChild } from '@angular/core';
import {NavController, NavParams,Nav } from 'ionic-angular';
import { LoginPage } from '../../pages/Login/Login';

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {
  @ViewChild(Nav) nav: Nav;
  
  userButtonColor:any;
  joinneButtonColor:any;
  selectedUserInfo:any;
  pushPage:any;
  params:any={};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.userButtonColor="light";
   this.joinneButtonColor="light"; 
   this.pushPage=LoginPage;
   this.selectedUserInfo="1";
   this.params={id:this.selectedUserInfo};
    this.userButtonColor="secondary";
    this.joinneButtonColor="light";
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirstPage');
  }

  selectedUser(user)
  {
    this.selectedUserInfo=user;
    this.params.id=this.selectedUserInfo;
    if(user==1)
    {
      this.userButtonColor="secondary";
      this.joinneButtonColor="light";
    }
    else
    {
      this.joinneButtonColor="secondary"; 
      this.userButtonColor="light";
    }
  }
  // Next()
  // {
  //   this.navCtrl.push(LoginPage,this.selectedUserInfo);
  // }

 
}
