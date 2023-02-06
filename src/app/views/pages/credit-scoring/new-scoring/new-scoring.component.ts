import urlList from 'src/app/core/utils/service-list';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';



@Component({
  selector: 'app-new-scoring',
  templateUrl: './new-scoring.component.html',
  styleUrls: ['./new-scoring.component.scss']
})
export class NewScoringComponent implements OnInit {
  step1Form: FormGroup;
  step2Form: FormGroup;
  isStep1FormSubmitted: Boolean;
  filiereIntervention: any[]
  step1groupForm: any;
  stepperIsActive: boolean = false;
  accepted: boolean = false;
  noteCa: any;
  noteCroissanceCa: any;
  noteEbeCa: any;
  noteCafgCa: any;
  noteCapaciteRemboursement: any;
  noteCapitauxPropre: any;
  noteRentabilite: any;
  noteFrasFin: any;
  noteLiquiditeGeneral: any;
  noteMoyen: any;
  notePonderee: any;
  NoteFinale: any;
  noteRentabiliteCA: any;
  noteExperiencePromoteurSociete: number = 100;
  noteNombreAnneeExistenceDeLaSociete: number = 50;
  noteExperienceGerantDansSecteur: number = 100;
  noteFinale: any = 0;


  constructor(public formBuilder: FormBuilder, private onboardingApplicationService: OnboardingApplicationService, private modalService: NgbModal, private router: Router, private dbService: NgxIndexedDBService) {

  }

  async ngOnInit() {
    await this.initStep1Form()
  }


  calculateNote() {
    this.noteCa = this.caculateCANote(this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value)
    this.noteCroissanceCa = this.caculateCANote(this.step1Form.controls.step1Group.get('croissanceChiffreAffaireN')?.value)
    this.noteRentabiliteCA = this.caculateRentabiliteCapitauxPropreNote(this.step1Form.controls.step2Group.get('rentabiliteCapitauxPropreN')?.value)
    this.noteEbeCa = this.caculateCANote(this.step1Form.controls.step2Group.get('ebecaN')?.value)
    this.noteCafgCa = this.caculateCANote(this.step1Form.controls.step2Group.get('cacfgNaN')?.value)
    this.noteCapaciteRemboursement = this.caculateCANote(this.step1Form.controls.step1Group.get('capaciteRemboursement')?.value)
    this.noteCapitauxPropre = this.caculateCANote(this.step1Form.controls.step1Group.get('capitauxPropresActifsN')?.value)
    this.noteRentabilite = this.caculateCANote(this.step1Form.controls.step2Group.get('rentabiliteN')?.value)
    this.noteFrasFin = this.caculateCANote(this.step1Form.controls.step1Group.get('fraisFinancierCAN')?.value)
    this.noteLiquiditeGeneral = this.caculateCANote(this.step1Form.controls.step2Group.get('liquiditeGeneral')?.value)

    const noteMoyenneCa = this.noteCa + this.noteCroissanceCa + this.noteEbeCa + this.noteCafgCa + this.noteCapaciteRemboursement + this.noteCapitauxPropre + this.noteRentabilite + this.noteFrasFin + this.noteLiquiditeGeneral;

    const noteMoyenneEntreprise = this.noteExperienceGerantDansSecteur + this.noteNombreAnneeExistenceDeLaSociete + this.noteExperiencePromoteurSociete;

    const notePondereeCa = noteMoyenneCa * 0.8;

    const notePondereeEntreprise = noteMoyenneEntreprise * 0.2;

    this.noteFinale = notePondereeCa + notePondereeEntreprise;

    this.dbService
      .add('scoring', {
        noteCa: this.noteCa,
        noteCroissanceCa: this.noteCroissanceCa,
        noteRentabiliteCA: this.noteRentabiliteCA,
        noteEbeCa: this.noteEbeCa,
        noteCafgCa: this.noteCafgCa,
        noteCapaciteRemboursement: this.noteCapaciteRemboursement,
        noteCapitauxPropre: this.noteCapitauxPropre,
        noteRentabilite: this.noteRentabilite,
        noteFrasFin: this.noteFrasFin,
        noteLiquiditeGeneral: this.noteLiquiditeGeneral,
        noteMoyenneCa: noteMoyenneCa,
        noteMoyenneEntreprise: noteMoyenneEntreprise,
        notePondereeCa: notePondereeCa,
        notePondereeEntreprise: notePondereeEntreprise,
        noteFinale: this.noteFinale,
        dateCreation: this.formatDate(new Date())
      }).subscribe((key) => {
          console.log('key: ', key);
        });

  }

