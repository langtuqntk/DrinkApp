import { NgModule } from '@angular/core';
import {ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import { PagesComponent } from './pages.component';
import { TrangChuModule } from './trangchu/trangchu.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BanHangComponent } from './banhang/banhang.component';
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
    TrangChuModule,
    NgbModule,
    ToasterModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [ToasterService],
})
export class PagesModule {
}
