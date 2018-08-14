import { File } from './file.model';

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
  id: number;
  name: string;
  algorithms: string[];
}

export interface ApiAllelesResponse {
  [key: string]: string[]
}

export interface ApiInputResponse extends Array<File> { }

export interface ApiDropboxResponse extends Array<File> { }

export interface ApiAlgorithmsResponse extends Array<Algorithm> { }
