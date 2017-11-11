import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BanHangComponent } from './banhang/banhang.component';
import { ModalComponent } from './banhang/modal/modal.component';
import { HoaDonComponent } from './banhang/hoadon/hoadon.component';
import { NhapHangComponent } from './nhaphang/nhaphang.component';
import { CapNhatGiaComponent } from './capnhatgia/capnhatgia.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  BanHangComponent,
  HoaDonComponent,
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
