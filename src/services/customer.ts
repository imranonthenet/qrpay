import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth";
import { environment } from "../environments/environment";


export interface Customer {
    createdAt: number;
    fullname: string;
    email: string;
    phone: string;
}

@Injectable()
export class CustomerService {
    customer: Customer;

    constructor(
        private http: HttpClient,
        private authService: AuthService) {
    }

    createCustomer(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.post(environment.firebase.databaseURL + '/customers/' + userId + '.json?auth=' + token, this.customer);
    }

    getCustomer(token: string) {
        const userId = this.authService.getActiveUser().uid;
        return this.http.get(environment.firebase.databaseURL + '/customers/' + userId + '.json?auth=' + token);
    }
}