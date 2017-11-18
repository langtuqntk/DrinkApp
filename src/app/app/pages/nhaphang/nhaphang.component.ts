import { Component } from '@angular/core';
import $ from 'jquery';
import { NhanVienService } from '../../@core/data/nhanvien.service';
import { HangService } from '../../@core/data/hang.service';
import { PhieuNhapService } from '../../@core/data/phieunhap.service';
import { PhieuNhap, PhieuNhapCtiet } from '../../@core/data/phieu';

@Component({
  selector: 'ngx-form-layouts',
  providers: [PhieuNhapService, NhanVienService, HangService],
  styleUrls: ['./nhaphang.component.scss'],
  templateUrl: './nhaphang.component.html',
})
export class NhapHangComponent {
  hangs = [];
  hangSelected = [];

  listHangs = []; 
  listNhanViens = [];

  Mahang: string;
  MaNV: string;
  Sophieunhap: number = Math.floor((Math.random() * 100000) + 1);
  Ngaynhap: {day: "", month: "", year: ""};
  Ghichu: string;
  isReady = false;

  constructor(private service: PhieuNhapService, private serviceNV: NhanVienService, private serviceHang: HangService){

  }

  ngOnInit(){
    this.serviceNV.getNhanViens().then(res => this.listNhanViens = res);
    this.MaNV = "*";
    this.serviceHang.getHangs().then(res => {
      for(let i in res){
        this.serviceHang.getGiaHang(res[i]._id,"*").then(giahang => res[i].Giahang = giahang.Giaban);
      }
      this.listHangs = res;
    });
    this.Mahang = "*";
    //let currentDate = new Date();
    //this.Ngayxuat.day = '1';
  }

  nhapPhieu() {
    console.log(this.hangs);
    let data = new PhieuNhap();
    data.Sophieunhap = this.Sophieunhap;
    data.Ngaynhap = new Date(this.Ngaynhap.month + '/' + this.Ngaynhap.day + '/' + this.Ngaynhap.year);
    data.MaNV = this.MaNV;
    data.Ghichu = this.Ghichu;

    this.service.create(data).then(phieuNhap => {
      let listDataCtiet : PhieuNhapCtiet[] = []; 
      for(let i in this.hangs){
        let dataCtiet : PhieuNhapCtiet  = new PhieuNhapCtiet();
        dataCtiet.Sophieunhap = phieuNhap._id;
        dataCtiet.Mahang = this.hangs[i].hang.split('-')[0];
        dataCtiet.Gianhap = +this.hangs[i].hang.split('-')[1];
        dataCtiet.Soluong = this.hangs[i].soluong;
        listDataCtiet.push(dataCtiet);
      }

      let dataReq = {hangs: listDataCtiet};
      
      this.service.createCtiet(dataReq).then(phieunhapCtiet => {
        alert('Nhập thành công!');
      })
    }).catch(error => console.log(error.json().message));
    
  }

  chonHang(e) {
    if(e.target.value !== "*"){
      let hangText = e.target.options[e.target.selectedIndex].text;
      let hangValue = e.target.value;
      let soluong = +prompt("Nhập số lượng:","1");
      if(soluong !== 0){
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
    }    
  }
}
