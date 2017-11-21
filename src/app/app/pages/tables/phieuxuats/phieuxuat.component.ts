import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import $ from 'jquery';

import { PhieuXuatService } from '../../../@core/data/phieuxuat.service';
import { NhanVienService } from '../../../@core/data/nhanvien.service';
import { KhachHangService } from '../../../@core/data/khachhang.service';
import { BanService } from '../../../@core/data/ban.service';
import { Hang } from '../../../@core/data/hang';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './phieuxuat.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PhieuXuatComponent {

  settings = {
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: "ID",
        type: 'string',
      },
      NgayxuatFormat: {
        title: 'Ngày xuất',
        type: 'string',
      },
      Nhanvien: {
        title: 'Nhân viên',
        type: 'string',
      },
      Khachhang: {
        title: 'Khách',
        type: 'string',
      },
      Ban: {
        title: 'Bàn',
        type: 'string',
      },
      TienTra: {
        title: 'Tiền trả',
        type: 'string',
      },
      TienDu: {
        title: 'Tiền dư',
        type: 'string',
      },
      Thanhtoan: {
        title: 'Thanh toán',
        type: 'string',
      },
      Ghichu: {
        title: 'Ghi chú',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: PhieuXuatService, private router: Router,
              private serviceNV: NhanVienService, private serviceKH: KhachHangService,
              private serviceBan: BanService) {
    this.service.getPhieuXuats().then(phieuxuats => {
      for(let i in phieuxuats){
        let date = new Date(phieuxuats[i].Ngayxuat);
        phieuxuats[i].NgayxuatFormat = date.getDate() + '/' + (+date.getMonth() + 1) + '/' + date.getFullYear();
        this.serviceNV.getNhanVien(phieuxuats[i].MaNV).then(res => {
          phieuxuats[i].Nhanvien = res.TenNV;
        });
        this.serviceKH.getKhachHang(phieuxuats[i].LoaiKH).then(res => {
          phieuxuats[i].Khachhang = res.TenKH;
        });
        this.serviceBan.getBan(phieuxuats[i].Maban).then(res => {
          phieuxuats[i].Ban = res.Tenban;
        });
      }
      this.source.load(phieuxuats);
    } );
    
  }

  ngOnInit(){}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      console.log(event);
      this.service.delete(event.data._id)
    } else {
      event.confirm.reject();
    }
  }

  onDetail(event): void {
    this.router.navigateByUrl('/app/pages/hoadon/' + event.data._id);
  }
}

