import { Component, ViewChild, ElementRef } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import { KhachHangService } from '../../../../@core/data/khachhang.service';
import $ from 'jquery';

@Component({
    selector: 'ngx-smart-table',
    providers: [KhachHangService],
    template: `
    <select
    #name
    class="form-control"
    [name]="cell.getId()"
    (change)="updateValue()">
        <option selected value="*">Chọn</option>
        <option *ngFor="let item of khachhangs" value="{{item._id}}">{{item.TenKH}} - {{item.LoaiKH}}</option>
    </select>
    <input type="hidden" [(ngModel)]="LoaiKH" id="LoaiKH">
    `
})

export class DropdownComponent extends DefaultEditor {  
    
    khachhangs = [];
    LoaiKH: string;

    @ViewChild('name') name: ElementRef;
  
    constructor(private serviceKH: KhachHangService) { 
        super()
    }

    ngOnInit(){
    this.serviceKH.getKhachHangs().then(res => this.khachhangs = res);
  }
  
  
    updateValue() {
      const khachhangVal = $(this.name.nativeElement).val();
      const khachhangText = this.name.nativeElement.options[this.name.nativeElement.selectedIndex].text;
      this.cell.newValue = `${khachhangText}`;
      this.LoaiKH = khachhangVal;
    }
}