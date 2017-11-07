import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./banhang.component.scss'],
  templateUrl: './banhang.component.html',
})
export class BanHangComponent {
  constructor(private router: Router, private modalService: NgbModal) { }

  hangs = [];

  xuatPhieu() {
    this.router.navigateByUrl('/app/pages/hoadon');
  }

  chonHang(hang) {
    let soluong = prompt("Nhập số lượng:", "1");
    this.hangs.push(hang + `(${soluong})`);
  }
}
