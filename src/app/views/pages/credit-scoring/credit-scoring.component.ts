import urlList from 'src/app/core/utils/service-list';
import { OnboardingApplicationService } from 'src/app/libs/onboarding-domain/application/onboarding-application.service';
import { Commune, Ville } from '../../../libs/onboarding-domain/entities/localisation';
import { FiliereIntervention, StatutJuridique, TypeEntite } from '../../../libs/onboarding-domain/entities/kyc';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-credit-scoring',
  templateUrl: './credit-scoring.component.html',
  styleUrls: ['./credit-scoring.component.scss']
})
export class CreditScoringComponent implements OnInit {
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


  constructor(public formBuilder: FormBuilder, private onboardingApplicationService: OnboardingApplicationService, private modalService: NgbModal) {

  }

  async ngOnInit() {
    await this.initStep1Form()
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
    this.step1Form.controls.step1Group.get('totalPassifN')?.setValue(totalactifN1 - totalCapitauxPropreN1)
  }

  caculateTotalPassifN2() {
    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    const totalCapitauxPropreN2 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN2')?.value;
    this.step1Form.controls.step1Group.get('totalPassifN')?.setValue(totalactifN2 - totalCapitauxPropreN2)
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
    const resultatNetN = this.step1Form.controls.step1Group.get('resultatNetN')?.value;
    const totalCapitauxPropreN = this.step1Form.controls.step1Group.get('totalCapitauxPropreN')?.value;
    this.step1Form.controls.step1Group.get('rentabiliteCapitauxPropreN')?.setValue(resultatNetN / totalCapitauxPropreN)
  }

  caculateRentabiliteCapitauxPropreN1() {
    const resultatNetN1 = this.step1Form.controls.step1Group.get('resultatNetN1')?.value;
    const totalCapitauxPropreN1 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN1')?.value;
    this.step1Form.controls.step1Group.get('rentabiliteCapitauxPropreN1')?.setValue(resultatNetN1 / totalCapitauxPropreN1)
  }

  caculateRentabiliteCapitauxPropreN2() {
    const resultatNetN2 = this.step1Form.controls.step1Group.get('resultatNetN2')?.value;
    const totalCapitauxPropreN2 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN2')?.value;
    this.step1Form.controls.step1Group.get('rentabiliteCapitauxPropreN2')?.setValue(resultatNetN2 / totalCapitauxPropreN2)
  }

