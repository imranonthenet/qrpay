import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { TabsPage } from '../tabs/tabs';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  constructor(public navCtrl: NavController,
    private authSertvice: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {

  }
     
 signup(){
        this.navCtrl.push(SignupPage)
  }  
 forgotpassword(){
        this.navCtrl.push(ForgotpasswordPage)
  } 
 tabs(){
        this.navCtrl.setRoot(TabsPage)
       
  } 

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });

    loading.present();

    this.authSertvice.signin(form.value.email, form.value.password)
      .then((data) => {
        loading.dismiss();
      })
      .catch((error) => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Sign in failed!',
          message: error.message,
          buttons:['Ok']
        });

        alert.present();
      });

  }

}
