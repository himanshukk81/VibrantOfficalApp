import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController,Events } from 'ionic-angular';
import { SessionService,BudgetService,CateogryService,PaymentService } from '../../app/sessionservice';
@Component({
  selector: 'page-budgets',
  templateUrl: 'budgets.html',
})
export class BudgetsPage {
  
  budget:any;
  budgets:any;
  loader:boolean=true;
  totalEstimateCost:number=0;
  totalFinalCost:number=0;
  totalPaid:number=0;
  totalPending:number=0;
 
  constructor(public viewCtrl:ViewController, public events:Events,public budgetservice:BudgetService,public modalCtrl:ModalController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
  }


  

  ionViewDidLoad() {
   setTimeout(() => {  
    this.budgetservice.getBudgets();         
   },100); 

   this.events.subscribe('budgets:fetch', budgets=> {
      this.budgets=budgets
      this.totalEstimateCost=0;
      this.totalFinalCost=0;
      this.totalPaid=0;
      this.totalPending=0;    
      for(var i=0;i<this.budgets.length;i++)
      {
        this.totalEstimateCost+=parseInt(this.budgets[i].estimatedCost);
        this.totalFinalCost+=parseInt(this.budgets[i].finalCost);
        this.totalPaid+=parseInt(this.budgets[i].paid);
      }

      if(this.totalFinalCost>=this.totalPaid)
      {
        this.totalPending=this.totalFinalCost-this.totalPaid;
      }
      else
      {
        this.totalPending=0;
      }    
      this.loader=false;
   })
  }


  budgetDetail(budget)
  {
    this.service.setBudget(budget);
    let profileModal = this.modalCtrl.create(ManageBudgetsPage);
    profileModal.present();
  }

  removeBudget(budget)
  {
    // this.db.list('/budget').delete();
    
  }

  closeModal()
  {
    this.viewCtrl.dismiss();
  }


   addBudget()
   {
    this.service.setBudget(null); 
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
  budgetType:number=1;
  payments:any;
  paymentInfo:any={};
  paymentPage:boolean=false;
  constructor(public paymentservice:PaymentService,public categoryService:CateogryService,public events:Events,public budgetService:BudgetService, public viewCtrl:ViewController,public service:SessionService,public navCtrl: NavController, public navParams: NavParams) {
 
    
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

    this.events.subscribe('fetch:payments', payments=> {
      this.payments=payments
      this.loader=false;
      this.paymentPage=false;
    })
    console.log('ionViewDidLoad ManageBudgetsPage');
  }

  getPayments()
  {
    this.paymentPage=true;
  }

  addPayment()
  {
    this.paymentPage=true;
  }

  savePayments()
  {
    if(!this.paymentInfo.amount)
    {
      this.service.showToast("Please enter amount")
      return;
    }
    this.loader=true;
    this.paymentInfo.date=new Date();
    this.paymentInfo.budgetId=this.budget.id;
    this.paymentservice.savePayments(this.paymentInfo);
    this.closeModal();
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
    this.budget.id=this.service.getRandomString(3);
    this.budget.paid=0;
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