  caculateEbecaN() {
    const exedentBrutExploitationN = this.step1Form.controls.step1Group.get('exedentBrutExploitationN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step1Group.get('ebecaN')?.setValue(exedentBrutExploitationN / chiffreAffaireXBN)
  }

  caculateEbecaN1() {
    const exedentBrutExploitationN1 = this.step1Form.controls.step1Group.get('exedentBrutExploitationN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step1Group.get('ebecaN1')?.setValue(exedentBrutExploitationN1 / chiffreAffaireXBN1)
  }

  caculateEbecaN2() {
    const exedentBrutExploitationN2 = this.step1Form.controls.step1Group.get('exedentBrutExploitationN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step1Group.get('ebecaN2')?.setValue(exedentBrutExploitationN2 / chiffreAffaireXBN2)
  }

  caculateRentabiliteN() {
    const resultatNetN = this.step1Form.controls.step1Group.get('resultatNetN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step1Group.get('rentabiliteN')?.setValue(chiffreAffaireXBN / resultatNetN)
  }

  caculateRentabiliteN1() {
    const resultatNetN1 = this.step1Form.controls.step1Group.get('resultatNetN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step1Group.get('rentabiliteN1')?.setValue(chiffreAffaireXBN1 / resultatNetN1)
  }

  caculateRentabiliteN2() {
    const resultatNetN2 = this.step1Form.controls.step1Group.get('resultatNetN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step1Group.get('rentabiliteN2')?.setValue(chiffreAffaireXBN2 / resultatNetN2)
  }

  caculateCacfgNaN() {
    const resultatNetN = this.step1Form.controls.step1Group.get('resultatNetN')?.value;
    const capaciteAutoFinancementN = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN')?.value;
    this.step1Form.controls.step1Group.get('cacfgNaN')?.setValue(capaciteAutoFinancementN / resultatNetN)
  }

  caculateCacfgNaN1() {
    const resultatNetN1 = this.step1Form.controls.step1Group.get('resultatNetN1')?.value;
    const capaciteAutoFinancementN1 = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN1')?.value;
    this.step1Form.controls.step1Group.get('cacfgNaN1')?.setValue(capaciteAutoFinancementN1 / resultatNetN1)
  }

  caculateCacfgNaN2() {
    const resultatNetN = this.step1Form.controls.step1Group.get('resultatNetN')?.value;
    const capaciteAutoFinancementN2 = this.step1Form.controls.step1Group.get('capaciteAutoFinancementN2')?.value;
    this.step1Form.controls.step1Group.get('cacfgNaN2')?.setValue(capaciteAutoFinancementN2 / resultatNetN)
  }

  caculateFondRoulementN() {
    const actifCirculantN = this.step1Form.controls.step1Group.get('actifCirculantN')?.value;
    const passifCirculantN = this.step1Form.controls.step1Group.get('passifCirculantN')?.value;
    this.step1Form.controls.step1Group.get('fondRoulementN')?.setValue(actifCirculantN - passifCirculantN)
  }

  caculateFondRoulementN1() {
    const actifCirculantN1 = this.step1Form.controls.step1Group.get('actifCirculantN1')?.value;
    const passifCirculantN1 = this.step1Form.controls.step1Group.get('passifCirculantN1')?.value;
    this.step1Form.controls.step1Group.get('fondRoulementN1')?.setValue(actifCirculantN1 - passifCirculantN1)
  }

  caculateFondRoulementN2() {
    const actifCirculantN1 = this.step1Form.controls.step1Group.get('actifCirculantN1')?.value;
    const passifCirculantN2 = this.step1Form.controls.step1Group.get('passifCirculantN2')?.value;
    this.step1Form.controls.step1Group.get('fondRoulementN2')?.setValue(actifCirculantN1 - passifCirculantN2)
  }

  caculateFdrActifsN() {
    const fondRoulementN = this.step1Form.controls.step1Group.get('fondRoulementN')?.value;
    const totalactifN = this.step1Form.controls.step1Group.get('totalactifN')?.value;
    this.step1Form.controls.step1Group.get('fdrActifsN')?.setValue(fondRoulementN / totalactifN)
  }

  caculateFdrActifsN1() {
    const fondRoulementN1 = this.step1Form.controls.step1Group.get('fondRoulementN1')?.value;
    const totalactifN1 = this.step1Form.controls.step1Group.get('totalactifN1')?.value;
    this.step1Form.controls.step1Group.get('fdrActifsN1')?.setValue(fondRoulementN1 / totalactifN1)
  }

  caculateFdrActifsN2() {
    const fondRoulementN2 = this.step1Form.controls.step1Group.get('fondRoulementN2')?.value;
    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    this.step1Form.controls.step1Group.get('fdrActifsN2')?.setValue(fondRoulementN2 / totalactifN2)
  }

  caculateCapitauxPropresActifsN() {
    const totalCapitauxPropreN = this.step1Form.controls.step1Group.get('totalCapitauxPropreN')?.value;
    const totalactifN = this.step1Form.controls.step1Group.get('totalactifN')?.value;
    this.step1Form.controls.step1Group.get('capitauxPropresActifsN')?.setValue(totalCapitauxPropreN / totalactifN)
  }

  caculateCapitauxPropresActifsN1() {
    const totalCapitauxPropreN1 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN1')?.value;
    const totalactifN1 = this.step1Form.controls.step1Group.get('totalactifN1')?.value;
    this.step1Form.controls.step1Group.get('capitauxPropresActifsN1')?.setValue(totalCapitauxPropreN1 / totalactifN1)
  }
  caculateCapitauxPropresActifsN2() {
    const totalCapitauxPropreN2 = this.step1Form.controls.step1Group.get('totalCapitauxPropreN2')?.value;
    const totalactifN2 = this.step1Form.controls.step1Group.get('totalactifN2')?.value;
    this.step1Form.controls.step1Group.get('capitauxPropresActifsN2')?.setValue(totalCapitauxPropreN2 / totalactifN2)
  }

  caculateTresorerieNetteCaN() {
    const tresorerieNettteN = this.step1Form.controls.step1Group.get('tresorerieNettteN')?.value;
    const chiffreAffaireXBN = this.step1Form.controls.step1Group.get('chiffreAffaireXBN')?.value;
    this.step1Form.controls.step1Group.get('tresorerieNetteCaN')?.setValue(tresorerieNettteN / chiffreAffaireXBN)
  }

  caculateTresorerieNetteCaN1() {
    const tresorerieNettteN1 = this.step1Form.controls.step1Group.get('tresorerieNettteN1')?.value;
    const chiffreAffaireXBN1 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN1')?.value;
    this.step1Form.controls.step1Group.get('tresorerieNetteCaN1')?.setValue(tresorerieNettteN1 / chiffreAffaireXBN1)
  }

  caculateTresorerieNetteCaN2() {
    const tresorerieNettteN2 = this.step1Form.controls.step1Group.get('tresorerieNettteN2')?.value;
    const chiffreAffaireXBN2 = this.step1Form.controls.step1Group.get('chiffreAffaireXBN2')?.value;
    this.step1Form.controls.step1Group.get('tresorerieNetteCaN2')?.setValue(tresorerieNettteN2 / chiffreAffaireXBN2)
  }

  caculateLiquiditeGeneral() {
    const actifCirculantN = this.step1Form.controls.step1Group.get('actifCirculantN')?.value;
    const totalTresorerieActifN = this.step1Form.controls.step1Group.get('totalTresorerieActifN')?.value;
    const passifCirculantN = this.step1Form.controls.step1Group.get('passifCirculantN')?.value;
    const totalTresoreriePassif = this.step1Form.controls.step1Group.get('totalTresoreriePassif')?.value;
    this.step1Form.controls.step1Group.get('liquiditeGeneral')?.setValue((actifCirculantN + totalTresorerieActifN) / (passifCirculantN + totalTresoreriePassif))
  }

  caculateLiquiditeGeneral1() {
    const actifCirculantN1 = this.step1Form.controls.step1Group.get('actifCirculantN1')?.value;
    const totalTresorerieActifN1 = this.step1Form.controls.step1Group.get('totalTresorerieActifN1')?.value;
    const passifCirculantN1 = this.step1Form.controls.step1Group.get('passifCirculantN1')?.value;
    const totalTresoreriePassif1 = this.step1Form.controls.step1Group.get('totalTresoreriePassif1')?.value;
    this.step1Form.controls.step1Group.get('liquiditeGeneral')?.setValue((actifCirculantN1 + totalTresorerieActifN1) / (passifCirculantN1 + totalTresoreriePassif1))
  }

  caculateLiquiditeGeneral2() {
    const actifCirculantN2 = this.step1Form.controls.step1Group.get('actifCirculantN2')?.value;
    const totalTresorerieActifN2 = this.step1Form.controls.step1Group.get('totalTresorerieActifN2')?.value;
    const passifCirculantN2 = this.step1Form.controls.step1Group.get('passifCirculantN2')?.value;
    const totalTresoreriePassif = this.step1Form.controls.step1Group.get('totalTresoreriePassif')?.value;
    this.step1Form.controls.step1Group.get('liquiditeGeneral')?.setValue((actifCirculantN2 + totalTresorerieActifN2) / (passifCirculantN2 + totalTresoreriePassif))
  }


}
