import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { map, filter, first, includes } from 'lodash-es';

import { ConfigService } from './config.service';
import { ApiAllelesResponse, Allele } from '@pvz/core/models/api-responses.model';
import { File } from '@pvz/core/models/file.model';
import { ApiAllelesRequest } from '@pvz/app/core/models/api-requests.model';

@Injectable()
export class AllelesService {
  private allelesPath: string;

  constructor(private http: HttpClient, private conf: ConfigService) {
    this.allelesPath = conf.apiUrl() + '/validalleles';
  }

  query(req): Observable<ApiAllelesResponse> {
    const options = {
      params: {
        prediction_algorithms: req.prediction_algorithms ? req.prediction_algorithms : '',
        name_filter: req.name_filter ? req.name_filter : '',
        count: req.count ? req.count : '100',
        page: req.page ? req.page : '1'
      }
    }
    return this.http.get(this.allelesPath, options)
      .map(res => res as ApiAllelesResponse);
  }
}
