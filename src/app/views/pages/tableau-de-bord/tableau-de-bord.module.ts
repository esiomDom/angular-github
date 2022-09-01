import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauDeBordRoutingModule } from './tableau-de-bord-routing.module';
import { TableauDeBordComponent } from './tableau-de-bord.component';
import { FormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ArchwizardModule } from 'angular-archwizard';


@NgModule({
  declarations: [
    TableauDeBordComponent
  ],
  imports: [
    CommonModule,
    TableauDeBordRoutingModule,
    FormsModule,
    FeahterIconModule,
    ArchwizardModule
  ]
})
export class TableauDeBordModule { }
