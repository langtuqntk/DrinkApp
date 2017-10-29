import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { BanService } from '../../../@core/data/ban.service';
import { Ban } from '../../../@core/data/ban'
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './bans.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class BansComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      objectId: {
        title: 'ID',
        type: 'string',
      },
      Maban: {
        title: 'Mã bàn',
        type: 'string',
      },
      Tenban: {
        title: 'Tên bàn',
        type: 'string',
      },
      Khuvuc: {
        title: 'Khu vực',
        type: 'string',
      },
    },
  };

  bans: Ban[];
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: BanService) {
    this.service.getBans().then(bans => this.source.load(this.bans));
    console.log('data:',this.bans);
    this.source.load(this.bans);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
