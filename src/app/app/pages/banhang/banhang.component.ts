import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./banhang.component.scss'],
  templateUrl: './banhang.component.html',
})
export class BanHangComponent {
  constructor(private router: Router, private modalService: NgbModal) { }

  hangs = [];
  hangSelected = [];

  xuatPhieu() {
    this.router.navigateByUrl('/app/pages/hoadon');
  }

  chonHang(e) {
    if(e.target.value !== "*"){
      let hangText = e.target.options[e.target.selectedIndex].text;
      let hangValue = e.target.value;
      let soluong = +prompt("Nhập số lượng:", "1");
      
      let index = this.hangSelected.indexOf(hangValue);
      if(index > -1){
        soluong = this.hangs[index].soluong + soluong;
        this.hangs[index] = {hang: hangValue, soluong: soluong, text: hangText + ` - ${soluong} cái`};
      }
      else{
        this.hangs.push({hang: hangValue, soluong: soluong, text: hangText + ` - ${soluong} cái`});
        this.hangSelected.push(hangValue);
      }
      
      setTimeout(() => e.target.value = "*", 1000);
      
    }
  }

  xoaHang(e){
    console.log($(e.target).val());
    let listSelected = $.map($(e.target).val(), (item) => {
      let arr = item.split('-');
      return arr[0]+ '-' + arr[1];
    });
    
    let arrIndex = $.map(listSelected, (index, item) => {
      return this.hangSelected.indexOf(item);
    });

    for (var i = arrIndex.length -1; i >= 0; i--){
      this.hangSelected.splice(arrIndex[i], 1);
      this.hangs.splice(arrIndex[i], 1);
    }    
  }
}
