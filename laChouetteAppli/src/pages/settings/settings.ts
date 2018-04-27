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
	  // TODO: load tafs from storage and filter
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
  }
  
  // TODO: filter to hide TAFs located in the past (before today, excluded)
  
  addItem(): void {
    // TODO: open a custom view to enter details, validate input
    
  }
  
  editItem(taf: TafClass): void {
  
  }
  
  deleteItem(taf: TafClass): void {
  
  }

}
