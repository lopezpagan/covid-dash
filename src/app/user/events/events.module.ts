import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { TimelineComponent, NotificationComponent, ChatComponent } from '../account/components';

@NgModule({
    imports: [
        CommonModule,
        EventsRoutingModule,
        NgbCarouselModule,
        NgbAlertModule,
    ],
    declarations: [
        EventsComponent,
    ]
})
export class EventsModule {}
