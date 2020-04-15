import { LoginService } from './../login.service';
import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  storageSource = 'claimeye-providers';
  /**
   * Provider: HttpClient
   * Description: Use the HttpClient to allow Interceptors.
   */

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}

  cachedRequests: Array<HttpRequest<any>> = [];
  collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  /**
   * Method: getToken
   * Description: Get the token key value from the local storage.
   */
  getToken(): string {
    const user = {token: 'XYZ'};

    if (!user) {
      return '';
    }
    return user.token;
  }

  getUserInfo() {
    return { role: { name: 'admin' } };
  }

  isLoggedIn() {
    const token = this.getToken();

    if (!token) {
      return false;
    }
    return true;
  }

}

