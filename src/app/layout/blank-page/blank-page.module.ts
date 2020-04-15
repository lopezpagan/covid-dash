import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { TimelineComponent, NotificationComponent, ChatComponent } from '../dashboard/components';

@NgModule({
    imports: [
        CommonModule,
        BlankPageRoutingModule,
        NgbCarouselModule,
        NgbAlertModule,
    ],
    declarations: [
        BlankPageComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent
    ]
})
export class BlankPageModule {}
