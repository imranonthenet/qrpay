import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { MallPage } from '../mall/mall';
import { My_ordersPage } from '../my_orders/my_orders';
import { Pay_or_sendPage } from '../pay_or_send/pay_or_send';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HomePage;//MallPage;
  tab3Root = HomePage;//Pay_or_sendPage;
  tab4Root = HomePage;//My_ordersPage ;
  tab5Root = AccountPage;

   constructor() {

  }
}
