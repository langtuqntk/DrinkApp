import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhieuXuatService } from '../../@core/data/phieuxuat.service';
import { PhieuXuat, PhieuXuatCtiet } from '../../@core/data/phieuxuat';
import $ from 'jquery';
import uuidv1 from  'uuid/v1';

@Component({
  selector: 'ngx-form-layouts',
  providers: [PhieuXuatService],
  styleUrls: ['./banhang.component.scss'],
  templateUrl: './banhang.component.html',
})
export class BanHangComponent {
  constructor(private router: Router, private modalService: NgbModal, private service: PhieuXuatService) { }

  hangs = [];
  hangSelected = [];
  isReady = false;

  Sophieuxuat: number = Math.floor((Math.random() * 10000) + 1);
  Ngayxuat: {day:null,month:null,year:null};
  MaNV: string;
  LoaiKH: string;
  Maban: string;
  TienTra: number = 0;
  TienDu: number = 0;
  Thanhtoan: number = 0;

  xuatPhieu() {
    let data = new PhieuXuat();
    data.Sophieuxuat = this.Sophieuxuat;
    data.Ngayxuat = new Date(this.Ngayxuat.month + '/' + this.Ngayxuat.day + '/' + this.Ngayxuat.year);
    data.MaNV = this.MaNV;
    data.LoaiKH = this.LoaiKH;
    data.Maban = this.Maban;
    data.TienTra = this.TienTra;
    data.TienDu = this.TienDu;
    data.Thanhtoan = this.Thanhtoan;

    this.service.create(data).then(phieuxuat => {
      let listDataCtiet : PhieuXuatCtiet[] = []; 
      for(let i in this.hangs){
        let dataCtiet : PhieuXuatCtiet  = new PhieuXuatCtiet();
        dataCtiet.Sophieuxuat = phieuxuat.Sophieuxuat;
        dataCtiet.Mahang = this.hangs[i].hang.split('-')[0];
        dataCtiet.Dongia = this.hangs[i].hang.split('-')[1];
        dataCtiet.Soluong = this.hangs[i].soluong;
        dataCtiet.Tralai = false;
        listDataCtiet.push(dataCtiet);
      }

      let dataReq = {hangs: listDataCtiet};
      
      this.service.createCtiet(dataReq).then(phieuxuatCtiet => {
        this.router.navigateByUrl('/app/pages/hoadon');
      })
    }).catch(error => console.log(error.json().message));
    
  }

  chonHang(e) {
    if(e.target.value !== "*"){
      let hangText = e.target.options[e.target.selectedIndex].text;
      let hangValue = e.target.value;
      let soluong = +prompt("Nhập số lượng:","1");
      if(soluong !== 0){
        this.Thanhtoan += +hangValue.split('-')[1] * soluong;
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
      else{
        setTimeout(() => e.target.value = "*", 1000);
      } 
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
      this.Thanhtoan -= +this.hangs[i].hang.split('-')[1] * this.hangs[i].soluong;
    }    
  }

  nhapTien(){
    if(this.TienTra < this.Thanhtoan){
      alert('Tiền khách trả chưa đủ.')
    }
    else{
      this.TienDu = this.TienTra - this.Thanhtoan;
      this.isReady = true;
    }
  }
}
