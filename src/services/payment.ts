import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth";
import { environment } from "../environments/environment";
import firebase from 'firebase';

export interface Payment {
    customerId: string;
    createdAt: number;
}

@Injectable()
export class PaymentService {
    

    constructor(
        private http: HttpClient,
        private authService: AuthService) {
    }

    createPayment(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.post(environment.firebase.databaseURL + '/payment.json?auth=' + token, {customerId: userId, createdAt: new Date().getTime()});
    }

    // createPayment() {
    //     const userId = this.authService.getActiveUser().uid;

    //     const paymentsRef = firebase.database().ref('payments');
    //     const newPaymentRef = paymentsRef.push();
    //     return newPaymentRef.set({customerId: userId, createdAt: new Date().getTime()});
    // }

}