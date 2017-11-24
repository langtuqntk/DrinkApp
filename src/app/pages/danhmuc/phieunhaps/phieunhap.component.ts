import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import $ from 'jquery';

import { PhieuNhapService, NhanVienService } from '../../../@core';
import { Hang } from '../../../@core/models';
import { PhieuNhapCtietComponent } from './phieunhapctiet/phieunhapctiet.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './phieunhap.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class PhieuNhapComponent {

  settings = {
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: "ID",
        type: 'string',
      },
      NgaynhapFormat: {
        title: "Ngày nhập",
        type: 'string',
      },
      Nhanvien: {
        title: "Nhân viên",
        type: 'string',
      },
      Ghichu: {
        title: "Ghi chú",
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: PhieuNhapService, private serviceNV: NhanVienService,
              private modalService: NgbModal) {
    this.service.getPhieuNhaps().then(phieunhaps => {
      for(let i in phieunhaps){
        let date = new Date(phieunhaps[i].Ngaynhap);
        phieunhaps[i].NgaynhapFormat = date.getDate() + '/' + (+date.getMonth() + 1) + '/' + date.getFullYear();
        this.serviceNV.getNhanVien(phieunhaps[i].MaNV).then(res => {
          phieunhaps[i].Nhanvien = res.TenNV;
        });
      }
      this.source.load(phieunhaps);
    });
    
  }

  ngOnInit(){}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      console.log(event);
      this.service.delete(event.data._id)
    } else {
      event.confirm.reject();
    }
  }

  onDetail(event) {
    const activeModal = this.modalService.open(PhieuNhapCtietComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'PHIẾU NHÂP CHI TIẾT';
    activeModal.componentInstance.sophieunhap = event.data._id;
  }
}

