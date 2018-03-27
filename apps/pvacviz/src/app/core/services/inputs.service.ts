import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import chain from 'lodash/chain';
import first from 'lodash/first';

import { File } from '../../core/models/file.model';

@Injectable()
export class InputService {
  private API_PATH = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  query(): Observable<File[]> {
    return this.http.get(`${this.API_PATH}/input`)
      .map(parseResponse);

    function parseResponse(res: Response): File[] {
      return chain(res.json())
        .map(f => f as File)
        .filter(f => first(f.display_name) !== '.') // filter hidden
        .value();
    }
  }
}
