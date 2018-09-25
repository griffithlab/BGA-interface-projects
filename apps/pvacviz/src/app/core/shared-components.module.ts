import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { RecursiveTreeviewComponent } from './components/recursive-treeview.component';

export const COMPONENTS = [
  RecursiveTreeviewComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedComponentsModule { }
