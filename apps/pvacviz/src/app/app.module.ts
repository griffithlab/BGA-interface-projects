// @angular
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// @ngrx
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';

// nrwl
import { NxModule } from "@nrwl/nx";

// misc
import { PrettyJsonModule } from 'angular2-prettyjson';

// pvacviz
import { CustomRouterStateSerializer } from '@pvz/shared/utilities';
import { NetworkLoggerService } from '@pvz/shared/networkLogger.service';
import { environment } from "@pvz/environments/environment";
import { CoreModule } from '@pvz/core/core.module';
import { LayoutComponent } from "@pvz/core/containers/layout/layout.component";

import { reducers, metaReducers } from "@pvz/reducers";
import { routes } from '@pvz/routes';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: "enabled" }),

    /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'pVACviz Store DevTools',
      logOnly: environment.production,
    }) : [],

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
    CoreModule.forRoot(),
    PrettyJsonModule
  ],
  providers: [
    /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    },
    /**
     * Log HTTP activity to console if in not in production mode
     */
    !environment.production ? [NetworkLoggerService, {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkLoggerService,
      multi: true
    }] : [],
  ],
  bootstrap: [LayoutComponent],
})
export class AppModule { }
