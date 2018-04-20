import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Process } from '../../core/models/process.model';
import { ApiStartResponse } from '../../core/models/api-responses.model';

@Injectable()
export class ProcessService {
  private API_PATH = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) { }

  query(): Observable<Process[]> {
    return this.http
      .get<{ result: Process[] }>(`${this.API_PATH}/processes`)
      .pipe(map(processes => processes.result || []));
  }

  start(processParameters: any): Observable<ApiStartResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.http.post(`${this.API_PATH}/staging`, processParameters, httpOptions)
      .map(parseResponse);

    function parseResponse(res: Response): ApiStartResponse {
      console.log(res);
      return JSON.parse(res['_body']) as ApiStartResponse;
    }
  }

  // archive(id: number): Observable<string> {
  //   return this.http.get(`${this.api}/archive/${id}`)
  //     .map((response: Response) => {
  //       return response.statusText;
  //     });
  // }
}
