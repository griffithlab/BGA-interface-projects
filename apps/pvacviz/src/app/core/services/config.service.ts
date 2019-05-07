import { Injectable, Inject } from '@angular/core';
import { environment } from '@pvz/environments/environment';
import { WINDOW } from '@pvz/core/services/window.provider';

@Injectable()
export class ConfigService {

  constructor(@Inject(WINDOW) private window: Window) { }

  server = {
    protocol: 'http://',
    hostname: this.window.location.hostname,
    port: environment.production ? 8080 : 4200,
    api: 'api',
    version: 'v1'
  };

  bokehServer = {
    protocol: 'http://',
    hostname: this.window.location.hostname,
    port: 8080,
    api: 'api',
    version: 'v1'
  };

  serverUrl() {
    return this.server.protocol +
      this.server.hostname + ':' +
      this.server.port;
  }

  apiUrl() {
    return this.server.protocol +
      this.server.hostname + ':' +
      this.server.port + '/' +
      this.server.api + '/' +
      this.server.version;
  }

  bokehUrl() {
    return this.bokehServer.protocol +
      this.bokehServer.hostname + ':' +
      this.bokehServer.port + '/' +
      this.bokehServer.api + '/' +
      this.bokehServer.version;
  }
}
