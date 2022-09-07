import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { OnboardingDomainComponent } from './onboarding-domain.component';
import { OnboardingService } from './infrastructure/onboarding.service';
import { OnboardingApplicationService } from './application/onboarding-application.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  declarations: [OnboardingDomainComponent],
  providers: [OnboardingService, OnboardingApplicationService]
})
export class OnboardingDomainModule { }
