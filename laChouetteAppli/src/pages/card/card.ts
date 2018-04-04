import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Brightness } from '@ionic-native/brightness';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  let brightnessValue: number;
  cardNumber: string;
  firstName = 'Prénom';
  lastName = 'Nom';
  

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    private barcodeScanner: BarcodeScanner,
    private brightness: Brightness
    ) {
  }

  ionViewDidLoad() {
    // Try to get stored number in preferences (along with names)
    this.appPreferences.fetch('firstName').then((res) => { this.firstName = res; });
    this.appPreferences.fetch('lastName').then((res) => { this.lastName = res; });
    
    this.appPreferences.fetch('cardNumber').then((res) => { this.cardNumber = res; });
    
    // If success, display the card and set brightness to max
    // TODO: fetch is asynchronous!!!!
    if(this.cardNumber) {
      this.brightnessValue = this.brightness.getBrightness();
      this.brightness.setBrightness(1);
    } else {
      // Open scanning so we can save the value
      this.launchScan();
    }
    console.log('ionViewDidLoad CardPage');
  }
  
  launchScan(): void {
    this.barcodeScanner.scan({formats: 'EAN_13'}).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.cardNumber = barcodeData.text;
      this.appPreferences.store('cardNumber',barcodeData.text)
                         .then();
    }).catch(err => {
      console.log('Error', err);
    });
  }

  ionViewDidLeave() {
    // Restore brightness to previous value
    if(this.brightnessValue) {
      this.brightness.setBrightness(this.brightnessValue);
    }
  }
}
