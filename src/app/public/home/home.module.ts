import { HeaderComponent } from './../components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './../components/sidebar/sidebar.component';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { 
    LoaderService, 
    DashStateDailySearchService, 
    DashStateDailyService, 
    DashStateTodayService, 
    DashStateCurrentService, 
    DashStateInfoService, 
} from './../shared/services';
import { LoaderModule, PieChartModule, BarChartModule, LineChartModule } from './../shared/modules';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NgbCarouselModule,
        NgbAlertModule,
        TranslateModule,
        LoaderModule,
        PieChartModule,
        BarChartModule,
        LineChartModule,
    ],
    declarations: [
        HomeComponent,
        SidebarComponent,
        HeaderComponent,
    ],
    providers: [
        LoaderService, 
        DashStateDailySearchService, 
        DashStateDailyService, 
        DashStateTodayService, 
        DashStateCurrentService, 
        DashStateInfoService, 
        DatePipe,
    ]
})
export class HomeModule {}
