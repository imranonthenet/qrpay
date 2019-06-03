import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import {MyprofilePage} from '../myprofile/myprofile';
import {FavoritedPage} from '../favorited/favorited';
import {NotificationPage} from '../notification/notification';
import {HelpPage} from '../help/help';
import {ConditionPage} from '../condition/condition';
import { AuthService } from '../../services/auth';
import { Customer, CustomerService } from '../../services/customer';
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage implements OnInit {

      customer: Customer = {
            fullname:'',
            email:'',
            phone:'',
            createdAt: 0
            };
          
  constructor(
        public navCtrl: NavController,
        private authService: AuthService,
        private loadingCtrl: LoadingController,
        private customerService: CustomerService) {

  }
   
  ngOnInit() {
      this.authService.getActiveUser().getIdToken()
      .then((token: string) => {
        this.customerService.getCustomer(token).subscribe(
          (res) => {
            this.customer = res[Object.keys(res)[0]];
            
          },
          (error) => console.log(error) 
        )
      });
  }
 myprofile(){
        this.navCtrl.push(MyprofilePage)
  }  
 favorited(){
        this.navCtrl.push(FavoritedPage)
  }
 notification(){
        this.navCtrl.push(NotificationPage)
  }
 help(){
        this.navCtrl.push(HelpPage)
  }  
 condition(){
        this.navCtrl.push(ConditionPage)
  } 

  logout() {
      const loading = this.loadingCtrl.create({
            content: 'Signing you out...'
      });
      loading.present();
      this.authService.logout().then(() => {
            loading.dismiss();
      });
  }

}
