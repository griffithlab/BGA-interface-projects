export interface File {
  readonly description: string;
  readonly display_name: string;
  readonly fileID: number;
  readonly url: string;
  readonly rows?: number;
  readonly size?: number;
}
