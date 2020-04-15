import { Directive, Input, SimpleChanges } from '@angular/core';
import {Validator, AbstractControl} from '@angular/forms';
import {NG_VALIDATORS} from '@angular/forms';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[requiredIf]',
   providers: [
        {provide: NG_VALIDATORS, useExisting: RequiredIfDirective, multi: true}
    ]
})
export class RequiredIfDirective implements Validator {

  constructor() { }

  // tslint:disable-next-line:no-input-rename
  @Input('requiredIf')
    requiredIf: boolean;
      // tslint:disable-next-line:variable-name
      private _onChange: () => void;

    validate(c: AbstractControl) {
  
        const value = c.value;
        // tslint:disable-next-line:triple-equals
        if ((value == null || value === undefined || value == '') && this.requiredIf) {
                return {
                    requiredIf: {condition: this.requiredIf}
                };
        }
        return null;
    }


    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
    
    // tslint:disable-next-line:use-lifecycle-interface
    ngOnChanges(changes: SimpleChanges): void {
    
        if ('requiredIf' in changes) {
            
            if (this._onChange) { this._onChange(); }
        }
    }
}
