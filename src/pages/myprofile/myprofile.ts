import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { CustomerService, Customer } from '../../services/customer';

@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html'
})
export class MyprofilePage implements OnInit {
  customer: Customer = {
    fullname:'',
    email:'',
    phone:'',
    createdAt: 0
  };

  constructor(public navCtrl: NavController,
    private authService: AuthService,
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

}
