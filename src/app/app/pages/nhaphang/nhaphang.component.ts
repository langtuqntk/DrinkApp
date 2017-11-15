import { Component } from '@angular/core';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./nhaphang.component.scss'],
  templateUrl: './nhaphang.component.html',
})
export class NhapHangComponent {
  hangs = [];

  ngOnInit(){
    // this.serviceNV.getNhanViens().then(res => this.nhanviens = res);
    // this.MaNV = "*";
    // this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
    // this.LoaiKH = "*";
    // this.serviceBan.getBans().then(res => this.bans = res);
    // this.Maban = "*";
    //let currentDate = new Date();
    //this.Ngayxuat.day = '1';
  }

  nhapHang(): void {
    let hang = prompt("Nhập hàng:");
    let dongia = prompt("Nhập giá bán:", "0")
    let soluong = prompt("Nhập số lượng:", "1");
    if(hang !== null){
      this.hangs.push(hang + ` - ${dongia} VNĐ` + ` - ${soluong} cái`);
    }
  }
}
