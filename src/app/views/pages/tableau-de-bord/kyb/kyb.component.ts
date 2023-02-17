import urlList from 'src/app/core/utils/service-list';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FiliereIntervention, StatutJuridique, TypeEntite } from 'src/app/libs/onboarding-domain/entities/kyc';
import { Commune, Ville } from 'src/app/libs/onboarding-domain/entities/localisation';



@Component({
  selector: 'app-kyb',
  templateUrl: './kyb.component.html',
  styleUrls: ['./kyb.component.scss']
})
export class KyBComponent implements OnInit {
  step1Form: FormGroup;
  step2Form: FormGroup;
  isStep1FormSubmitted: Boolean;
  filiereIntervention: any[]
  kycId: any;
  filiereInterventions: string[] = Object.values(FiliereIntervention)
  typeEntites: string[] = Object.values(TypeEntite)
  villes: String[] = Object.values(Ville)
  communes: String[] = Object.values(Commune)
  statutJuridiques: String[] = Object.values(StatutJuridique)
  step1groupForm: any;
  stepperIsActive: boolean = false;
  formCompleted: boolean = false;
  accepted: boolean = false;


  constructor(public formBuilder: FormBuilder, private onboardingApplicationService: OnboardingApplicationService, private modalService: NgbModal, private router: Router) {

  }

  async ngOnInit() {
    this.initStep2Form()
  }

  openXlModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      // console.log(result);
      if (this.accepted) {
        this.goToKyc()
      }
    }).catch((res) => { });
  }


  initStep2Form = () => {
    this.step2Form = this.formBuilder.group({
      step1Group: new FormGroup({
        denomination: new FormControl(''),
        typeEntite: new FormControl([]),
        nomPrenomContactPrincipal: new FormControl(''),
        natureActivite: new FormControl(''),
        positionContact: new FormControl(''),
        numeroContact: new FormControl(''),
        emailContact: new FormControl(''),
        addresseEmailEntite: new FormControl(''),
        capitalSocial: new FormControl(''),
        nombreAnneeExperienceDirecteur: new FormControl(''),
        nombreAnneeExperienceFondateur: new FormControl(''),
        assuranceEntite: new FormControl(''),
        informationsProducteurs: new FormControl(''),
        informationsClients: new FormControl(''),
        tonnageTotalRealiseParCampagne: new FormControl(''),
        attestationDebonneExecution: new FormControl(''),
        etatsFinancierCertifieSurDeuxAns: new FormControl(''),
        dispositionCompteBancaire: new FormControl(''),
        engagementPret: new FormControl(''),
        informationsPretBancaires: new FormControl(''),
        contentieuxReglementEngagement: new FormControl('')

      }),
    })
  }

  get actionnaires(): any {
    return this.step1Form.get('step3Group.actionnaires') as FormArray;
  }

  get responsables(): any {
    return this.step1Form.get("step3Group.responsables") as FormArray;
  }

  get entrepots(): any {
    return this.step1Form.get('step1Group.entrepots') as FormArray;
  }

  newEntrepot(): FormGroup {
    return this.formBuilder.group({
      capacite: '',
      ville: '',
      commune: '',
      details: ''
    })
  }

  newActionnaire(): FormGroup {
    return this.formBuilder.group({
      nomPrenom: '',
      telephone: '',
      pourcentage: '',
      datePrisePosition: ''
    })
  }

  newResponsable(): FormGroup {
    return this.formBuilder.group({
      nomPrenom: '',
      telephone: '',
      position: '',
      datePrisePosition: ''
    })
  }

  addActionnaires() {
    if (this.actionnaires.length < 5) {
      const actionnairesForm = this.newActionnaire();
      this.actionnaires.push(actionnairesForm)
    } else {
      alert('limite de d\'actionnaire atteintes')
    }
  }

  addResponsable = () => {
    if (this.responsables.length < 5) {
      const responsableForm = this.newResponsable();
      this.responsables.push(responsableForm)
    } else {
      alert('limite de responsables atteintes')
    }
  }

  addEntrepot() {
    if (this.entrepots.length < 5) {
      const entrepotForm = this.newEntrepot();
      this.entrepots.push(entrepotForm)
    } else {
      alert('limite d\'entrepots atteintes')
    }
  }

  patchKyc() {
    const payload = this.step1Form.value;
    console.log(payload);
    this.onboardingApplicationService.patchKyc(payload, this.kycId);
  }

  getCurrentKyc() {
    const savedkyc = JSON.parse(localStorage.getItem('kyc') || '{}');
    if (savedkyc) {
      this.kycId = savedkyc.oid
      this.onboardingApplicationService.getCurrentKyc(this.kycId);
    } else {
      this.onboardingApplicationService.createUserKyc();
      this.getCurrentKyc()
    }
    this.onboardingApplicationService.kycData.subscribe(data => {
      this.setFormValue(data);
    })


  }

  async changeFile(event: any, controlName: any) {
    const fileToUpload = await event.target.files[0];
    await this.onboardingApplicationService.uploadDocument(fileToUpload);
    await this.onboardingApplicationService.uploadedFile.subscribe((file) => {
      this.step1Form.get(`step2Group.${controlName}`)?.patchValue(this.generateUploadedFilePath(file));
    });
  }

  generateUploadedFilePath(fileName: string) {
    return `http://0.0.0.0:9005/files/${fileName}`
  }


  setFormValue(kyc: any) {

    this.step1Form.patchValue(kyc);
  }


  finishFunction() {
    alert('Successfully Completed');
  }

  onSubmit() {
    alert('form submited')
  }

  goToKyc() {
    this.router.navigate(['/kyc']);
  }


}