  formatDate(inputDate: any) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }

  openXlModal(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      // console.log(result);
      if (this.accepted) {
        this.stepperIsActive = true
      }
    }).catch((res) => { });
  }



  initStep1Form = () => {
    this.step1Form = this.formBuilder.group({
      step1Group: new FormGroup({
        totalactifN: new FormControl(0),
        totalactifN1: new FormControl(0),
        totalactifN2: new FormControl(0),
        totalPassifGenN: new FormControl(0),
        totalPassifGenN1: new FormControl(0),
        totalPassifGenN2: new FormControl(0),
        totalCapitauxPropreN: new FormControl(0),
        totalCapitauxPropreN1: new FormControl(0),
        totalCapitauxPropreN2: new FormControl(0),
        totalPassifN: new FormControl({ value: 0, disabled: true }),
        totalPassifN1: new FormControl({ value: 0, disabled: true }),
        totalPassifN2: new FormControl({ value: 0, disabled: true }),
        chiffreAffaireXBN: new FormControl(0),
        chiffreAffaireXBN1: new FormControl(0),
        chiffreAffaireXBN2: new FormControl(0),
        croissanceChiffreAffaireN: new FormControl({ value: 0, disabled: true }),
        croissanceChiffreAffaireN1: new FormControl({ value: 0, disabled: true }),
        croissanceChiffreAffaireN2: new FormControl({ value: 0, disabled: true }),
        empruntsDetteFinancieresN: new FormControl(0),
        empruntsDetteFinancieresN1: new FormControl(0),
        empruntsDetteFinancieresN2: new FormControl(0),
        totalTresoreriePassif: new FormControl(0),
        totalTresoreriePassif1: new FormControl(0),
        totalTresoreriePassif2: new FormControl(0),
        couvertureDetteBancaireActifsN: new FormControl({ value: 0, disabled: true }),
        couvertureDetteBancaireActifsN1: new FormControl({ value: 0, disabled: true }),
        couvertureDetteBancaireActifsN2: new FormControl({ value: 0, disabled: true }),
        fraisFinancierN: new FormControl(0),
        fraisFinancierN1: new FormControl(0),
        fraisFinancierN2: new FormControl(0),
        fraisFinancierCAN: new FormControl({ value: 0, disabled: true }),
        fraisFinancierCAN1: new FormControl({ value: 0, disabled: true }),
        fraisFinancierCAN2: new FormControl({ value: 0, disabled: true }),
        capaciteAutoFinancementN: new FormControl(0),
        capaciteAutoFinancementN1: new FormControl(0),
        capaciteAutoFinancementN2: new FormControl(0),
        totalTresorerieActifN: new FormControl(0),
        totalTresorerieActifN1: new FormControl(0),
        totalTresorerieActifN2: new FormControl(0),
        capaciteRemboursement: new FormControl({ value: 0, disabled: true }),
        capaciteRemboursement1: new FormControl({ value: 0, disabled: true }),
        capaciteRemboursement2: new FormControl({ value: 0, disabled: true }),
      }),
      step2Group: new FormGroup({
        resultatNetN: new FormControl(0),
        resultatNetN1: new FormControl(0),
        resultatNetN2: new FormControl(0),
        rentabiliteCapitauxPropreN: new FormControl({ value: 0, disabled: true }),
        rentabiliteCapitauxPropreN1: new FormControl({ value: 0, disabled: true }),
        rentabiliteCapitauxPropreN2: new FormControl({ value: 0, disabled: true }),
        exedentBrutExploitationN: new FormControl(0),
        exedentBrutExploitationN1: new FormControl(0),
        exedentBrutExploitationN2: new FormControl(0),
        ebecaN: new FormControl({ value: 0, disabled: true }),
        ebecaN1: new FormControl({ value: 0, disabled: true }),
        ebecaN2: new FormControl({ value: 0, disabled: true }),
        rentabiliteN: new FormControl({ value: 0, disabled: true }),
        rentabiliteN1: new FormControl({ value: 0, disabled: true }),
        rentabiliteN2: new FormControl({ value: 0, disabled: true }),
        cacfgNaN: new FormControl({ value: 0, disabled: true }),
        cacfgNaN1: new FormControl({ value: 0, disabled: true }),
        cacfgNaN2: new FormControl({ value: 0, disabled: true }),
        actifCirculantN: new FormControl(0),
        actifCirculantN1: new FormControl(0),
        actifCirculantN2: new FormControl(0),
        passifCirculantN: new FormControl(0),
        passifCirculantN1: new FormControl(0),
        passifCirculantN2: new FormControl(0),
        fondRoulementN: new FormControl({ value: 0, disabled: true }),
        fondRoulementN1: new FormControl({ value: 0, disabled: true }),
        fondRoulementN2: new FormControl({ value: 0, disabled: true }),
        fdrActifsN: new FormControl({ value: 0, disabled: true }),
        fdrActifsN1: new FormControl({ value: 0, disabled: true }),
        fdrActifsN2: new FormControl({ value: 0, disabled: true }),
        capitauxPropresActifsN: new FormControl({ value: 0, disabled: true }),
        capitauxPropresActifsN1: new FormControl({ value: 0, disabled: true }),
        capitauxPropresActifsN2: new FormControl({ value: 0, disabled: true }),
        tresorerieNettteN: new FormControl(0),
        tresorerieNettteN1: new FormControl(0),
        tresorerieNettteN2: new FormControl(0),
        tresorerieNetteCaN: new FormControl({ value: 0, disabled: true }),
        tresorerieNetteCaN1: new FormControl({ value: 0, disabled: true }),
        tresorerieNetteCaN2: new FormControl({ value: 0, disabled: true }),
        liquiditeGeneral: new FormControl({ value: 0, disabled: true }),
        liquiditeGeneral1: new FormControl({ value: 0, disabled: true }),
        liquiditeGeneral2: new FormControl({ value: 0, disabled: true }),
      }),
    })
  }

  onSubmit() {

  }

  caculateTotalPassifN() {
    const totalactifN = this.step1Form.controls.step1Group.get('totalactifN')?.value;
    const totalCapitauxPropreN = this.step1Form.controls.step1Group.get('totalCapitauxPropreN')?.value;
    console.log('cv', totalCapitauxPropreN)
    this.step1Form.controls.step1Group.get('totalPassifN')?.setValue(totalactifN - totalCapitauxPropreN)
  }

  caculateTotalPassifN1() {
    const totalactifN1 = this.step1Form.controls.step1Group.get('totalactifN1')?.value;
    const totalCapitauxPropreN1 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN1')?.value;
    this.step1Form.controls.step1Group.get('totalPassifN1')?.setValue(totalactifN1 - totalCapitauxPropreN1)
  }

  caculateTotalPassifN2() {
    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    const totalCapitauxPropreN2 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN2')?.value;
    this.step1Form.controls.step1Group.get('totalPassifN2')?.setValue(totalactifN2 - totalCapitauxPropreN2)
  }

  caculateCroissanceCAN() {
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step1Group.get('croissanceChiffreAffaireN')?.setValue((chiffreAffaireXBN - chiffreAffaireXBN1) / chiffreAffaireXBN1)
  }

  caculateCroissanceCAN1() {
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step1Group.get('croissanceChiffreAffaireN1')?.setValue((chiffreAffaireXBN1 - chiffreAffaireXBN2) / chiffreAffaireXBN2)
  }

  caculateCouvertureDetteBancaireActifsN() {
    const empruntsDetteFinancieresN = this.step1Form.controls.step1Group.get('empruntsDetteFinancieresN')?.value;
    const totalTresoreriePassif = this.step1Form.controls.step1Group.get('totalTresoreriePassif')?.value;

    const totalactifN = this.step1Form.controls.step1Group.get('totalactifN')?.value;
    this.step1Form.controls.step1Group.get('couvertureDetteBancaireActifsN')?.setValue((empruntsDetteFinancieresN + totalTresoreriePassif) / totalactifN)
  }

  caculateCouvertureDetteBancaireActifsN1() {
    const empruntsDetteFinancieresN1 = this.step1Form.controls.step1Group.get('empruntsDetteFinancieresN1')?.value;
    const totalTresoreriePassif1 = this.step1Form.controls.step1Group.get('totalTresoreriePassif1')?.value;

    const totalactifN1 = this.step1Form.controls.step1Group.get('totalactifN1')?.value;
    this.step1Form.controls.step1Group.get('couvertureDetteBancaireActifsN1')?.setValue((empruntsDetteFinancieresN1 + totalTresoreriePassif1) / totalactifN1)
  }

  caculateCouvertureDetteBancaireActifsN2() {
    const empruntsDetteFinancieresN2 = this.step1Form.controls.step1Group.get('empruntsDetteFinancieresN2')?.value;
    const totalTresoreriePassif2 = this.step1Form.controls.step1Group.get('totalTresoreriePassif2')?.value;

    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    this.step1Form.controls.step1Group.get('couvertureDetteBancaireActifsN2')?.setValue((empruntsDetteFinancieresN2 + totalTresoreriePassif2) / totalactifN2)
  }

  caculateFraisFinancierCAN() {
    const fraisFinancierN = this.step1Form.controls.step1Group.get('fraisFinancierN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step1Group.get('fraisFinancierCAN')?.setValue(fraisFinancierN / chiffreAffaireXBN)
  }

  caculateFraisFinancierCAN1() {
    const fraisFinancierN1 = this.step1Form.controls.step1Group.get('fraisFinancierN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step1Group.get('fraisFinancierCAN1')?.setValue(fraisFinancierN1 / chiffreAffaireXBN1)
  }

  caculateFraisFinancierCAN2() {
    const fraisFinancierN2 = this.step1Form.controls.step1Group.get('fraisFinancierN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step1Group.get('fraisFinancierCAN2')?.setValue(fraisFinancierN2 / chiffreAffaireXBN2)
  }

  caculateCapaciteRemboursement() {
    const empruntsDetteFinancieresN = this.step1Form.controls.step1Group.get('empruntsDetteFinancieresN')?.value;
    const capaciteAutoFinancementN = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN')?.value;
    this.step1Form.controls.step1Group.get('capaciteRemboursement')?.setValue(empruntsDetteFinancieresN / capaciteAutoFinancementN)
  }

  caculateCapaciteRemboursement1() {
    const empruntsDetteFinancieresN1 = this.step1Form.controls.step1Group.get('empruntsDetteFinancieresN1')?.value;
    const capaciteAutoFinancementN1 = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN1')?.value;
    this.step1Form.controls.step1Group.get('capaciteRemboursement1')?.setValue(empruntsDetteFinancieresN1 / capaciteAutoFinancementN1)
  }

  caculateCapaciteRemboursement2() {
    const empruntsDetteFinancieresN2 = this.step1Form.controls.step1Group.get('empruntsDetteFinancieresN2')?.value;
    const capaciteAutoFinancementN2 = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN2')?.value;
    this.step1Form.controls.step1Group.get('capaciteRemboursement2')?.setValue(empruntsDetteFinancieresN2 / capaciteAutoFinancementN2)
  }

  caculateRentabiliteCapitauxPropreN() {
    const resultatNetN = this.step1Form.controls.step2Group.get('resultatNetN')?.value;
    const totalCapitauxPropreN = this.step1Form.controls.step1Group.get('totalCapitauxPropreN')?.value;
    this.step1Form.controls.step2Group.get('rentabiliteCapitauxPropreN')?.setValue(resultatNetN / totalCapitauxPropreN)
  }

  caculateRentabiliteCapitauxPropreN1() {
    const resultatNetN1 = this.step1Form.controls.step2Group.get('resultatNetN1')?.value;
    const totalCapitauxPropreN1 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN1')?.value;
    this.step1Form.controls.step2Group.get('rentabiliteCapitauxPropreN1')?.setValue(resultatNetN1 / totalCapitauxPropreN1)
  }

  caculateRentabiliteCapitauxPropreN2() {
    const resultatNetN2 = this.step1Form.controls.step2Group.get('resultatNetN2')?.value;
    const totalCapitauxPropreN2 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN2')?.value;
    this.step1Form.controls.step2Group.get('rentabiliteCapitauxPropreN2')?.setValue(resultatNetN2 / totalCapitauxPropreN2)
  }

  caculateEbecaN() {
    const exedentBrutExploitationN = this.step1Form.controls.step2Group.get('exedentBrutExploitationN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step2Group.get('ebecaN')?.setValue(exedentBrutExploitationN / chiffreAffaireXBN)
  }

  caculateEbecaN1() {
    const exedentBrutExploitationN1 = this.step1Form.controls.step2Group.get('exedentBrutExploitationN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step2Group.get('ebecaN1')?.setValue(exedentBrutExploitationN1 / chiffreAffaireXBN1)
  }

  caculateEbecaN2() {
    const exedentBrutExploitationN2 = this.step1Form.controls.step2Group.get('exedentBrutExploitationN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step2Group.get('ebecaN2')?.setValue(exedentBrutExploitationN2 / chiffreAffaireXBN2)
  }

  caculateRentabiliteN() {
    const resultatNetN = this.step1Form.controls.step2Group.get('resultatNetN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step2Group.get('rentabiliteN')?.setValue(chiffreAffaireXBN / resultatNetN)
  }

  caculateRentabiliteN1() {
    const resultatNetN1 = this.step1Form.controls.step2Group.get('resultatNetN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step2Group.get('rentabiliteN1')?.setValue(chiffreAffaireXBN1 / resultatNetN1)
  }

  caculateRentabiliteN2() {
    const resultatNetN2 = this.step1Form.controls.step2Group.get('resultatNetN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step2Group.get('rentabiliteN2')?.setValue(chiffreAffaireXBN2 / resultatNetN2)
  }

  caculateCacfgNaN() {
    const resultatNetN = this.step1Form.controls.step2Group.get('resultatNetN')?.value;
    const capaciteAutoFinancementN = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN')?.value;
    this.step1Form.controls.step2Group.get('cacfgNaN')?.setValue(capaciteAutoFinancementN / resultatNetN)
  }

  caculateCacfgNaN1() {
    const resultatNetN1 = this.step1Form.controls.step2Group.get('resultatNetN1')?.value;
    const capaciteAutoFinancementN1 = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN1')?.value;
    this.step1Form.controls.step2Group.get('cacfgNaN1')?.setValue(capaciteAutoFinancementN1 / resultatNetN1)
  }

  caculateCacfgNaN2() {
    const resultatNetN2 = this.step1Form.controls.step2Group.get('resultatNetN2')?.value;
    const capaciteAutoFinancementN2 = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN2')?.value;
    this.step1Form.controls.step2Group.get('cacfgNaN2')?.setValue(capaciteAutoFinancementN2 / resultatNetN2)
  }

  caculateFondRoulementN() {
    const actifCirculantN = this.step1Form.controls.step2Group.get('actifCirculantN')?.value;
    const passifCirculantN = this.step1Form.controls.step2Group.get('passifCirculantN')?.value;
    this.step1Form.controls.step2Group.get('fondRoulementN')?.setValue(actifCirculantN - passifCirculantN)
  }

  caculateFondRoulementN1() {
    const actifCirculantN1 = this.step1Form.controls.step2Group.get('actifCirculantN1')?.value;
    const passifCirculantN1 = this.step1Form.controls.step2Group.get('passifCirculantN1')?.value;
    this.step1Form.controls.step2Group.get('fondRoulementN1')?.setValue(actifCirculantN1 - passifCirculantN1)
  }

  caculateFondRoulementN2() {
    const actifCirculantN1 = this.step1Form.controls.step2Group.get('actifCirculantN1')?.value;
    const passifCirculantN2 = this.step1Form.controls.step2Group.get('passifCirculantN2')?.value;
    this.step1Form.controls.step2Group.get('fondRoulementN2')?.setValue(actifCirculantN1 - passifCirculantN2)
  }

  caculateFdrActifsN() {
    const fondRoulementN = this.step1Form.controls.step2Group.get('fondRoulementN')?.value;
    const totalactifN = this.step1Form.controls.step1Group.get('totalactifN')?.value;
    this.step1Form.controls.step2Group.get('fdrActifsN')?.setValue(fondRoulementN / totalactifN)
  }

  caculateFdrActifsN1() {
    const fondRoulementN1 = this.step1Form.controls.step2Group.get('fondRoulementN1')?.value;
    const totalactifN1 = this.step1Form.controls.step1Group.get('totalactifN1')?.value;
    this.step1Form.controls.step2Group.get('fdrActifsN1')?.setValue(fondRoulementN1 / totalactifN1)
  }

  caculateFdrActifsN2() {
    const fondRoulementN2 = this.step1Form.controls.step2Group.get('fondRoulementN2')?.value;
    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    this.step1Form.controls.step2Group.get('fdrActifsN2')?.setValue(fondRoulementN2 / totalactifN2)
  }

  caculateCapitauxPropresActifsN() {
    const totalCapitauxPropreN = this.step1Form.controls.step2Group.get('totalCapitauxPropreN')?.value;
    const totalactifN = this.step1Form.controls.step1Group.get('totalactifN')?.value;
    this.step1Form.controls.step2Group.get('capitauxPropresActifsN')?.setValue(totalCapitauxPropreN / totalactifN)
  }

  caculateCapitauxPropresActifsN1() {
    const totalCapitauxPropreN1 = this.step1Form.controls.step2Group.get('totalCapitauxPropreN1')?.value;
    const totalactifN1 = this.step1Form.controls.step1Group.get('totalactifN1')?.value;
    this.step1Form.controls.step2Group.get('capitauxPropresActifsN1')?.setValue(totalCapitauxPropreN1 / totalactifN1)
  }
  caculateCapitauxPropresActifsN2() {
    const totalCapitauxPropreN2 = this.step1Form.controls.step2Group.get('totalCapitauxPropreN2')?.value;
    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    this.step1Form.controls.step2Group.get('capitauxPropresActifsN2')?.setValue(totalCapitauxPropreN2 / totalactifN2)
  }

  caculateTresorerieNetteCaN() {
    const tresorerieNettteN = this.step1Form.controls.step2Group.get('tresorerieNettteN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step2Group.get('tresorerieNetteCaN')?.setValue(tresorerieNettteN / chiffreAffaireXBN)
  }

  caculateTresorerieNetteCaN1() {
    const tresorerieNettteN1 = this.step1Form.controls.step2Group.get('tresorerieNettteN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step2Group.get('tresorerieNetteCaN1')?.setValue(tresorerieNettteN1 / chiffreAffaireXBN1)
  }

  caculateTresorerieNetteCaN2() {
    const tresorerieNettteN2 = this.step1Form.controls.step2Group.get('tresorerieNettteN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step2Group.get('tresorerieNetteCaN2')?.setValue(tresorerieNettteN2 / chiffreAffaireXBN2)
  }

  caculateLiquiditeGeneral() {
    const actifCirculantN = this.step1Form.controls.step2Group.get('actifCirculantN')?.value;
    const totalTresorerieActifN = this.step1Form.controls.step2Group.get('totalTresorerieActifN')?.value;
    const passifCirculantN = this.step1Form.controls.step2Group.get('passifCirculantN')?.value;
    const totalTresoreriePassif = this.step1Form.controls.step1Group.get('totalTresoreriePassif')?.value;
    this.step1Form.controls.step2Group.get('liquiditeGeneral')?.setValue((actifCirculantN + totalTresorerieActifN) / (passifCirculantN + totalTresoreriePassif))
  }

  caculateLiquiditeGeneral1() {
    const actifCirculantN1 = this.step1Form.controls.step2Group.get('actifCirculantN1')?.value;
    const totalTresorerieActifN1 = this.step1Form.controls.step2Group.get('totalTresorerieActifN1')?.value;
    const passifCirculantN1 = this.step1Form.controls.step2Group.get('passifCirculantN1')?.value;
    const totalTresoreriePassif1 = this.step1Form.controls.step1Group.get('totalTresoreriePassif1')?.value;
    this.step1Form.controls.step2Group.get('liquiditeGeneral')?.setValue((actifCirculantN1 + totalTresorerieActifN1) / (passifCirculantN1 + totalTresoreriePassif1))
  }

  caculateLiquiditeGeneral2() {
    const actifCirculantN2 = this.step1Form.controls.step2Group.get('actifCirculantN2')?.value;
    const totalTresorerieActifN2 = this.step1Form.controls.step2Group.get('totalTresorerieActifN2')?.value;
    const passifCirculantN2 = this.step1Form.controls.step2Group.get('passifCirculantN2')?.value;
    const totalTresoreriePassif = this.step1Form.controls.step1Group.get('totalTresoreriePassif')?.value;
    this.step1Form.controls.step2Group.get('liquiditeGeneral')?.setValue((actifCirculantN2 + totalTresorerieActifN2) / (passifCirculantN2 + totalTresoreriePassif))
  }

  goToCreditScoringView() {
    this.calculateNote();
    this.router.navigate(['/credit-scoring', ]);
  }

  caculateCANote(ca: any) {
    switch (ca) {
      case 0 <= ca && ca <= 250000000:
        return 25 * 0.075
      case 250000000 <= ca && ca < 500000000:
        return 50 * 0.075
      case 500000000 <= ca && ca <= 100000000:
        return 75 * 0.075
      case ca > 100000000:
        return 100 * 0.075
      default:
        return 0
    }
  }

  caculateCroissanceCANote(cca: any) {
    switch (cca) {
      case cca < 1:
        return 25 * 0.05
      case 1 <= cca && cca < 5:
        return 50 * 0.05
      case 5 <= cca && cca <= 10:
        return 75 * 0.05
      case cca > 10:
        return 100 * 0.05
      default:
        return 0
    }
  }

  caculateRentabiliteCapitauxPropreNote(rentCap: any) {
    switch (rentCap) {
      case rentCap < 15:
        return 25 * 0.1
      case 15 <= rentCap && rentCap < 20:
        return 50 * 0.1
      case 20 <= rentCap && rentCap <= 25:
        return 75 * 0.1
      case rentCap > 25:
        return 100 * 0.1
      default:
        return 0
    }
  }

  caculateEbeCaNote(ebeca: any) {
    switch (ebeca) {
      case ebeca < 10:
        return 25 * 0.5
      case 10 <= ebeca && ebeca < 15:
        return 50 * 0.5
      case 15 <= ebeca && ebeca <= 20:
        return 75 * 0.5
      case ebeca > 20:
        return 100 * 0.5
      default:
        return 0
    }
  }

  caculateCafgCaNote(cafgca: any) {
    switch (cafgca) {
      case 0 <= cafgca && cafgca < 2.5:
        return 25 * 0.125
      case 2.5 <= cafgca && cafgca < 5:
        return 50 * 0.125
      case 5 <= cafgca && cafgca <= 10:
        return 75 * 0.125
      case cafgca > 10:
        return 100 * 0.125
      default:
        return 0
    }
  }

  caculateCapaciteRembourserNote(capRemb: any) {
    switch (capRemb) {
      case capRemb < 2:
        return 100 * 0.125
      case 2 >= capRemb && capRemb < 3:
        return 75 * 0.125
      case 3 >= capRemb && capRemb <= 4:
        return 50 * 0.125
      case capRemb > 4:
        return 25 * 0.125
      default:
        return 0
    }
  }

  caculateCapitauxPropreActifNote(cpa: any) {
    switch (cpa) {
      case 20 > cpa:
        return 25 * 0.17
      case 20 <= cpa && cpa < 25:
        return 50 * 0.17
      case 25 <= cpa && cpa <= 30:
        return 75 * 0.17
      case cpa > 30:
        return 100 * 0.17
      default:
        return 0
    }
  }

  caculateRentabiliteNote(renta: any) {
    switch (renta) {
      case 0 > renta:
        return 25 * 0.125
      case 0 <= renta && renta < 5:
        return 50 * 0.125
      case 5 <= renta && renta <= 10:
        return 75 * 0.125
      case renta > 10:
        return 100 * 0.125
      default:
        return 0
    }
  }

  caculateFraisFinancieNote(fraisFin: any) {
    switch (fraisFin) {
      case 15 < fraisFin:
        return 25 * 0.05
      case 15 >= fraisFin && fraisFin < 10:
        return 50 * 0.05
      case 10 >= fraisFin && fraisFin <= 5:
        return 75 * 0.05
      case fraisFin > 5:
        return 100 * 0.05
      default:
        return 0
    }
  }

  caculateLiquiditeGeneraleNote(liquidGen: any) {
    switch (liquidGen) {
      case 1 > liquidGen:
        return 25 * 0.13
      case 1 <= liquidGen && liquidGen < 1.5:
        return 50 * 0.13
      case 1.5 >= liquidGen && liquidGen <= 2:
        return 75 * 0.13
      case liquidGen > 2:
        return 100 * 0.13
      default:
        return 0
    }
  }

  caculateExperiencePromoterCooperativeNote(expProm: any) {
    switch (expProm) {
      case 3 > expProm:
        return 25 * 0.25
      case 3 <= expProm && expProm < 5:
        return 50 * 0.25
      case 5 >= expProm && expProm <= 10:
        return 75 * 0.25
      case expProm > 10:
        return 100 * 0.25
      default:
        return 0
    }
  }

  caculateAnneExistenceNote(anExist: any) {
    switch (anExist) {
      case 3 > anExist:
        return 25 * 0.50
      case 3 <= anExist && anExist < 5:
        return 50 * 0.50
      case 5 >= anExist && anExist <= 10:
        return 75 * 0.50
      case anExist > 10:
        return 100 * 0.50
      default:
        return 0
    }
  }

  caculateExpGerantNote(expGerant: any) {
    switch (expGerant) {
      case 3 > expGerant:
        return 25 * 0.25
      case 3 <= expGerant && expGerant < 5:
        return 50 * 0.25
      case 5 >= expGerant && expGerant <= 10:
        return 75 * 0.25
      case expGerant > 10:
        return 100 * 0.25
      default:
        return 0
    }
  }



}
