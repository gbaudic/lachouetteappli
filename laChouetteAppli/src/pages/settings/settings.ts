import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
    private appPreferences: NativeStorage,
	private calendar: Calendar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
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
  }
  
  addItem(): void {
    // TODO: open a custom view to enter details, validate input
    
  }

}
