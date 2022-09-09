import { OnboardingDomainModule } from './../../../libs/onboarding-domain/onboarding-domain.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableauDeBordRoutingModule } from './tableau-de-bord-routing.module';
import { TableauDeBordComponent } from './tableau-de-bord.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    TableauDeBordComponent
  ],
  imports: [
    CommonModule,
    TableauDeBordRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FeahterIconModule,
    ArchwizardModule,
    CustomFormsModule, // Ngx-custom-validators
    NgxMaskModule.forRoot({ validation: true }),
    NgSelectModule,
    OnboardingDomainModule,

  ]
})
export class TableauDeBordModule { }
