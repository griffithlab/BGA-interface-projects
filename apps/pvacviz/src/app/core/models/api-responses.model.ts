import { File } from './file.model';

export interface ApiStartResponse {
  code: number;
  message: string;
  processid: number;
}

export interface ApiInputResponse extends Array<File> { }
