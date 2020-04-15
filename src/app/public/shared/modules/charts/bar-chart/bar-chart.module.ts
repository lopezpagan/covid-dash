import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
    imports: [CommonModule, Ng2Charts],
    declarations: [BarChartComponent],
    exports: [Ng2Charts, BarChartComponent]
})
export class BarChartModule {}
