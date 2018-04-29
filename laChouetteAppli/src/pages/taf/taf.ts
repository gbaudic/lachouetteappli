import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
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
    public viewCtrl: ViewController,
    public dialogs: Dialogs,
    private toastCtrl: ToastController) {
    if (navParams.get('tafToEdit')) {
      let tafToEdit = navParams.get('tafToEdit');
      this.nextOccupation = tafToEdit.occupation;
      this.nextStartDate = tafToEdit.startDate;
      this.nextEndDate = tafToEdit.endDate;
    }
  }

  ionViewDidLoad() {
  }

  /** Perform a basic check on user inputs */
  validate(): boolean {
    if (this.nextOccupation === undefined || this.nextOccupation.length === 0) {
      return false;
    }
    let today = new Date();
    if (this.nextStartDate === undefined || this.nextStartDate.valueOf() < today.valueOf()) {
      return false;
    }
    if (this.nextEndDate === undefined || this.nextEndDate.valueOf() < today.valueOf()) {
      return false;
    }
    return true;
  }

  send() {
    // go back to TAF list
    if (!this.validate()) {
      // show dialog
      this.dialogs.alert('Données incorrectes !', 'Erreur')
        .then(() => { });
    } else {
      let newTaf = new TafClass();
      newTaf.occupation = this.nextOccupation;
      newTaf.endDate = this.nextEndDate;
      newTaf.startDate = this.nextStartDate;
      this.viewCtrl.dismiss(newTaf);
    }
  }

}

export class TafClass {
  occupation: string;
  startDate: Date;
  endDate: Date;
}
