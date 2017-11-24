import { Component } from '@angular/core';
import { NbJSThemeOptions } from '@nebular/theme/services/js-themes/theme.options';
import { NbThemeService } from '@nebular/theme';
import { AnalyticsService } from '../../@core/utils';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./trangchu.component.scss'],
  templateUrl: './trangchu.component.html',
})
export class TrangChuComponent {
  theme: NbJSThemeOptions;

  constructor(private themeService: NbThemeService, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    this.themeService.getJsTheme()
      .subscribe((theme: NbJSThemeOptions) => this.theme = theme);
  }

  toggleTheme(theme: boolean) {
    const boolTheme = this.boolToTheme(theme);
    this.themeService.changeTheme(boolTheme);
    this.analyticsService.trackEvent('switchTheme');
  }

  private boolToTheme(theme: boolean) {
    return theme ? 'default' : 'cosmic';
  }
}
