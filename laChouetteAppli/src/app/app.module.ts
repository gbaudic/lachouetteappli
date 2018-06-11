import { LOCALE_ID, NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr'

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { CardPage } from '../pages/card/card';
import { CalculatorPage } from '../pages/calculator/calculator';
import { TafPage } from '../pages/taf/taf';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Brightness } from '@ionic-native/brightness';
import { Dialogs } from '@ionic-native/dialogs';
import { Calendar } from '@ionic-native/calendar';
import { OffProvider } from '../providers/off/off';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    CardPage,
	CalculatorPage,
	TafPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    CardPage,
	CalculatorPage,
	TafPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    BarcodeScanner,
    Brightness,
	Dialogs,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
	{provide: LOCALE_ID, useValue:'fr'},
	Calendar,
    OffProvider
  ]
})
export class AppModule {}

registerLocaleData(localeFr, 'fr');
