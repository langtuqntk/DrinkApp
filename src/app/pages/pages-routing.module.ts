import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { TrangChuComponent } from './trangchu/trangchu.component';
import { BanHangComponent } from './banhang/banhang.component';
import { HoaDonComponent } from './banhang/hoadon/hoadon.component';
import { NhapHangComponent } from './nhaphang/nhaphang.component';
import { CapNhatGiaComponent } from './capnhatgia/capnhatgia.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: '',
    component: TrangChuComponent, 
  },{
    path: 'banhang',
    component: BanHangComponent,
  },{
    path: 'hoadon/:sophieuxuat',
    component: HoaDonComponent,
  },{
    path: 'nhaphang',
    component: NhapHangComponent,
  },{
    path: 'capnhatgia',
    component: CapNhatGiaComponent,
  },{
    path: 'thongke',
    loadChildren: './thongke/thongke.module#ThongKeModule',
  },{
    path: 'danhmuc',
    loadChildren: './danhmuc/danhmuc.module#DanhMucModule',
  }, {
    path: '',
    redirectTo: 'trangchu',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
