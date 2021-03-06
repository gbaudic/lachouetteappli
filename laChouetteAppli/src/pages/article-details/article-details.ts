import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ArticleDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-article-details',
  templateUrl: 'article-details.html',
})
export class ArticleDetailsPage {
  article: any; // see https://en.wiki.openfoodfacts.org/API/Read/Product

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
    if(navParams.get('article')) {
      this.article = navParams.get('article');
    }
  }

  ionViewDidLoad() {
  }

  close() {
    this.viewCtrl.dismiss();
  }

  addToShoppingList() {
    this.viewCtrl.dismiss(this.article.product_name);
  }
  
  getNovaText(nova: string) {
    switch(nova) {
	  case "1": 
	    return "Aliments non transformés ou transformés minimalement";
	  case "2":
	    return "Ingrédients culinaires transformés";
	  case "3":
	    return "Aliments transformés";
	  case "4":
	    return "Produits alimentaires et boissons ultra-transformés";
	  default:
	    return "inconnu";
	}
  }
}
