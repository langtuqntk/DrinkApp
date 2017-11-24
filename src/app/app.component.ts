/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AnalyticsService } from './@core/utils';
import { AppState } from './app.service';
/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'ngx-app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Mean stack starter';
  public url = 'https://mean.io';

  constructor(
    public appState: AppState,
    private analytics: AnalyticsService
  ) { }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
    this.analytics.trackPageViews();
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */


 /**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

