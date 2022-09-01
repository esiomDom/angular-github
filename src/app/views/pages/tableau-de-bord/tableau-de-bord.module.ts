import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauDeBordRoutingModule } from './tableau-de-bord-routing.module';
import { TableauDeBordComponent } from './tableau-de-bord.component';


@NgModule({
  declarations: [
    TableauDeBordComponent
  ],
  imports: [
    CommonModule,
    TableauDeBordRoutingModule
  ]
})
export class TableauDeBordModule { }
