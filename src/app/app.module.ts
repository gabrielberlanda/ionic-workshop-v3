import { BrandsPage } from './../pages/brands/brands.page';
import { AppRepositoriesModule } from './../repositories/app-repositories.module';
import { AppServicesModule } from './../services/app-services.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    BrandsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AppRepositoriesModule,
    AppServicesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BrandsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
