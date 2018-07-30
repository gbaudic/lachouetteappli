import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Calendar } from '@ionic-native/calendar';
import { TafPage, TafClass } from '../taf/taf';
import * as moment from 'moment';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  firstName: string;
  lastName: string;
  email: string;
  seeFuture: string = "futur"; // too bad, ion-segment uses strings...
  tafs: TafClass[] = [];

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    private appPreferences: NativeStorage,
    private calendar: Calendar) {
    platform.ready().then(() => {
      this.appPreferences.getItem('tafList').then(
        res => {
          this.tafs = this.fromSavedTafs(res.tafs);
        },
        err => {
          let toast = this.toastCtrl.create({
            message: 'Aucun TAF trouvé : ' + err,
            duration: 1500
          });
          toast.present();
        });
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
    // Save changes
    this.appPreferences.setItem('tafList', { tafs: this.toSavedTafs(this.tafs) })
      .then(() => { },
      err => {
        let toast = this.toastCtrl.create({
          message: 'Erreur TAF : ' + err,
          duration: 1500
        });
        toast.present();
      });
  }

  /** 
   * Filter for TAFs located in the past (before today, excluded)  
   */
  tafFilter(taf: TafClass): boolean {
    let today = moment.utc();
    today.startOf('day');
    return taf.startDate.isAfter(today);
  }
  
  notTafFilter(taf: TafClass): boolean {
    let today = moment.utc();
    today.startOf('day');
    return taf.startDate.isBefore(today);
  }
  
  /** Ensure TAFs are ordered by date instead of order of entry */
  sortTaf(a: TafClass, b: TafClass): number {
    if (a.startDate.isBefore(b.startDate)) {
      return -1;
    } else {
      if (a.startDate.isSame(b.startDate)) {
        return 0;
      } else {
        return 1;
      }
    }
  }

  addItem(): void {
    // Open a custom view to enter details
    let addModal = this.modalCtrl.create(TafPage);
    addModal.onDidDismiss(data => {
      if (data) {
        this.tafs.push(data as TafClass);
      }
    });
    addModal.present();
  }

  editItem(taf: TafClass): void {
    let index = this.tafs.indexOf(taf);
    let editModal = this.modalCtrl.create(TafPage, { tafToEdit: taf });
    editModal.onDidDismiss(data => {
      if (data) {
        this.tafs[index] = data as TafClass;
      }
    });
    editModal.present();
  }

  deleteItem(taf: TafClass): void {
    let index = this.tafs.indexOf(taf);
    if (index > -1) {
      this.tafs.splice(index, 1);
    }
  }

  // Attempt to ensure correct serialization of objects for persistence

  toSavedTafs(tafs: TafClass[]): SavedTaf[] {
    let result: SavedTaf[] = [];

    for (let t of tafs) {
      let st = new SavedTaf();
      st.occupation = t.occupation;
      st.startDate = t.startDate.toISOString(true);
      st.endDate = t.endDate.toISOString(true);
      result.push(st);
    }

    return result;
  }

  fromSavedTafs(saved: SavedTaf[]): TafClass[] {
    let result: TafClass[] = [];

    for (let st of saved) {
      let t = new TafClass();
      t.occupation = st.occupation;
      t.startDate = moment.utc(st.startDate);
      t.endDate = moment.utc(st.endDate);
      result.push(t);
    }

    return result;
  } 
}

// Class to deal with serializing dates for persistence
export class SavedTaf {
  occupation: string;
  startDate: string;
  endDate: string;
}
