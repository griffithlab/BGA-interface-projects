import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { map, filter, first } from 'lodash-es';

import { ConfigService } from './config.service';
import { ApiInputResponse } from '@pvz/core/models/api-responses.model';
import { File } from '@pvz/core/models/file.model';

@Injectable()
export class InputService {
  private inputPath: string;

  constructor(private http: HttpClient, private conf: ConfigService) {
    this.inputPath = conf.apiUrl() + '/input';
  }

  query(): Observable<ApiInputResponse> {
    return this.http.get(this.inputPath)
      .map(parseResponse);

    function parseResponse(res: Response): ApiInputResponse {
      return map(res, f => f as File)
        .filter(f => first(f.display_name) !== '.'); // filter out invisible files
    }
  }
}
