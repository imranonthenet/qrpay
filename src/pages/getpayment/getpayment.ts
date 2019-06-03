import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { PaymentService } from '../../services/payment';
import firebase from 'firebase';
import { PaymentsuccessfulPage } from '../paymentsuccessful/paymentsuccessful';

@Component({
  selector: 'page-getpayment',
  templateUrl: 'getpayment.html'
})
export class GetpaymentPage implements OnInit {
  qrcode = null;

  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    private paymentService: PaymentService,
    private alertCtrl: AlertController) {

  }

  onCancel() {
    this.navCtrl.pop();
  }
  ngOnInit() {

    // this.authService.getActiveUser().getIdToken()
    //   .then((token: string) => {
    //     this.paymentService.createPayment(token).subscribe(
    //       (res) => {
    //         this.qrcode = res['name'];
    //       },
    //       (error) => console.log(error) 
    //     )
    //   });

    const paymentsRef = firebase.database().ref('payments');
    const newPaymentRef = paymentsRef.push();
    newPaymentRef.set({
      createdAt: new Date().getTime(),
      customerId: firebase.auth().currentUser.uid,
      amount: 0,
      status: 0
    }, error => {
      if(error) {
        console.log(error);
      } else {
        console.log('data saved successfully');
        this.qrcode = newPaymentRef.key;

        newPaymentRef.on('value', snapshot => {
          const paymentData = snapshot.val();
          console.log(paymentData);

          if(paymentData) {

            if(paymentData.status == 1) {
              //merchant sent confirmation request
              const alert = this.alertCtrl.create({
                title: 'Confirm Payment',
                message: `Make a payment of ${paymentData.amount} SAR ?`,
                buttons: [
                  {
                    text: 'Yes, go ahead',
                    handler: () => {
                      console.log('proceed with payment');
                      

                      newPaymentRef.set({
  
                        amount: paymentData.amount,
                        createdAt: paymentData.createdAt,
                        customerId: paymentData.customerId,
                        status: 2
                      }, error => {
                        if(error) {
                          console.log(`error updating payment record: ${error}`);
                        } else {
                          console.log('Payment status changed to 2');
                        }
                      });


                    }
                  },
                  {
                    text: 'No, I changed my mind!',
                    role: 'cancel',
                    handler: () => {
                      console.log('payment cancelled');

                      newPaymentRef.set({
  
                        amount: paymentData.amount,
                        createdAt: paymentData.createdAt,
                        customerId: paymentData.customerId,
                        status: 3
                      }, error => {
                        if(error) {
                          console.log(`error updating payment record: ${error}`);
                        } else {
                          console.log('Payment status changed to 3');
                        }
                      });
                    }
                  }
                ]
              });
              
              alert.present();

            }
            else if(paymentData.status == 3) {
              //if payment cancelled
              newPaymentRef.off();
              this.navCtrl.pop();
            }
            else if(paymentData.status == 4) {
              //if payment completed
              newPaymentRef.off();
              this.navCtrl.push(PaymentsuccessfulPage);
            }
          }

          
        });
      }
    });

  }
}
