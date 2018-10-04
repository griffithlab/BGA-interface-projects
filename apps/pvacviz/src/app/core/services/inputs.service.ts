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
      return map(res, (f, index) => {
        if (f.fileID === undefined) {
          // ngrx-entity uses fileID to index entities, so gets confused if no fileID is present, as with directories.
          // ngrx-entity doesn't deal with recursive structures very well, so we should either not use it to index
          // files/directories, or normalize using something like normalizr
          // Here, we only need to ensure that the root-level directories have fileIDs, as we don't use queries on the
          // inputs that require lookup by ID - we just grab the whole thing
          f.fileID = index + 10000;
        }
        return f as File
      })
        .filter(f => first(f.display_name) !== '.') // filter out invisible files
        .filter(f => f.type === 'directory' || f.is_input); // filter non-input files
    }
  }
}
