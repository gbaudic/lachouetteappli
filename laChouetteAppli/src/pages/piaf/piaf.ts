import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { DatePicker } from '@ionic-native/date-picker';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/fr';

/**
 * Generated class for the TafPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-taf',
  templateUrl: 'piaf.html',
})
export class TafPage {
  nextTAF: TafClass;
  public occupations: string[] = ['Chouettos', 'Caisse 1', 'Caisse 2', 'Support caisse', 'GH en formation', 'Grand Hibou'];
  nextOccupation: string;
  nextStartDate: string;
  nextEndDate: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    public dialogs: Dialogs,
	private datePicker: DatePicker) {
    if (navParams.get('tafToEdit')) {
      let tafToEdit = navParams.get('tafToEdit') as TafClass;
      this.nextOccupation = tafToEdit.occupation;
      let tempDate = moment.utc(tafToEdit.startDate);
      // tempDate.setHours(tempDate.getHours() - tempDate.getTimezoneOffset() / 60);
      this.nextStartDate = tempDate.format('Y-MM-DDTHH:mm');
      tempDate = moment.utc(tafToEdit.endDate);
      // tempDate.setHours(tempDate.getHours() - tempDate.getTimezoneOffset() / 60);
      this.nextEndDate = tempDate.format('Y-MM-DDTHH:mm');
    } else {
      let today = moment.utc();
      // Awful trick to get around timezone issue because Ionic datepicker only understands
      // the ISO text representation, which includes timezone
      this.nextEndDate = today.format('Y-MM-DDTHH:mm');
      this.nextStartDate = today.format('Y-MM-DDTHH:mm');
    }
  }

  ionViewDidLoad() {
  }

  /** Automagically set end date when start date is touched
   * Obviously setting end date does not affect start date */
  bumpEndDate() {
	let tempDate = moment.utc(this.nextStartDate);
	tempDate.add(3, 'hours');
    this.nextEndDate = tempDate.format('Y-MM-DDTHH:mm');
  }

  /** Perform a basic check on user inputs */
  validate(): boolean {
    if (this.nextOccupation === undefined || this.nextOccupation.length === 0) {
      return false;
    }
    let today = moment.utc();
    let start = moment.utc(this.nextStartDate);
    let theEnd = moment.utc(this.nextEndDate);
    if (this.nextStartDate === undefined || start.isBefore(today)) {
      return false;
    }
    if (this.nextEndDate === undefined || theEnd.isBefore(start)) {
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
      newTaf.endDate = moment.utc(this.nextEndDate);
      // Get date back to its actual UTC value
      newTaf.startDate = moment.utc(this.nextStartDate);
      this.viewCtrl.dismiss(newTaf);
    }
  }

}

export class TafClass {
  occupation: string;
  startDate: Moment;
  endDate: Moment;
}
