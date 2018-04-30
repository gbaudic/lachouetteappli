import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Calendar } from '@ionic-native/calendar';
import { TafPage, TafClass } from '../taf/taf';

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
  tafs: TafClass[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public platform: Platform,
    private appPreferences: NativeStorage,
    private calendar: Calendar) {
    platform.ready().then(() => {
      this.appPreferences.getItem('tafList').then(res => { this.tafs = res.tafs; }, err => { });
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillLeave() {
    // Save changes
    this.appPreferences.setItem('tafList', { tafs: this.tafs }).then(() => { }, err => { });
  }

  /** Filter to hide TAFs located in the past (before today, excluded) */
  tafFilter(taf: TafClass): boolean {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return taf.startDate.valueOf() > today.valueOf();
  }

  addItem(): void {
    // Open a custom view to enter details
    let addModal = this.modalCtrl.create(TafPage);
    addModal.onDidDismiss(data => {
      if (data) {
        console.log(data);
        this.tafs.push(data as TafClass);
      }
    });
    addModal.present();
  }

  editItem(taf: TafClass): void {
    // remove item, feed it to the TAF page
    // then take the returned object and put it back in the array
    // if user cancels action, we need a way to get the article
    let index = this.tafs.indexOf(taf);
    let editModal = this.modalCtrl.create(TafPage, { tafToEdit: taf });
    editModal.onDidDismiss(data => {
      if (data) {
        console.log(data);
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

}
