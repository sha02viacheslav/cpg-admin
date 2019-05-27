import { Injectable } from '@angular/core';
import { Router, CanLoad, Route, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
		private location: Location,
  ) {}

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      debugger;
      return false;
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authenticationService.isAuthenticated()) {
      //window.open('www.clickpassgoal.com/login', '_blank');
      //console.log("isNotAuthenticatedisAuthenticated");
      return false;
    }
   // console.log("isAuthenticated");
    return true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authenticationService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
      debugger;
      return false;
    }
    return true;
  }
}
