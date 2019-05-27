import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AppHttpClient } from '../../http-client';
import {HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
 
 
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FilterService extends AppHttpClient {

  private userlistsUrl = environment.serverUrl + '/dashboard';

  getPosition (): Observable<any> {
    let url = this.userlistsUrl + "/getPosition";
    return this.get(url);
  }
}