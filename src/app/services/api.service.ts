import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONST } from '../config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public post(restPath: string, body: any): Observable<any> {
    const url = CONST.CONFIG.TESTCENTER + restPath;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.post(url, body, { headers });
  }

  public get(restPath: string): Observable<any> {
    const url = CONST.CONFIG.TESTCENTER + restPath;

    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.get(url, { headers });
  }

  public delete(restPath: string): Observable<any> {
    const url = CONST.CONFIG.TESTCENTER + restPath;

    const headers = new HttpHeaders({
      Accept: 'application/json',
    });

    return this.http.delete(url, { headers });
  }

  public put(restPath: string, body: any): Observable<any> {
    const url = CONST.CONFIG.TESTCENTER + restPath;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });

    return this.http.put(url, body, { headers });
  }
}
