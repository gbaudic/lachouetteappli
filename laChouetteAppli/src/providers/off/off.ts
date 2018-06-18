import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the OffProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OffProvider {

  constructor(public http: HttpClient) {
  }
  
  getOffData(barcode: string): Promise<any> {
    return new Promise(resolve => {
	    this.http.get(`https://fr.openfoodfacts.org/api/v0/produit/${barcode}.json`);
	  });
  }
  
  /** Helper function to tell when a product does not exist
      Data based on OFF wiki: https://en.wiki.openfoodfacts.org/API/Read/Product  */
  isProduct(data: any): boolean {
    return data.code != '32421';
  }

}
