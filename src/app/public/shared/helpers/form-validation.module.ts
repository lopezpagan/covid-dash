import { MustMatchDirective } from './must-match.validator.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [MustMatchDirective],
    exports: [MustMatchDirective]
})

export class FormValidationModule { }
