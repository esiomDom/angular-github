import { FiliereIntervention, TypeEntite } from './../../../libs/onboarding-domain/entities/kyc';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
@Component({
  selector: 'app-tableau-de-bord',
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.scss']
})
export class TableauDeBordComponent implements OnInit {
  step1Form: FormGroup;
  isStep1FormSubmitted: Boolean;

  filiereIntervention: string[] = Object.values(FiliereIntervention)
  typeEntite: string[] = Object.values(TypeEntite)


  constructor(public formBuilder: FormBuilder) {
    console.log(this.filiereIntervention);

  }

  ngOnInit(): void {
    this.initStep1Form()
    this.addEntrepot()
    this.addActionnaires()
    this.addResponsable()

  }


  initStep1Form = () => {
    this.step1Form = this.formBuilder.group({
      typeEntite: new FormControl(''),
      denomination: new FormControl(''),
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
      numeroDfe: new FormControl(''),
      fichierDfe: new FormControl(''),
      numeroRccm: new FormControl(''),
      fichierRccm: new FormControl(''),
      licenseExploitation: new FormControl([]),
      certificats: new FormControl([]),
      fichierOrganigramme: new FormControl(''),
      entrepots: this.formBuilder.array([]),
      actionnaires: this.formBuilder.array([]),
      responsables: this.formBuilder.array([])
    })
  }

  get actionnaires(): any {
    return this.step1Form.get("actionnaires") as FormArray;
  }

  get responsables(): any {
    return this.step1Form.get("responsables") as FormArray;
  }

  get entrepots(): any {
    return this.step1Form.get('entrepots') as FormArray;
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
      const responsableForm = this.newActionnaire();
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


  finishFunction() {
    alert('Successfully Completed');
  }

  onSubmit() {
    alert('form submited')
  }


}
