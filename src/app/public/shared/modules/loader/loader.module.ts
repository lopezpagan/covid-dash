import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './loader.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [LoaderComponent],
    exports: [LoaderComponent]
})
export class LoaderModule {}
