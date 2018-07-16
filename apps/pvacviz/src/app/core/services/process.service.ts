import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Process } from '../../core/models/process.model';
import { ApiStartResponse } from '../../core/models/api-responses.model';

import { ConfigService } from './config.service';

@Injectable()
export class ProcessService {
  private API_PATH = 'http://localhost:4200/api/v1';
  private processesPath: string;
  private archivePath: string;
  private stagingPath: string;

  constructor(private http: HttpClient, private conf: ConfigService) {
    this.processesPath = conf.apiUrl() + '/processes';
    this.archivePath = conf.apiUrl() + '/archive';
    this.stagingPath = conf.apiUrl() + '/staging';
  }

  query(): Observable<Process[]> {
    return this.http
      .get<{ result: Process[] }>(this.processesPath)
      .pipe(map(processes => processes.result || []));
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
