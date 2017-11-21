import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { BansComponent } from './bans/bans.component';
import { HangsComponent } from './hangs/hangs.component';
import { KhachHangsComponent } from './khachhangs/khachhangs.component';
import { NhanViensComponent } from './nhanviens/nhanviens.component';
import { PhieuNhapComponent } from './phieunhaps/phieunhap.component';
import { PhieuNhapCtietComponent } from './phieunhaps/phieunhapctiet/phieunhapctiet.component';
import { PhieuXuatComponent } from './phieuxuats/phieuxuat.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'bans',
      component: BansComponent,
    },
    {
      path: 'hangs',
      component: HangsComponent,
    },
    {
      path: 'khachhangs',
      component: KhachHangsComponent,
    },
    {
      path: 'nhanviens',
      component: NhanViensComponent,
    },
    {
      path: 'phieunhaps',
      component: PhieuNhapComponent,
    },
    {
      path: 'phieuxuats',
      component: PhieuXuatComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  BansComponent,
  HangsComponent,
  KhachHangsComponent,
  NhanViensComponent,
  PhieuNhapComponent,
  PhieuNhapCtietComponent,
  PhieuXuatComponent,
];
