import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { KhachHangService } from '../../../@core';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './khachhangs.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class KhachHangsComponent {

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
      LoaiKH: {
        title: 'Loại khách hàng',
        type: 'string',
      },
      TenKH: {
        title: 'Tên khách hàng',
        type: 'string',
      },
      Ghichu: {
        title: 'Ghi chú',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: KhachHangService) {
    this.service.getKhachHangs().then(khachhangs => this.source.load(khachhangs) );
    
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
    this.service.create(event.newData).then(khachhang => { console.log(khachhang); 
      event.confirm.resolve();
    }).catch(error => console.log(error.json().message));
  }

  onUpdate(event): void{
    event.confirm.resolve();
    console.log(event);
    this.service.update(event.newData).then(khachhang => console.log(khachhang));
  }
}
