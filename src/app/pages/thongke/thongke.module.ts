import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

import { ThemeModule } from '../../@theme/theme.module';

import { ThongKeRoutingModule, routedComponents } from './thongke-routing.module';
import { EchartsLineComponent } from './echarts/echarts-line.component';
import { EchartsPieComponent } from './echarts/echarts-pie.component';
import { EchartsBarComponent } from './echarts/echarts-bar.component';
import { EchartsMultipleXaxisComponent } from './echarts/echarts-multiple-xaxis.component';
import { EchartsAreaStackComponent } from './echarts/echarts-area-stack.component';
import { EchartsBarAnimationComponent } from './echarts/echarts-bar-animation.component';
import { EchartsRadarComponent } from './echarts/echarts-radar.component';
import { TKBanHangComponent } from './thongkebanhang/thongkebanhang.component';
import { TKHangTrongKhoComponent } from './thongkehangtrongkho/thongkehangtrongkho.component';


const components = [
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
  TKBanHangComponent,
  TKHangTrongKhoComponent,
];

@NgModule({
  imports: [ThemeModule, ThongKeRoutingModule, AngularEchartsModule, NgxChartsModule, ChartModule],
  declarations: [...routedComponents, ...components],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ThongKeModule {}
