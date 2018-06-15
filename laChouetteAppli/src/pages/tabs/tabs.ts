import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { CardPage } from '../card/card';
import { CalculatorPage } from '../calculator/calculator';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = ContactPage;
  tab4Root = CardPage;
  tab5Root = SettingsPage;
  tab6Root = CalculatorPage;

  constructor() {

  }
}
