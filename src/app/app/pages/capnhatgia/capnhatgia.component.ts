import { Component, OnInit } from '@angular/core';
import { KhachHangService } from '../../@core/data/khachhang.service';
import { HangService } from '../../@core/data/hang.service';
import { Hang } from '../../@core/data/hang';


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

  GiaHangID: string;
  Mahang: string;
  LoaiKH: string;
  Giahang: number;

  constructor(private serviceKH: KhachHangService, private serviceHang: HangService) { }

  ngOnInit(){
    this.serviceHang.getHangs().then(res => this.hangs = res);
    this.Mahang = "*";
    this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
    this.LoaiKH = "*";
    this.Giahang = 0;
  }

  hangChange(mahang){
    this.Mahang = mahang;
    if(this.LoaiKH !== "*" && this.Mahang !== "*"){
      this.serviceHang.getGiaHang(this.Mahang, this.LoaiKH).then(giahang => {
        this.Giahang = giahang.Giaban;
        this.GiaHangID = giahang._id;
        this.isReady = true;
      });
    }
    else{
      this.Giahang = 0;
      this.GiaHangID = "";
      this.isReady = false;
    }
  }

  khachChange(loaikh){
    this.LoaiKH = loaikh;
    if(this.Mahang !== "*" && this.LoaiKH !== "*"){
       this.serviceHang.getGiaHang(this.Mahang, this.LoaiKH).then(giahang => {
        this.Giahang = giahang.Giaban;
        this.GiaHangID = giahang._id;
        this.isReady = true;
      });
    }
    else{
      this.Giahang = 0;
      this.GiaHangID = "";
      this.isReady = false;
    }
  }

  capNhatGia(){
    let giahang: Hang = new Hang();
    giahang._id = this.GiaHangID;
    giahang.Mahang = this.Mahang;
    giahang.LoaiKH = this.LoaiKH;
    giahang.Giaban = this.Giahang;
    this.serviceHang.updateGiaHang(giahang).then(res => console.log(res))
    .catch(error => console.log(error.json().message));
  }
}
