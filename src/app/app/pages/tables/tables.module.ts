import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { BanService } from '../../@core/data/ban.service'
import { HangService } from '../../@core/data/hang.service'
import { KhachHangService } from '../../@core/data/khachhang.service'
import { NhanVienService } from '../../@core/data/nhanvien.service'
import { PhieuNhapService } from '../../@core/data/phieunhap.service'
import { PhieuXuatService } from '../../@core/data/phieuxuat.service'
import { DropdownComponent } from './hangs/dropdown/dropdown.component';
import { PhieuNhapCtietComponent } from './phieunhaps/phieunhapctiet/phieunhapctiet.component';
 
@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    DropdownComponent,
  ],
  providers: [
    SmartTableService,
    BanService,
    HangService,
    KhachHangService,
    NhanVienService,
    PhieuNhapService,
    PhieuXuatService,
  ],
  entryComponents: [ DropdownComponent, PhieuNhapCtietComponent ]
})
export class TablesModule { }
