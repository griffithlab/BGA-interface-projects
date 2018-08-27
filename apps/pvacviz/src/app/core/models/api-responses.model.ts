import { File } from './file.model';

export interface Meta {
  current_page: number;
  per_page: number;
  total_count: number;
  total_pages: number;
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
  _meta: Meta;
  result: Allele[];
}

export interface ApiInputResponse extends Array<File> { }

export interface ApiDropboxResponse extends Array<File> { }

export interface ApiAlgorithmsResponse extends Array<Algorithm> { }
