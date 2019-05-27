import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AppHttpClient {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append("Content-Type", 'application/json');
    this.headers.append("Access-Control-Allow-Origin", "*");
    this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
  }

  get (url): Observable<any> {
    return this.http.get(url, { headers: this.headers } )
      .pipe(
        tap(_ => this.log('fetched datas')),
        catchError(this.handleError('get', []))
      );
  }

  post (url, data): Observable<any> {
    return this.http.post(url, data, { headers: this.headers } )
      .pipe(
        tap(_ => this.log('fetched datas')),
        catchError(this.handleError('post', []))
      );
  }

  put (url, data): Observable<any> {
    return this.http.put(url, data, { headers: this.headers } )
      .pipe(
        tap(_ => this.log('fetched datas')),
        catchError(this.handleError('put', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
  }

}