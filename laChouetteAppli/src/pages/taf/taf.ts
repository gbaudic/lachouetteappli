import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { TafProvider } from '../../providers/taf/taf';
import { Dialogs } from '@ionic-native/dialogs';

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
  nextOccupation: string;
  nextStartDate: Date;
  nextEndDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private loadingCtrl: LoadingController, private tafService: TafProvider,
              public dialogs: Dialogs,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TafPage');
  }
  
  /** Perform a basic check on user inputs */
  validate() : boolean {
    // TODO
    if(this.nextOccupation === undefined || this.nextOccupation.length === 0) {
      return false;
    }
    return true;
  }
  
  send() {
    // go back to TAF list
    if(!this.validate()) {
      // show dialog
      return;
    } else {
    
    }
  }

}

export class TafClass {
  occupation: string;
  startDate: Date;
  endDate: Date;
}
