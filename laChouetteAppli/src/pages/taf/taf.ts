import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TafProvider } from '../../providers/taf/taf';

/**
 * Generated class for the TafPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-taf',
  templateUrl: 'taf.html',
})
export class TafPage {
  nextTAFs: TafClass[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl: LoadingController, private tafService: TafProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TafPage');
  }

}

export class TafClass {
  occupation: string;
  date: Date;
  hours: string; // TODO: improve this
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
