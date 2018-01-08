import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database-deprecated';
import { SessionService } from '../../app/sessionservice';
// import { ManageBudgetsPage } from '../manage-budgets/manage-budgets';

/**
 * Generated class for the BudgetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {
  
  budget:any;
  budgets: FirebaseListObservable<any[]>;
  constructor(public modalCtrl:ModalController,public service:SessionService, public db: AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {

    this.budgets=this.db.list('/budget')
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetsPage');
  }


  budgetDetail(budget)
  {
    this.service.setBudget(budget);
    // this.navCtrl.push(ManageBudgetsPage);
    this.addBudget();
  }

  removeBudget(budget)
  {
    // this.db.list('/budget').delete();
    this.db.object('/budget/' + budget.$key).remove().then(()=>{
      console.log("Successfully deleted");
    },error=>{
      console.log("failed to deleted");
    })
  }


   addBudget()
   {
    let profileModal = this.modalCtrl.create(ManageBudgetsPage);
    profileModal.present();
   }
    


}

@Component({
  selector: 'page-manage-budgets',
  templateUrl: 'manage-budgets.html',
})
export class ManageBudgetsPage {
  budget:any={};
  loader:any;
  update:boolean;
  constructor(public viewCtrl:ViewController,public db: AngularFireDatabase,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    if(this.service.getBudget())
    {
      this.update=true;
      this.budget=this.service.getBudget();
    }
    else
    {
      this.budget={};
      this.update=false;
    }
    console.log('ionViewDidLoad ManageBudgetsPage');
  }

  saveBudgetInfo()
  {

    if(!this.budget.name)
    {
      alert("Please enter budget name");
      return;
    }
    if(!this.budget.amount)
    {
      alert("Please enter budget amount");
      return;
    }
    this.budget.createDate=new Date();
    this.loader=true;
    this.db.list('/budget').push(this.budget).then(({key}) => 
    {
      this.budget.key=key;
      this.updateKey()
    },error=>{
      this.loader=false;
      this.service.showToast2("Something went wrong please try again");
      // this.service.showToast2("Something went wrong please try again");
    })
  }
  updateKey()
  {
      this.db.object('/budget/'+this.budget.key).update(this.budget).then((profile: any) =>{
            
            this.loader=false;
            this.closeModal();
            console.log("Successfully updated location====");
        })
      .catch((err: any) => {
          this.loader=false;
          this.service.showToast2("Something went wrong please try again");
      });
  }

  updateBudget()
  {
    this.budget.modifiedDate=new Date();
    this.loader=true;
    this.updateKey();

  }
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}
