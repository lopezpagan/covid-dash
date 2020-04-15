import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

import { PieChartComponent } from './pie-chart.component';

@NgModule({
    imports: [CommonModule, Ng2Charts],
    declarations: [PieChartComponent],
    exports: [Ng2Charts, PieChartComponent]
})
export class PieChartModule {}
