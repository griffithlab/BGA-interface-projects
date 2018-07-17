import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { map, filter, first } from 'lodash-es';

import { ApiDropboxResponse } from '../../core/models/api-responses.model';
import { File } from '../../core/models/file.model';

import { ConfigService } from './config.service';

@Injectable()
export class DropboxService {
  private API_PATH = 'http://localhost:4200/api/v1';
  private dropboxPath: string;

  constructor(private http: HttpClient, conf: ConfigService) {
    this.dropboxPath = conf.apiUrl() + '/dropbox';
  }

  query(): Observable<ApiDropboxResponse> {
    return this.http.get(this.dropboxPath)
      .map(parseResponse);

  }
}

function parseResponse(res: Response): ApiDropboxResponse {
  return map(res, (f) => {
    f.display_name = f.display_name
      .split('/')
      .slice(-1)
      .join('/');
    return f as File;
  })
    .filter(f => first(f.display_name) !== '.'); // filter out invisible files
}
