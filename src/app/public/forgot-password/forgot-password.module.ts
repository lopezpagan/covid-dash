import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        ForgotPasswordRoutingModule],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule {}
