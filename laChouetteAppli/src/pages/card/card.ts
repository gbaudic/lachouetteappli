import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Brightness } from '@ionic-native/brightness';
import  bwipjs  from 'bwip-angular2';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private toastCtrl: ToastController
    ) {
  }

  ionViewDidLoad() {
    // Try to get stored number in preferences (along with names)
    
    this.appPreferences.getItem('cardNumber')
        .then(res => { this.cardNumber = res.cardNumber; return;}, 
		err => {
		  let toast = this.toastCtrl.create({
		    message: err,
            duration: 1500
          });
          toast.present();
		})
        .then( () => {
            // If success, display the card and set brightness to max
            if(this.cardNumber != '') {
              this.drawCard();
            }
        });
    // console.log('ionViewDidLoad CardPage');
  }
  
  launchScan(): void {
    this.barcodeScanner.scan({formats: 'EAN_13'}).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.cardNumber = barcodeData.text;
      this.appPreferences.setItem('cardNumber',{cardNumber: barcodeData.text})
                         .then();
	  this.drawCard();
    }).catch(err => {
      console.log('Error', err);
      let toast = this.toastCtrl.create({
        message: err,
        duration: 1500
      });
      toast.present();
    });
  }
  
  drawCard(): void {
    bwipjs('leBarcode', {
                bcid:        'ean13',       // Barcode type
                text:        this.cardNumber, // Text to encode
                scale:       2,               // 3x scaling factor
                height:      20,              // Bar height, in millimeters
                includetext: false,            // Show human-readable text
                textxalign:  'center',        // Always good to set this
                }, function (err, cvs) {
                    if (err) {
                        // `err` may be a string or Error object
                        console.log(err);
                    }
            });
    this.brightness.getBrightness().then((res) => { this.brightnessValue = res; })
            .then(() => this.brightness.setBrightness(1) );
  }

  ionViewDidLeave() {
    // Restore brightness to previous value
    if(this.brightnessValue) {
      this.brightness.setBrightness(this.brightnessValue);
    }
  }
}
