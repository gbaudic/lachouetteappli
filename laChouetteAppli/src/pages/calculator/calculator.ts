import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CalculatorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calculator',
  templateUrl: 'calculator.html',
})
export class CalculatorPage {
  // Note: all amounts are expressed in cents to get around potential rounding issues
  amounts: Array<[number, number]> = [[1,0],[2,0],[5,0],[10,0],[20,0],[50,0],
									  [100,0],[200,0],[500,0],[1000,0],[2000,0],[5000,0],[10000,0],[20000,0],[50000,0]];
  total = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalculatorPage');
  }
  
  compute() {
    this.total = 0;
	for(let el of this.amounts) {
	  this.total += el[0]*el[1];
	}
  }
  
  reset() {
    for(let el of this.amounts) {
	  el[1] = 0;
	}
  }

}
