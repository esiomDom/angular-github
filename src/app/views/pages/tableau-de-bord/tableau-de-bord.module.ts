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
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KycComponent } from './kyc/kyc.component';
import { AccueilComponent } from './accueil/accueil.component';
import { KyBComponent } from './kyb/kyb.component';



@NgModule({
  declarations: [
    TableauDeBordComponent,
    KycComponent,
    AccueilComponent,
    KyBComponent
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
    PdfViewerModule,
    NgbModule

  ]
})
export class TableauDeBordModule { }
