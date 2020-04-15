import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ErrorDialogService } from './../../../common/error-dialog/error-dialog.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoaderService } from '../loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentUrl: string;

  constructor(
    private auth: AuthService,
    private loaderService: LoaderService,
    private errorDialogService: ErrorDialogService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  this.showLoader();

  this.currentUrl = request.url;

  if (request.url.indexOf('/auth/login_check') > 0) {
      request = request.clone({
        setHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.handleEvents(event);
            }
          },
          error => this.handleErrorEvents(error))
      );
  }

  if (request.method.toUpperCase() === 'GET') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        },
        method: 'GET',
        setParams: {},
        body: '',
        responseType: 'json'
      });

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.handleEvents(event);
            }
          },
          error => this.handleErrorEvents(error))
      );
  }


  if (request.method.toUpperCase() === 'POST') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.handleEvents(event);
            }
          },
          error => this.handleErrorEvents(error))
      );
  }

  if (request.method.toUpperCase() === 'PUT') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.handleEvents(event);
            }
          },
          error => this.handleErrorEvents(error))
      );
  }


  if (request.method.toUpperCase() === 'DELETE') {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        },
        method: 'DELETE',
        setParams: {},
        body: '',
        responseType: 'json'
      });

      return next.handle(request).pipe(
        tap(
          event => {
            if (event instanceof HttpResponse) {
              this.handleEvents(event);
            }
          },
          error => this.handleErrorEvents(error))
      );
  }

  }

  private handleEvents(event) {
    this.onEnd();

    if (event === HttpEventType.UploadProgress) {
      console.log('Upload Progress: ', Math.round(event.loaded / event.uploaded * 100) + '%');
    } else if (event === HttpEventType.Response) {
      // console.log(event);
    }

    return true;
  }

  private handleErrorEvents(error: HttpErrorResponse) {
    const e = error ? error.message || error.error.message : 'Unknown Error';
    const s = error.status; 
    
    const data = {
        reason: e,
        status: s
    };

    this.setError(data);

    return throwError(error);
  }

  setError(error: any) {
    let message = '';

    if (error.status === 400) {
      message = 'Bad input ';
    } else if (error.status === 401) {
      message = 'You are not authenticated';
    } else if (error.status === 403) {
      message = 'End-point not authorized';
    } else if (error.status === 404) {
      message = 'End-point not found';
      return false;

    } else if (error.status === 405) {
      message = 'You have no access to this api';
    } else {
      message = 'Unknown error';
    }
  
    if (error.status === 500) {
    }

    if ( error.status === 401 && this.currentUrl.indexOf('/login_check') > -1 ) {
      message = 'Username and password combination are incorrect.';
    }

    const data = {
      reason: message,
      status: error.status
    };

    this.errorDialogService.open(data);
  } 

  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }
}
