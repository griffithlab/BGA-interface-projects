import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Process } from '@pvz/core/models/process.model';
import { ApiStartResponse, ApiProcessesResponse } from '@pvz/core/models/api-responses.model';

import { ConfigService } from './config.service';

@Injectable()
export class ProcessService {
  private processesPath: string;
  private archivePath: string;
  private stagingPath: string;

  constructor(private http: HttpClient, private conf: ConfigService) {
    this.processesPath = conf.apiUrl() + '/processes';
    this.archivePath = conf.apiUrl() + '/archive';
    this.stagingPath = conf.apiUrl() + '/staging';
  }

  query(req): Observable<ApiProcessesResponse> {
    const options = {
      params: {
        count: req.count ? req.count : '10',
        page: req.page ? req.page : '1'
      }
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
      .get<string>(`${this.archivePath}/${id}`)
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

  // archive(id: number): Observable<string> {
  //   return this.http.get(`${this.api}/archive/${id}`)
  //     .map((response: Response) => {
  //       return response.statusText;
  //     });
  // }
}
