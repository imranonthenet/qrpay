import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { VerificationPage } from '../verification/verification';

import { TabsPage } from '../tabs/tabs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { CustomerService } from '../../services/customer';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private customerService: CustomerService
  ) {

  }

  onSignup(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();

    this.authService.signup(form.value.email, form.value.password)
      .then((data) => {
        
        const token = data.user['ra'];

        this.customerService.customer = {
          fullname: form.value.fullname,
          email: form.value.email,
          phone: form.value.phone,
          createdAt: new Date().getTime()
        }

        this.customerService.createCustomer(token).subscribe(
          (res) => {
            console.log(res);
          },
          (error) => console.log(error) 
        )
        loading.dismiss();

      })
      .catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed!',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      })
  }

}
