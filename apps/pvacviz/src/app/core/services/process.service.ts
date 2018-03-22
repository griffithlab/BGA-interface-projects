import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Process } from '../../processes/models/process.model';

@Injectable()
export class ProcessService {
  private API_PATH = 'localhost:4200/api/v1/processes';

  constructor(private http: HttpClient) { }

  query(): Observable<Process[]> {
    return this.http
      .get<{ result: Process[] }>(`${this.API_PATH}`)
      .pipe(map(processes => processes.result || []));
  }

  // retrieveBook(volumeId: string): Observable<Book> {
  //   return this.http.get<Book>(`${this.API_PATH}/${volumeId}`);
  // }
}
