import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import * as _ from 'lodash';

import { ApiInputResponse } from '../../core/models/api-responses.model';
import { File } from '../../core/models/file.model';

@Injectable()
export class InputService {
  private API_PATH = 'http://localhost:4200/api/v1';

  constructor(private http: HttpClient) { }

  query(): Observable<ApiInputResponse> {
    return this.http.get(`${this.API_PATH}/input`)
      .map(parseResponse);

    function parseResponse(res: Response): ApiInputResponse {
      return _.map(res, f => f as File)
        .filter(f => _.first(f.display_name) !== '.'); // filter out invisible files
    }
  }
}
