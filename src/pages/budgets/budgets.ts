import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,Events } from 'ionic-angular';
import { SessionService,BudgetService,CateogryService } from '../../app/sessionservice';




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
  budgets:any;
  loader:boolean=true;
  constructor(public events:Events,public budgetservice:BudgetService,public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  }


  

  ionViewDidLoad() {
   setTimeout(() => {  
    this.budgetservice.getBudgets();         
   },100); 

   this.events.subscribe('budgets:fetch', budgets=> {
    this.budgets=budgets
    this.loader=false;
   })
    // console.log('ionViewDidLoad BudgetsPage');
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
  loader:any=true;
  update:boolean;
  categories:any=[];
  constructor(public categoryService:CateogryService,public events:Events,public budgetService:BudgetService, public viewCtrl:ViewController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
 
    
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

    
    setTimeout(() => {  
      this.categoryService.getCategories();            
    },100); 
    this.events.subscribe('fetch:categories', categories=> {
      this.categories=categories
      this.loader=false;
    })

    
    console.log('ionViewDidLoad ManageBudgetsPage');
  }

  saveBudgetInfo()
  {

    if(!this.budget.name)
    {
      this.service.showToast2("Please enter budget name");
      return;
    }
   
    if(!this.budget.categoryId)
    {
      this.service.showToast2("Please Choose Category");
      return;
    }
    if(!this.budget.estimatedCost)
    {
      this.service.showToast2("Please enter Estimated Cost");
      return;
    }
    if(!this.budget.finalCost)
    {
      this.service.showToast2("Please enter Final Cost");
      return;
    }
    this.budget.createDate=new Date();
    this.loader=true;
    this.budgetService.saveBudgets(this.budget);
    this.closeModal();
    
  }
 
  updateBudget()
  {
    this.loader=true;
    this.budget.modifiedDate=new Date();
    this.budgetService.updateBudgets(this.budget);
    this.closeModal();
    
   
  }
  closeModal()
  {
    this.viewCtrl.dismiss();
  }
}
