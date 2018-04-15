import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private appPreferences: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
	this.appPreferences.getItem('firstName').then((res) => { this.firstName = res.firstName; });
	this.appPreferences.getItem('lastName').then((res) => { this.lastName = res.lastName; });
	this.appPreferences.getItem('email').then((res) => { this.email = res.email; });
  }
  
  ionViewDidLeave() {
    // Save changes
	this.appPreferences.setItem('firstName',{firstName: this.firstName}).then();
	this.appPreferences.setItem('lastName',{lastName: this.lastName}).then();
	this.appPreferences.setItem('email',{email: this.email}).then();
  }

}
