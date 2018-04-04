import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
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
    private appPreferences: AppPreferences) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
	this.appPreferences.fetch('firstName').then((res) => { this.firstName = res; });
	this.appPreferences.fetch('lastName').then((res) => { this.lastName = res; });
	this.appPreferences.fetch('email').then((res) => { this.email = res; });
  }
  
  ionViewDidLeave() {
    // Save changes
	
  }

}
