import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { AdminLoginComponent } from './admin-login.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        AdminLoginRoutingModule],
    declarations: [AdminLoginComponent]
})
export class AdminLoginModule {}
