import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { NhanVienService } from '../../../@core';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './nhanviens.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class NhanViensComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'string',
      },
      MaNV: {
        title: 'Mã nhân viên',
        type: 'string',
      },
      TenNV: {
        title: 'Tên nhân viên',
        type: 'string',
      },
      Ngaysinh: {
        title: 'Ngày sinh',
        type: 'string',
      },
      Diachi: {
        title: 'Địa chỉ',
        type: 'string',
      },
      Dienthoai: {
        title: 'Điện thoại',
        type: 'string',
      },
      Matkhau: {
        title: 'Mật khẩu',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: NhanVienService) {
    this.service.getNhanViens().then(nhanviens => this.source.load(nhanviens) );
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      console.log(event);
      this.service.delete(event.data._id)
    } else {
      event.confirm.reject();
    }
  }
  onCreate(event): void{
    console.log(event);
    this.service.create(event.newData).then(nhanvien => { console.log(nhanvien); 
      event.confirm.resolve();
    }).catch(error => console.log(error.json().message));
  }

  onUpdate(event): void{
    event.confirm.resolve();
    console.log(event);
    this.service.update(event.newData).then(nhanvien => console.log(nhanvien));
  }
}
