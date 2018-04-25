import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
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
  nextTAF: TafClass;
  public occupations: string[] = ['Chouettos', 'Caisse 1', 'Caisse 2', 'Support caisse', 'GH en formation', 'Grand Hibou'];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl: LoadingController, private tafService: TafProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TafPage');
  }
  
  ionViewWillLeave() {
  
  }
  
  getTAF(): TafClass {
    return this.nextTAF;
  }

}

export class TafClass {
  occupation: string;
  startDate: Date;
  endDate: Date;
}
