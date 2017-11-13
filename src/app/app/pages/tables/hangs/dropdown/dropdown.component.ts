
import { Component, ViewChild, ElementRef } from '@angular/core';

import { DefaultEditor } from 'ng2-smart-table';
@Component({
    selector: 'ngx-smart-table',
    template: `
    <select
    #name
    class="form-control"
    [name]="cell.getId()"
    (change)="updateValue()">
        <option selected value="*">Chọn loại khách</option>
        <option value="VIP">VIP</option>
    </select>
    `
})

export class DropdownComponent extends DefaultEditor {  
    

    @ViewChild('name') name: ElementRef;
  
    constructor() {
      super();
    }
  
  
    updateValue() {
      const name = this.name.nativeElement.value;
      this.cell.newValue = `${name}`;
    }
}