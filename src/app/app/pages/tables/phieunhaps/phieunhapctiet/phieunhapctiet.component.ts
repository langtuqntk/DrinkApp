import { OnInit, Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PhieuNhapService } from '../../../../@core/data/phieunhap.service';
import { NhanVienService } from '../../../../@core/data/nhanvien.service';
import { KhachHangService } from '../../../../@core/data/khachhang.service';
import { BanService } from '../../../../@core/data/ban.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-form-layouts',
  providers: [PhieuNhapService, NhanVienService, KhachHangService, BanService],
  templateUrl: './phieunhapctiet.component.html',
})
export class PhieuNhapCtietComponent {

  phieunhap = {
    Sophieunhap: "",
    Ngaynhap: "",
    Nhanvien: "",
    Hangs: [],
    Ghichu: "",
  }
  modalHeader: string;
  sophieunhap: string;

  constructor(private activatedRoute: ActivatedRoute, private service: PhieuNhapService,
              private serviceNV: NhanVienService, private serviceKH: KhachHangService,
              private serviceBan: BanService, private activeModal: NgbActiveModal) {}

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
        this.service.getPhieuNhap(this.sophieunhap).then(res => {
          let date = new Date(res.phieunhap.Ngaynhap);
          this.phieunhap.Sophieunhap = res.phieunhap._id;
          this.phieunhap.Ngaynhap = date.getDate() + '/' + (+date.getMonth() + 1) + '/' + date.getFullYear();
          this.serviceNV.getNhanVien(res.phieunhap.MaNV).then(res => {
            this.phieunhap.Nhanvien = res.TenNV;
          });
          this.phieunhap.Hangs = res.phieuNhapCtiets;
          this.phieunhap.Ghichu = res.phieunhap.Ghichu;
        });
      });
  }

  closeModal() {
    this.activeModal.close();
  }
}
