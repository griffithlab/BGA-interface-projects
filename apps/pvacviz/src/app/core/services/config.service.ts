import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {

  server = {
    protocol: 'http://',
    domain: 'localhost',
    port: environment.production ? 8080 : 4200,
    api: 'api',
    version: 'v1'
  };

  bokehServer = {
    protocol: 'http://',
    domain: 'localhost',
    port: 8080,
    api: 'api',
    version: 'v1'
  };

  serverUrl() {
    return this.server.protocol +
      this.server.domain + ':' +
      this.server.port;
  }

  apiUrl() {
    return this.server.protocol +
      this.server.domain + ':' +
      this.server.port + '/' +
      this.server.api + '/' +
      this.server.version;
  }

  bokehUrl() {
    return this.bokehServer.protocol +
      this.bokehServer.domain + ':' +
      this.bokehServer.port + '/' +
      this.bokehServer.api + '/' +
      this.bokehServer.version;
  }
}
