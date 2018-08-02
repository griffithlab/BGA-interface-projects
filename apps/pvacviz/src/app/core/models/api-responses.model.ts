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

export interface ApiInputResponse extends Array<File> { }
export interface ApiDropboxResponse extends Array<File> { }
export interface ApiAlgorithmsResponse extends Array<Algorithm> { }
