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
  Giahang: number;

  constructor(private serviceKH: KhachHangService, private serviceHang: HangService) { }

  ngOnInit(){
    this.serviceHang.getHangs().then(res => this.hangs = res);
    this.Mahang = "*";
    this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
    this.LoaiKH = "*";
  }

  hangChange(mahang){
    this.Mahang = mahang;
    if(this.LoaiKH !== "*" && this.Mahang !== "*"){
      this.serviceHang.getGiaHang(this.Mahang, this.LoaiKH);
    }
  }

  khachChange(loaikh){
    this.LoaiKH = loaikh;
    if(this.Mahang !== "*" && this.LoaiKH !== "*"){
      this.Giahang = 5000;
    }
  }
}
