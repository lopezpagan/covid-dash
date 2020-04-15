import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    NotificationComponent,
} from './components';
import { StatModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        StatModule,
        Ng2Charts,
    ],
    declarations: [
        DashboardComponent,
        NotificationComponent,
    ]
})
export class DashboardModule {}
