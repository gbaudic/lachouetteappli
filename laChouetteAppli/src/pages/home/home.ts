import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: ShoppingItem[] = [];

  constructor(public navCtrl: NavController,
      public dialogs: Dialogs,
      private nativeStorage: NativeStorage) {

  }
  
  ionViewDidLoad() {
    // Load saved data if exists
  }
  
  ionViewDidLeave() {
    // Save data
  }
  
  addItem(): void {
    // Open dialog and add to array
    this.dialogs.prompt('Ajouter item', '', ['OK', 'Annuler'], '').then(
      theResult => {    
          if ((theResult.buttonIndex == 1) && (theResult.input1 !== '')) {
            this.items.push({ name: theResult.input1, bought: false });                      
          }
        });
  }
  
  deleteItem(item: ShoppingItem): void {
    item.bought = true;
    let index = this.items.indexOf(item);   
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
  
  markAsDone(item: ShoppingItem): void {
    item.bought = true;
  }

}

export class ShoppingItem {
  name: string;
  bought = false;
}
