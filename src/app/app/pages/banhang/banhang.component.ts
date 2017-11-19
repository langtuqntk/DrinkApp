import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhieuXuatService } from '../../@core/data/phieuxuat.service';
import { NhanVienService } from '../../@core/data/nhanvien.service';
import { KhachHangService } from '../../@core/data/khachhang.service';
import { BanService } from '../../@core/data/ban.service';
import { HangService } from '../../@core/data/hang.service';
import { PhieuXuat, PhieuXuatCtiet } from '../../@core/data/phieu';
import $ from 'jquery';
import uuidv1 from  'uuid/v1';

@Component({
  selector: 'ngx-form-layouts',
  providers: [PhieuXuatService, NhanVienService, KhachHangService, BanService, HangService],
  styleUrls: ['./banhang.component.scss'],
  templateUrl: './banhang.component.html',
})
export class BanHangComponent {

  hangs = [];
  hangSelected = [];
  isReady = false;

  listHangs = [];
  nhanviens = [];
  khachhangs = [];
  bans = [];

  Sophieuxuat: number = Math.floor((Math.random() * 100000) + 1);
  Ngayxuat: {day:"",month:"",year:""};
  MaNV: string;
  Mahang: string;
  LoaiKH: string;
  Maban: string;
  TienTra: number = 0;
  TienDu: number = 0;
  Thanhtoan: number = 0;

  constructor(private router: Router, private modalService: NgbModal, private service: PhieuXuatService,
              private serviceNV: NhanVienService, private serviceKH: KhachHangService,
              private serviceBan: BanService, private serviceHang: HangService) { }

  ngOnInit(){
    this.serviceNV.getNhanViens().then(res => this.nhanviens = res);
    this.MaNV = "*";
    this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
    this.LoaiKH = "*";
    this.serviceBan.getBans().then(res => this.bans = res);
    this.Maban = "*";
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
        dataCtiet.Sophieuxuat = phieuxuat._id;
        dataCtiet.Mahang = this.hangs[i].hang.split('-')[0];
        dataCtiet.Dongia = this.hangs[i].hang.split('-')[1];
        dataCtiet.Soluong = this.hangs[i].soluong;
        dataCtiet.Tralai = false;
        listDataCtiet.push(dataCtiet);
      }

      let dataReq = {hangs: listDataCtiet};
      
      this.service.createCtiet(dataReq).then(phieuxuatCtiet => {
        this.router.navigateByUrl('/app/pages/hoadon/' + phieuxuat._id);
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
