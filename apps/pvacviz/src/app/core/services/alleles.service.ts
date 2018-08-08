import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { map, filter, first } from 'lodash-es';

import { ConfigService } from './config.service';
import { ApiAllelesResponse } from '@pvz/core/models/api-responses.model';
import { File } from '@pvz/core/models/file.model';

@Injectable()
export class AllelesService {
  private allelesPath: string;

  constructor(private http: HttpClient, private conf: ConfigService) {
    this.allelesPath = conf.apiUrl() + '/validalleles';
  }

  query(): Observable<ApiAllelesResponse> {
    return this.http.get(this.allelesPath)
      .map(parseResponse);

    // return an array of Algorithm objects so ngrx-entity has ids to work with
    function parseResponse(res: Response): ApiAllelesResponse {
      return map(res, (f, i) => { return { id: i, name: f } });
    }
  }
}
