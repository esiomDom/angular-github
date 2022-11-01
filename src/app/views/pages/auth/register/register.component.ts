import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private onboardingApplicationService: OnboardingApplicationService) { }

  ngOnInit(): void {
  }

  onRegister(e: Event) {
    e.preventDefault();
    this.onboardingApplicationService.createUserKyc();

  }

}
