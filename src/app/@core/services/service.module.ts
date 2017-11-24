import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerService, StateService, ElectricityService, UserService } from '../utils';
import { BanService } from './ban.service';
import { HangService } from './hang.service';
import { NhanVienService } from './nhanvien.service';
import { KhachHangService } from './khachhang.service';
import { PhieuNhapService } from './phieunhap.service';
import { PhieuXuatService } from './phieuxuat.service';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  PlayerService,
  BanService,
  HangService,
  NhanVienService,
  KhachHangService,
  PhieuNhapService,
  PhieuXuatService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ServiceModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
