import { File } from './file.model';

export interface ApiMeta {
  page: string;
  count: string;
  total_count: string;
  total_pages: string;
}

export interface ApiStartResponse {
  status: number;
  message: string;
  processid: number;
}

export interface Algorithm {
  id: number;
  name: string;
}

export interface Allele {
  name: string;
  prediction_algorithms: string[];
}

export interface ApiAllelesResponse {
  _meta: ApiMeta;
  result: Allele[];
}

export interface ApiInputResponse extends Array<File> { }

export interface ApiDropboxResponse extends Array<File> { }

export interface ApiAlgorithmsResponse extends Array<Algorithm> { }
