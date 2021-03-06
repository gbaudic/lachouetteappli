import { Component } from '@angular/core';
import { NavController, ToastController, Platform, LoadingController, ModalController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
import { NativeStorage } from '@ionic-native/native-storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { OffProvider } from '../../providers/off/off';
import { ArticleDetailsPage } from '../article-details/article-details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: ShoppingItem[] = [];

  constructor(public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    public dialogs: Dialogs,
    private nativeStorage: NativeStorage,
    private platform: Platform,
    private barcodeScanner: BarcodeScanner,
    private off: OffProvider) {
    platform.ready().then(() => { this.loadData(); });
  }

  loadData() {
    // Load saved data if exists
    this.nativeStorage.getItem('shoppingList').then(
      data => { this.items = data.items; },
      err => this.showToast('Aucune liste trouvée : ' + err)
    );
  }

  ionViewWillLeave() {
    // Save data
    this.nativeStorage.setItem('shoppingList', { items: this.items }).then(
      () => { },
      err => this.showToast('Problème de sauvegarde : ' + err)
    );
  }
  
  showToast(msg: string) {
	let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  addItem(): void {
    console.log('Add clicked');
    // Open dialog and add to array
    this.dialogs.prompt('Ajouter item', '', ['OK', 'Annuler'], '').then(
      theResult => {
        if ((theResult.buttonIndex == 1) && (theResult.input1 !== '')) {
          this.items.push({ name: theResult.input1, bought: false, code: '0' });
        }
      });
  }

  editItem(item: ShoppingItem): void {
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.dialogs.prompt('Modifier item', '', ['OK', 'Annuler'], this.items[index].name).then(
        theResult => {
          if ((theResult.buttonIndex == 1) && (theResult.input1 !== '')) {
            this.items[index].name = theResult.input1;
          }
        });
    }
  }

  deleteItem(item: ShoppingItem): void {
    item.bought = true;
    let index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  launchScan(): void {
    this.barcodeScanner.scan({ formats: 'EAN_13,QR_CODE' }).then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(barcodeData.format == 'EAN_13') {
        let loading = this.loadCtrl.create({
          dismissOnPageChange: true,
          content: 'Requête à OpenFoodFacts...'
        });
        loading.present();
        this.off.getOffData(barcodeData.text).then(data => {
          loading.dismiss();
          if (this.off.isProduct(data)) {
            // Open product info page
            let infoModal = this.modalCtrl.create(ArticleDetailsPage, { article: data.product });
            infoModal.onDidDismiss(name => {
              if (name) {
                this.items.push({ name: name, bought: false, code: barcodeData.text });
              }
            });
            infoModal.present();

          } else {
            this.showToast('Article inconnu !');
          }
        }, err => {
          loading.dismiss();
          this.showToast(err);
        });
    } else {
      // URL: open a browser 
      // TODO: check this and refine if needed
      let val = RegExp(/^https?:\/\//);
      if(val.test(barcodeData.text)) {
        window.open(barcodeData.text, '_system');
      }
    }

    }).catch(err => {
      console.log('Error', err);
      this.showToast(err);
    });
  }

  markAsDone(item: ShoppingItem): void {
    item.bought = true;
  }

  /** Helper function to sort list: bought items go last */
  compareItems(a: ShoppingItem, b: ShoppingItem): number {
    if (a.bought === b.bought) {
      return 0;
    } else {
      if (a.bought) {
        return 1;
      } else {
        return -1;
      }
    }
  }

}

export class ShoppingItem {
  name: string;
  code: string;
  bought = false;
}
