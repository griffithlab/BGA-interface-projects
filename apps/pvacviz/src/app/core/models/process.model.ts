import { File } from './file.model';
import { Parameters } from './parameters.model'

export interface Process {
  readonly attached: boolean;
  readonly command: string;
  readonly files: { [key: number]: File };
  readonly id: number;
  readonly last_message: string;
  readonly log?: string[];
  readonly output: string;
  readonly parameters: Parameters;
  readonly pid: number;
  readonly results_url: string;
  readonly running: boolean;
  readonly status: number;
  readonly url: string;
}
