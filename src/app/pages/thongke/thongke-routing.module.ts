import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongKeComponent } from './thongke.component';
import { TKBanHangComponent } from './thongkebanhang/thongkebanhang.component';
import { TKHangTrongKhoComponent } from './thongkehangtrongkho/thongkehangtrongkho.component';

const routes: Routes = [{
  path: '',
  component: ThongKeComponent,
  children: [{
    path: 'thongkebanhang',
    component: TKBanHangComponent,
  },{
    path: 'thongkehangtrongkho',
    component: TKHangTrongKhoComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongKeRoutingModule { }

export const routedComponents = [
  ThongKeComponent,
  TKHangTrongKhoComponent,
  TKBanHangComponent,
];
