import urlList from 'src/app/core/utils/service-list';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';



@Component({
  selector: 'app-credit-scoring',
  templateUrl: './view-scoring.component.html',
  styleUrls: ['./view-scoring.component.scss']
})
export class ViewScoringComponent implements OnInit {
  step1Form: FormGroup;
  step2Form: FormGroup;
  isStep1FormSubmitted: Boolean;
  filiereIntervention: any[]
  step1groupForm: any;
  stepperIsActive: boolean = false;
  formCompleted: boolean = false;
  accepted: boolean = false;
  score: any = 0;
  paramScore: any = 0;
  scoringThresOldDanger: number = 50;
  scoringThresOldWarning: number = 75;
  scoring: any;


  constructor(public formBuilder: FormBuilder, private onboardingApplicationService: OnboardingApplicationService, private router: Router, private route: ActivatedRoute, private dbService: NgxIndexedDBService) {
    this.paramScore = this.route.snapshot.paramMap.get('score');

  }

  async ngOnInit() {
    this.score = parseFloat(this.paramScore)

    this.dbService.getByKey('scoring', parseInt(this.paramScore)).subscribe(scorings => {
      console.log(scorings)
      this.scoring = scorings;
    });
  }

  onSubmit() {

  }

  goToCreditScoring() {
    this.router.navigate(['/credit-scoring']);
  }


}
