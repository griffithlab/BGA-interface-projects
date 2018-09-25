import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Process } from '@pvz/core/models/process.model';
import { ApiStartResponse, ApiProcessesResponse } from '@pvz/core/models/api-responses.model';

import { ConfigService } from './config.service';

@Injectable()
export class ProcessService {
  private processesPath: string;
  private stagingPath: string;
  private apiPath: string;
  constructor(private http: HttpClient, private conf: ConfigService) {
    this.apiPath = conf.apiUrl();
    this.processesPath = conf.apiUrl() + '/processes';
    this.stagingPath = conf.apiUrl() + '/staging';
  }

  query(req): Observable<ApiProcessesResponse> {
    const params = new HttpParams()
      .set('count', req.count)
      .set('page', req.page)
    // .set('sorting', req.sorting);

    const options = {
      params: params,
    }

    return this.http
      .get<ApiProcessesResponse>(this.processesPath, options)
      .pipe(map(processes => processes));
  }

  get(id): Observable<Process> {
    return this.http
      .get<Process>(`${this.processesPath}/${id}`)
      .pipe(map(process => process || null));
  }

  archive(id): Observable<string> {
    return this.http
      .post<string>(`${this.apiPath}/processes/${id}/archive`, null)
      .pipe(map(message => message || null));
  }

  stop(id): Observable<string> {
    return this.http
      .get<string>(`${this.apiPath}/stop/${id}`)
      .pipe(map(message => message || null));
  }

  restart(id): Observable<string> {
    return this.http
      .post<string>(`${this.apiPath}/processes/${id}/restart`, null)
      .pipe(map(message => message || null));
  }

  export(id): Observable<string> {
    return this.http
      .post<string>(`${this.apiPath}/processes/${id}/export`, null)
      .pipe(map(message => message || null));
  }

  delete(id): Observable<string> {
    return this.http
      .delete<string>(`${this.apiPath}/processes/${id}/delete`)
      .pipe(map(message => message || null));
  }

  start(processParameters: any): Observable<ApiStartResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post(`${this.stagingPath}`, processParameters, httpOptions)
      .map((res) => res as ApiStartResponse);
  }
}
