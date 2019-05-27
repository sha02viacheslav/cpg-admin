import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserProfile } from '../../user-profile/user-profile';
import { environment } from '../../environment/environment';
import { AppHttpClient } from '../../http-client';

import {HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private cookieService: CookieService){
  }
  public isAuthenticated(){
		this.cookieService.set('test', 'asas');
    const remember = this.cookieService.get('remember_manager_59ba36addc2b2f9401580f014c7f58ea4e30989d');
    console.log("cookie", remember);
    return true ;
    //return remember? true : false;
  }
  
}
