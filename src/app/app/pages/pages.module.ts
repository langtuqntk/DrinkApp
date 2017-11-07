import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NhapHangComponent } from './nhaphang/nhaphang.component';
import { CapNhatGiaComponent } from './capnhatgia/capnhatgia.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  NhapHangComponent,
  CapNhatGiaComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    NgbModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
