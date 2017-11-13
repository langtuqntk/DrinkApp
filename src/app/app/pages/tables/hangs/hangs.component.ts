import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import $ from 'jquery';

import { HangService } from '../../../@core/data/hang.service';
import { Hang } from '../../../@core/data/hang';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './hangs.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class HangsComponent {

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
      Mahang: {
        title: 'Mã hàng',
        type: 'string',
      },
      Tenhang: {
        title: 'Tên hàng',
        type: 'string',
      },
      LoaiKH: {
        title: 'Khách hàng',
        type: 'html',
        editor: {
          type: 'custom',
          component: DropdownComponent,
        },
      },
      Giahang: {
        title: 'Giá hàng',
        type: 'number',
      },
      Ghichu: {
        title: 'Ghi chú',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: HangService) {
    this.service.getHangs().then(hangs => this.source.load(hangs) );
    
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
    let data: Hang = new Hang();
    data.Ghichu = event.newData.Ghichu;
    data.Giahang = event.newData.Giahang;
    data.LoaiKH = $('#LoaiKH').val();
    data.Mahang = event.newData.Mahang;
    data.Tenhang = event.newData.Tenhang;
    this.service.create(data).then(hang => { 
      event.confirm.resolve();
    }).catch(error => console.log(error.json().message));
  }

  onUpdate(event): void{
    event.confirm.resolve();
    console.log(event);
    this.service.update(event.newData).then(hang => console.log(hang));
  }
}

