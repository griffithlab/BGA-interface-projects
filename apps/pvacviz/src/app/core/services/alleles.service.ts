import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { map, filter, first, includes } from 'lodash-es';

import { ConfigService } from './config.service';
import { ApiAllelesResponse, Allele } from '@pvz/core/models/api-responses.model';
import { File } from '@pvz/core/models/file.model';

@Injectable()
export class AllelesService {
  private allelesPath: string;

  constructor(private http: HttpClient, private conf: ConfigService) {
    this.allelesPath = conf.apiUrl() + '/validalleles';
  }

  query(algorithms: string[]): Observable<Allele[]> {
    const options = { params: { prediction_algorithms: algorithms.join(',') } }
    return this.http.get(this.allelesPath, options)
      .map(parseResponse);

    // convert response from ApiAllelesResponse to Allele[]
    function parseResponse(res: ApiAllelesResponse): Allele[] {
      let allele_objects: Allele[] = [];
      let id = 0;
      map(res, (alleles, algorithm) => {
        map(alleles, (allele) => {
          let allele_obj: Allele = {
            id: id,
            name: allele,
            algorithms: [algorithm]
          }
          if (!includes(alleles, allele_obj)) {
            allele_objects.push(allele_obj);
            id++
          } else {
            allele_obj.algorithms.push(algorithm);
            allele_objects.push(allele_obj);
            id++
          }
        })
      })
      return allele_objects;
    }
  }
}
