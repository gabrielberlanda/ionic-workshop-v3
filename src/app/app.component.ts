import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Connection, createConnection } from 'typeorm';

import entities from './../entities';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  //#region Typeorm config constants
  private readonly cordovaSettings: any = {
    type: 'cordova',
    database: 'ionic-workshop',
    location: 'default'
  }

  private readonly browserSettings: any = {
    type: 'sqljs',
    autoSave: 'true',
    location: 'browser'
  }

  private readonly defaultSettings: any = {
    logging: ['error', 'query', 'schema'],
    synchronize: true,
    entities: entities
  }
  //#endregion

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(async() => {
      this.configDatabase().then((connection) => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }).catch(err => console.error('Ocorreu um erro ao criar a conexão com o banco de dados'));
    });
  }

  async configDatabase(): Promise<Connection> { 
    const platformConfig = this.platform.is('cordova') ? this.cordovaSettings : this.browserSettings;
    const connection: Connection = await createConnection({...this.defaultSettings, ...platformConfig});
    return connection;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
