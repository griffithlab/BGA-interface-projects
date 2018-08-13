export interface File {
  readonly fileID: number;
  readonly type: string;
  readonly description: string;
  readonly display_name: string;
  readonly url: string;
  readonly rows?: number;
  readonly size?: number;
  directory?: string;
}

export interface Files extends Array<File> { };
