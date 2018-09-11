import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ManageRoutingModule } from './manage-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MomentModule } from 'ngx-moment';

// misc
import { PrettyJsonModule } from 'angular2-prettyjson';

import { ProcessEffects } from './effects/manage.effects';
import { reducers } from './reducers';

import { ManagePageComponent } from './containers/manage-page/manage-page.component';
import { ProcessPageComponent } from './containers/process-page/process-page.component';
import { ProcessTableComponent } from './components/process-table/process-table.component';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    MomentModule,
    ManageRoutingModule,
    PrettyJsonModule
  ],
  declarations: [ManagePageComponent, ProcessPageComponent, ProcessTableComponent]
})
export class ManageModule { }
