import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  returnUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private onboardingDomainService: OnboardingApplicationService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onLoggedin(e: Event) {
    e.preventDefault();
    await localStorage.setItem('isLoggedin', 'true');
    await this.onboardingDomainService.createUserKyc();
    if (localStorage.getItem('isLoggedin')) {
      await this.router.navigate([this.returnUrl]);
    }
  }

}
