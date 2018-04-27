import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Calendar } from '@ionic-native/calendar';
import { TafClass } from '../taf/taf';

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
    public platform: Platform,
    private appPreferences: NativeStorage,
	private calendar: Calendar) {
	platform.ready().then(() => { 
	  this.appPreferences.getItem('tafList').then(res => { this.tafs = res.tafs; }, err => {});
	});
  }

  ionViewDidLoad() {
	this.appPreferences.getItem('firstName').then(res => { this.firstName = res.firstName; }, err => {});
	this.appPreferences.getItem('lastName').then(res => { this.lastName = res.lastName; }, err => {});
	this.appPreferences.getItem('email').then(res => { this.email = res.email; }, err => {});
  }
  
  ionViewWillLeave() {
    // Save changes
	if(this.firstName) {
	  this.appPreferences.setItem('firstName',{firstName: this.firstName}).then(() => {}, err => {});
	}
	if(this.lastName) {
	  this.appPreferences.setItem('lastName',{lastName: this.lastName}).then(() => {}, err => {});
	}
	if(this.email) {
	  this.appPreferences.setItem('email',{email: this.email}).then(() => {}, err => {});
	}
	this.appPreferences.setItem('tafList',{tafs: this.tafs}).then(() => {}, err => {});
  }
  
  /** Filter to hide TAFs located in the past (before today, excluded) */
  tafFilter(taf: TafClass) : boolean {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return taf.startDate.valueOf() > today.valueOf();
  }
  
  addItem(): void {
    // TODO: open a custom view to enter details, validate input
    
  }
  
  editItem(taf: TafClass): void {
    // remove item, feed it to the TAF page
    // then take the returned object and put it back in the array
    // if user cancels action, we need a way to get the article 
  }
  
  deleteItem(taf: TafClass): void {
    let index = this.tafs.indexOf(taf);
    if(index > -1) {
      this.tafs.splice(index, 1);
    }
  }

}
