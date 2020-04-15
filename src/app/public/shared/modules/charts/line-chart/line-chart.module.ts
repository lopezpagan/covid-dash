import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { LineChartComponent } from './line-chart.component';

@NgModule({
    imports: [CommonModule, Ng2Charts],
    declarations: [LineChartComponent],
    exports: [Ng2Charts, LineChartComponent]
})
export class LineChartModule {}
