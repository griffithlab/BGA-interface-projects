import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Process } from '../../manage/models/process.model';

@Injectable()
export class ProcessService {
  private API_PATH = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  query(): Observable<Process[]> {
    return this.http
      .get<{ result: Process[] }>(`${this.API_PATH}/processes`)
      .pipe(map(processes => processes.result || []));
  }

  start(processParameters: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    return this.http.post<number>(`${this.API_PATH}/staging`, processParameters, httpOptions)
      .pipe((response: Response) => {
        console.log(response);
        return JSON.parse(response['_body']) as number;
      });
  }

  // archive(id: number): Observable<string> {
  //   return this.http.get(`${this.api}/archive/${id}`)
  //     .map((response: Response) => {
  //       return response.statusText;
  //     });
  // }
}
