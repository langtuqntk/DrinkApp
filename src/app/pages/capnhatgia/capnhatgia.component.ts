import { Component, OnInit } from '@angular/core';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { KhachHangService, HangService } from '../../@core';
import { Hang } from '../../@core/models';


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

  config: ToasterConfig;

  position: string = 'toast-top-right';
  animationType: string = 'fade';
  title: string = 'Thông báo!';
  content: string = `Cập nhật thành công.`;
  timeout: number = 5000;
  toastsLimit: number = 5;
  type: string = 'info';


  constructor(private serviceKH: KhachHangService, private serviceHang: HangService
            ,private toasterService: ToasterService) { }

  ngOnInit(){
    this.serviceHang.getHangs().then(res => this.hangs = res);
    this.Mahang = "*";
    this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
    this.LoaiKH = "*";
    this.Giahang = 0;
  }

  hangChange(mahang){
    this.Mahang = mahang;
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

  khachChange(loaikh){
    this.LoaiKH = loaikh;
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

  capNhatGia(){
    let giahang: Hang = new Hang();
    giahang._id = this.GiaHangID;
    giahang.Mahang = this.Mahang;
    giahang.LoaiKH = this.LoaiKH;
    giahang.Giaban = this.Giahang;
    this.serviceHang.updateGiaHang(giahang).then(res => this.showToast(this.type,this.title,this.content))
    .catch(error => console.log(error.json().message));
  }


  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: false,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }
}
