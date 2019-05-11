import { Component, ViewChild } from '@angular/core';
import { Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { PromocodePage } from '../pages/promocode/promocode';
import {SigninPage} from '../pages/signin/signin';
import { TranslateService } from '../../node_modules/@ngx-translate/core';
import { TabsPage } from '../pages/tabs/tabs';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;
  isAuthenticated = false;
  tabsPage = TabsPage;
  @ViewChild('nav') nav: NavController;

 constructor(
  private platform: Platform, 
  private statusBar: StatusBar,
  private splashScreen: SplashScreen, 
  public translate:TranslateService
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    const config = {
      apiKey: "AIzaSyDkjhvgkRecbR9lQ3acjwlThQ9lfQtQwGI",
      authDomain: "ionic-proj-d4b8a.firebaseapp.com",
      databaseURL: "https://ionic-proj-d4b8a.firebaseio.com",
      projectId: "ionic-proj-d4b8a",
      storageBucket: "ionic-proj-d4b8a.appspot.com",
      messagingSenderId: "751171207366",
      appId: "1:751171207366:web:51539d6a50242ba4"
    }

    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.isAuthenticated = true;
        this.nav.setRoot(this.tabsPage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.rootPage);
      }
    });


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translate.setDefaultLang('en');
      this.translate.use('en');


    });
  }
}