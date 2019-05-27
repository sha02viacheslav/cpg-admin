import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { AppHttpClient } from '../http-client';

import {HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserListsService extends AppHttpClient {

  private userlistsUrl = environment.serverUrl + '/dashboard';

  getUserLists (filterForm: object): Observable<any> {
    let url = this.userlistsUrl + "/getUserLists";
    return this.post(url, filterForm);
  }

  public getUser(): Observable < any > {
		let url = environment.serverUrl + "/api/getUser";
		return this.post(url, { });
  }
}