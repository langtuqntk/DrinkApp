import { Component, OnInit } from '@angular/core';
import { KhachHangService } from '../../@core/data/khachhang.service';
import { HangService } from '../../@core/data/hang.service';

@Component({
  selector: 'ngx-form-layouts',
  providers: [KhachHangService, HangService],
  styleUrls: ['./capnhatgia.component.scss'],
  templateUrl: './capnhatgia.component.html',
})
export class CapNhatGiaComponent {

  hangs = [];
  khachhangs = [];
  isReady = false;

  Mahang: string;
  LoaiKH: string;

  constructor(private serviceKH: KhachHangService, private serviceHang: HangService) { }

  ngOnInit(){
    this.serviceHang.getHangs().then(res => this.hangs = res);
    this.Mahang = "*";
    this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
    this.LoaiKH = "*";
  }
}
