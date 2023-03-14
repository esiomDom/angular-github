import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  accepted: boolean = false;

  constructor(private router: Router, private onboardingApplicationService: OnboardingApplicationService, private modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  onRegister(e: Event) {
    e.preventDefault();
    this.onboardingApplicationService.createUserKyc();

  }

  openXlModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      // console.log(result);
      if (this.accepted) {
        // this.goToKyc()
      }
    }).catch((res) => { });
  }


  goToKyc() {
    this.router.navigate(['/tableau-de-bord/kyc']);
  }


}
