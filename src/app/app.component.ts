import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, ModalController } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LockScreenPage } from '../pages/lock-screen/lock-screen';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public modalCtrl: ModalController,
    private storage: Storage
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage },
      { title: 'LockScreenPage', component: LockScreenPage }
    ];
  }
  private sub1$:any;
  private sub2$:any;
  ionViewWillUnload() {
    this.sub2$.unsubscribe();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var storage = this.storage;
     this.sub2$=this.platform.resume.subscribe(() => {      
      console.log('****UserdashboardPage RESUMED****');
      storage.get('modal').then((val) => {
        if(val != 'true'){
          let modal1 = this.modalCtrl.create(LockScreenPage);
          modal1.present().then(function(){
            storage.set('modal', 'true');
          });
        }
      });
      }); 

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let modal = this.modalCtrl.create(LockScreenPage);
      modal.present();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
