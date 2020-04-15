import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import {
    NotificationComponent,
} from './components';
import { StatModule } from '../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        AccountRoutingModule,
        StatModule,
        Ng2Charts,
    ],
    declarations: [
        AccountComponent,
        NotificationComponent,
    ]
})
export class AccountModule {}
