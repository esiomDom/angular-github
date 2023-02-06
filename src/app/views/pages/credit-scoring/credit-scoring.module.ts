import { OnboardingDomainModule } from '../../../libs/onboarding-domain/onboarding-domain.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditScoringRoutingModule } from './credit-scoring-routing.module';
import { CreditScoringComponent } from './credit-scoring.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomFormsModule } from 'ngx-custom-validators';
import { NgxMaskModule } from 'ngx-mask';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewScoringComponent } from './view-scoring/view-scoring.component';
import { NewScoringComponent } from './new-scoring/new-scoring.component';
import { ScoringListComponent } from './list-scoring/scoring-list.component';



@NgModule({
  declarations: [
    CreditScoringComponent,
    ViewScoringComponent,
    NewScoringComponent,
    ScoringListComponent
  ],
  imports: [
    CommonModule,
    CreditScoringRoutingModule,
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
export class CreditScoringModule { }
