import { OnInit, Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { PhieuXuatService, NhanVienService, KhachHangService, BanService } from '../../../@core';

@Component({
  selector: 'ngx-form-layouts',
  providers: [PhieuXuatService, NhanVienService, KhachHangService, BanService],
  styleUrls: ['./hoadon.component.scss'],
  templateUrl: './hoadon.component.html',
})
export class HoaDonComponent {

  phieuxuat = {
    Sophieuxuat: "",
    Ngayxuat: "",
    Nhanvien: "",
    Khachhang: "",
    Ban: "",
    Hangs: [],
    Tientra: 0,
    Tiendu: 0,
    Thanhtoan: 0
  }

  constructor(private activatedRoute: ActivatedRoute, private service: PhieuXuatService,
              private serviceNV: NhanVienService, private serviceKH: KhachHangService,
              private serviceBan: BanService, private router: Router) {}

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
        let sophieuxuat = params['sophieuxuat'];
        this.service.getPhieuXuat(sophieuxuat).then(res => {
          let date = new Date(res.phieuxuat.Ngayxuat);
          this.phieuxuat.Sophieuxuat = res.phieuxuat._id;
          this.phieuxuat.Ngayxuat = date.getDate() + '/' + (+date.getMonth() + 1) + '/' + date.getFullYear();
          this.serviceNV.getNhanVien(res.phieuxuat.MaNV).then(res => {
            this.phieuxuat.Nhanvien = res.TenNV;
          });
          this.serviceKH.getKhachHang(res.phieuxuat.LoaiKH).then(res => {
            this.phieuxuat.Khachhang = res.TenKH;
          });
          this.serviceBan.getBan(res.phieuxuat.Maban).then(res => {
            this.phieuxuat.Ban = res.Tenban;
          });
          this.phieuxuat.Hangs = res.phieuXuatCtiets;
          this.phieuxuat.Tientra = res.phieuxuat.TienTra;
          this.phieuxuat.Tiendu = res.phieuxuat.TienDu;
          this.phieuxuat.Thanhtoan = res.phieuxuat.Thanhtoan;
        });
      });
  }

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height='+screen.height+',width='+screen.width+'');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  quayLai(): void {
    this.router.navigateByUrl('/app/pages/tables/phieuxuats');
  }
}
