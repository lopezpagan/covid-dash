import { AppError } from './app-error';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';


export class BadCredentials extends AppError {
    handleError(error: Error | HttpErrorResponse) {
        console.log('BadCredentials', error);
        // alert('An unexpected error occurred.');
        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
              // Handle offline error
              console.warn(error);
            } else {
              // Handle Http Error (error.status === 403, 404...)
              console.warn(error);
            }
         } else {
           // Handle Client Error (Angular Error, ReferenceError...)
           console.warn(error);
         }
        // Log the error anyway
        console.error('It happens: ', error);
    }
}
