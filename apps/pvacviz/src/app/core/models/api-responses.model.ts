import { File } from './file.model';
import { Process } from './process.model';

export interface ApiMeta {
  page: number;
  count: number;
  total_count: number;
  total_pages: number;
}

export const initialMeta = {
  count: null,
  page: null,
  total_count: null,
  total_pages: null
};

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

export interface ApiProcessesResponse {
  _meta: ApiMeta;
  result: Process[];
}

export interface ApiInputResponse extends Array<File> { }

export interface ApiDropboxResponse extends Array<File> { }

export interface ApiAlgorithmsResponse extends Array<Algorithm> { }
