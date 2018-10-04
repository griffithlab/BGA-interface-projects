import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { map, filter, first } from 'lodash-es';

import { ApiDropboxResponse } from '@pvz/core/models/api-responses.model';
import { File } from '@pvz/core/models/file.model';

import { ConfigService } from './config.service';

@Injectable()
export class DropboxService {
  private API_PATH = 'http://localhost:4200/api/v1';
  private dropboxPath: string;

  constructor(private http: HttpClient, conf: ConfigService) {
    this.dropboxPath = conf.apiUrl() + '/visualize';
  }

  query(): Observable<ApiDropboxResponse> {
    return this.http.get(this.dropboxPath)
      .map(parseResponse);

  }
}

function parseResponse(res: Response): ApiDropboxResponse {
  return map(res, (f, index) => {
    if (f.fileID === undefined) {
      // ngrx-entity uses fileID to index entities, so gets confused if no fileID is present, as with directories.
      // Here, we only need to ensure that the root-level directories have fileIDs, as we don't use queries on the
      // inputs that require lookup by ID - we just grab the whole thing
      // TODO: ngrx-entity doesn't deal with recursive structures very well, so we should either not use it to index
      // files/directories, or normalize using something like normalizr
      f.fileID = index + 10000;
    }
    f.display_name = f.display_name
      .split('/')
      .slice(-1)
      .join('/');
    return f as File;
  })
    .filter(f => first(f.display_name) !== '.'); // filter out invisible files
}
