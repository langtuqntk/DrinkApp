import { Component } from '@angular/core';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./nhaphang.component.scss'],
  templateUrl: './nhaphang.component.html',
})
export class NhapHangComponent {
  hangs = [];

  nhapHang(): void {
    let hang = prompt("Nhập hàng:");
    let soluong = prompt("Nhập số lượng:", "1");
    if(hang !== null){
      this.hangs.push(hang + `(${soluong})`);
    }
  }
}
