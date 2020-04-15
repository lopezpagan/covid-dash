import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends DataService {

  constructor(http: HttpClient) {
    super('/auth/login_check', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends DataService {

  constructor(http: HttpClient) {
    super('/auth/register', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService extends DataService {

  constructor(http: HttpClient) {
    super('/auth/forgotpassword', http);
  }

}

@Injectable({
  providedIn: 'root'
})
export class PhoneValidateService extends DataService {

  constructor(http: HttpClient) {
    super('/auth/phone/validate', http);
  }

}

