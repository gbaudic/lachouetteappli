import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Brightness } from '@ionic-native/brightness';
import bwipjs from 'bwip-angular2';

@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  brightnessValue: number;
  cardNumber: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: NativeStorage,
    private barcodeScanner: BarcodeScanner,
    private brightness: Brightness,
    private toastCtrl: ToastController,
    private platform: Platform
  ) {
    platform.ready().then(() => {
      this.loadData();
    });
  }

  loadData() {
    // Try to get stored number in preferences (along with names)
    this.appPreferences.getItem('cardNumber')
      .then(res => { 
        this.cardNumber = res.cardNumber; 
        setTimeout(() => { this.drawCard(); }, 0);
      },
      err => this.showToast(err));
    // console.log('ionViewDidLoad CardPage');
  }
  
  showToast(err) {
	let toast = this.toastCtrl.create({
      message: err,
      duration: 1500
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.drawCard();
    this.brightness.getBrightness().then((res) => { this.brightnessValue = res; })
      .then(() => this.brightness.setBrightness(1));
  }

  launchScan(): void {
    this.barcodeScanner.scan({ formats: 'EAN_13' }).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.cardNumber = barcodeData.text;
      this.appPreferences.setItem('cardNumber', { cardNumber: barcodeData.text })
        .then(() => { }, err => { this.showToast(err) });
      setTimeout(() => { this.drawCard(); }, 0);
    }).catch(err => {
      console.log('Error', err);
      this.showToast(err);
    });
  }

  drawCard(): void {
    if (this.cardNumber.length > 0) {
      bwipjs('leBarcode', {
        bcid: 'ean13',       // Barcode type
        text: this.cardNumber, // Text to encode
        scale: 2,               // 3x scaling factor
        height: 15,              // Bar height, in millimeters
        includetext: false,            // Show human-readable text
        textxalign: 'center',        // Always good to set this
      }, function (err, cvs) {
        if (err) {
          // `err` may be a string or Error object
          console.log(err);
        }
      });
    }
  }

  ionViewWillLeave() {
    // Restore brightness to previous value
    if (this.brightnessValue) {
      this.brightness.setBrightness(this.brightnessValue);
    }
  }
}
