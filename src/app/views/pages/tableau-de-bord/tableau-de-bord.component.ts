import urlList from 'src/app/core/utils/service-list';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';
import { Commune, Ville } from './../../../libs/onboarding-domain/entities/localisation';
import { FiliereIntervention, StatutJuridique, TypeEntite } from './../../../libs/onboarding-domain/entities/kyc';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  step1Form: FormGroup;
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


  constructor(public formBuilder: FormBuilder, private onboardingApplicationService: OnboardingApplicationService) {

  }

  async ngOnInit() {
    await this.initStep1Form()
    await this.addEntrepot()
    await this.addActionnaires()
    await this.addResponsable()
    await this.getCurrentKyc();
  }



  initStep1Form = () => {
    this.step1Form = this.formBuilder.group({
      step1Group: new FormGroup({
        typeEntite: new FormControl(''),
        denomination: new FormControl(''),
        abreviation: new FormControl(''),
        raisonSocial: new FormControl(''),
        email: new FormControl(''),
        telephone: new FormControl(''),
        adressePostal: new FormControl(''),
        villeRegionImplementation: new FormControl(''),
        communeRegionImplementation: new FormControl(''),
        detailRegionImplementation: new FormControl(''),
        villeSiegeSocial: new FormControl(''),
        communeSiegeSocial: new FormControl(''),
        detailSiegeSocial: new FormControl(''),
        siteInternet: new FormControl(''),
        filiereIntervention: new FormControl([]),
        dateCreationEntite: new FormControl(''),
        statutJuridique: new FormControl(''),
        capitalSocial: new FormControl(''),
        entrepots: this.formBuilder.array([]),
      }),
      step2Group: new FormGroup({
        numeroDfe: new FormControl(''),
        fichierDfe: new FormControl(''),
        numeroRccm: new FormControl(''),
        fichierRccm: new FormControl(''),
        fichierStatus: new FormControl(''),
        licenseExploitation: new FormControl(''),
        certificats: new FormControl(''),
        fichierOrganigramme: new FormControl(''),
      }),
      step3Group: new FormGroup({
        actionnaires: this.formBuilder.array([]),
        responsables: this.formBuilder.array([])
      })
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
    return  `http://0.0.0.0:9005/files/${fileName}`
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


}
