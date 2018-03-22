import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { LayoutComponent } from './containers/layout/layout.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';

import { ProcessService } from './services/process.service';

export const COMPONENTS = [
  LayoutComponent,
  NotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule
  ],
  providers: [ProcessService],
  declarations: COMPONENTS,
  exports: COMPONENTS
})

export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
