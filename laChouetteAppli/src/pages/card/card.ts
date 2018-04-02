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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: AppPreferences,
    private barcodeScanner: BarcodeScanner,
    private brightness: Brightness
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

}
