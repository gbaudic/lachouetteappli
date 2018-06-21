import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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
  nextStartDate: string;
  nextEndDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public dialogs: Dialogs) {
    if (navParams.get('tafToEdit')) {
      let tafToEdit = navParams.get('tafToEdit') as TafClass;
      this.nextOccupation = tafToEdit.occupation;
      let tempDate = new Date(tafToEdit.startDate);
      tempDate.setHours(tempDate.getHours() - tempDate.getTimezoneOffset() / 60);
      this.nextStartDate = tempDate.toISOString();
      tempDate = new Date(tafToEdit.endDate);
      tempDate.setHours(tempDate.getHours() - tempDate.getTimezoneOffset() / 60);
      this.nextEndDate = tempDate.toISOString();
    } else {
      let today = new Date();
      // Awful trick to get around timezone issue because Ionic datepicker only understands
      // the ISO text representation, which includes timezone
      today.setHours(today.getHours() - today.getTimezoneOffset() / 60);
      this.nextEndDate = today.toISOString().slice(0,-8);
      this.nextStartDate = today.toISOString().slice(0,-8);
    }
  }

  ionViewDidLoad() {
  }

  /** Automagically set end date when start date is touched
   * Obviously setting end date does not affect start date */
  bumpEndDate() {
    let tempDate = new Date(this.nextStartDate);
    tempDate.setSeconds(3600 * 3);
    tempDate.setHours(tempDate.getHours() - tempDate.getTimezoneOffset() / 60);
    this.nextEndDate = tempDate.toISOString().slice(0,-8);
  }

  /** Perform a basic check on user inputs */
  validate(): boolean {
    if (this.nextOccupation === undefined || this.nextOccupation.length === 0) {
      return false;
    }
    let today = new Date();
    let start = new Date(this.nextStartDate);
    let theEnd = new Date(this.nextEndDate);
    if (this.nextStartDate === undefined || start.valueOf() < today.valueOf()) {
      return false;
    }
    if (this.nextEndDate === undefined || theEnd.valueOf() < start.valueOf()) {
      return false;
    }
    return true;
  }

  send() {
    // go back to TAF list
    if (!this.validate()) {
      // show dialog
      this.dialogs.alert('Données incorrectes !', 'Erreur')
        .then(() => { })
        .catch(e => { });
    } else {
      let newTaf = new TafClass();
      newTaf.occupation = this.nextOccupation;
      newTaf.endDate = new Date(this.nextEndDate);
      // Get date back to its actual UTC value
      newTaf.endDate.setHours(newTaf.endDate.getHours() + newTaf.endDate.getTimezoneOffset() / 60);
      newTaf.startDate = new Date(this.nextStartDate);
      newTaf.startDate.setHours(newTaf.startDate.getHours() + newTaf.startDate.getTimezoneOffset() / 60);
      this.viewCtrl.dismiss(newTaf);
    }
  }

}

export class TafClass {
  occupation: string;
  startDate: Date;
  endDate: Date;
}
