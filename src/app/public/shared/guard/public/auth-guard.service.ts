import { AuthService } from './../../services/public/auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userInfo = this.authService.getUserInfo(); 
    console.log(userInfo);
    if (userInfo) {
      if (
        route &&
        route.data && 
        userInfo.role && 
        route.data.role && 
        route.data.role.indexOf(userInfo.role.name) > -1 
        ) {
          // authorized so return true
          return true;
        }

        // role not authorized so redirect to home page
      this.router.navigate(['/access-denied']);
      return false;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
