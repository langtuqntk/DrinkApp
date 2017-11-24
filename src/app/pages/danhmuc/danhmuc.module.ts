import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { DanhMucRoutingModule, routedComponents } from './danhmuc-routing.module';
import { BanService } from '../../@core'
import { HangService } from '../../@core'
import { KhachHangService } from '../../@core'
import { NhanVienService } from '../../@core'
import { PhieuNhapService } from '../../@core'
import { PhieuXuatService } from '../../@core'
import { DropdownComponent } from '../../@theme/components';
import { PhieuNhapCtietComponent } from './phieunhaps/phieunhapctiet/phieunhapctiet.component';
 
@NgModule({
  imports: [
    ThemeModule,
    DanhMucRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    DropdownComponent,
  ],
  providers: [
    BanService,
    HangService,
    KhachHangService,
    NhanVienService,
    PhieuNhapService,
    PhieuXuatService,
  ],
  entryComponents: [ DropdownComponent, PhieuNhapCtietComponent ]
})
export class DanhMucModule { }
