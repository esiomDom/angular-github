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
import { Ville, Commune } from 'src/app/libs/onboarding-domain/entities/localisation';



@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.scss']
})
export class KycComponent implements OnInit {
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
    // await this.initStep2Form()
    await this.initStep1Form()
    await this.addEntrepot()
    await this.addActionnaires()
    await this.addResponsable()
    await this.getCurrentKyc();
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
        capitalSocial: new FormControl(''),
        assuranceEntite: new FormControl(''),
        valeurNetteComptable: new FormControl(''),
        informationProduteurs: new FormControl(''),
        informationsClients: new FormControl(''),
        modaliteDesPaiementAchatPRoducteurs: new FormControl(''),
        modaliteDesPaiementProduitsClients: new FormControl(''),
        tonnageTotalRealiseDerniereCampagne: new FormControl(''),
        planDeCampagnePrevisionel: new FormControl(''),
        LettreIntentionContractAchat: new FormControl(''),
        BonExecution: new FormControl(''),
        typeDemandeCredit: new FormControl(''),
        MontantDemandeCredit: new FormControl(''),
        garantieFournies: new FormControl(''),
        DureeFaciliteCredit: new FormControl(),
        etatFinancierSurDeuxAns: new FormControl(''),
        budgetPrevisionelCompteExploitationPrevisionel: new FormControl(''),
        dispositionCompteBancaire: new FormControl(''),
        informationEngagementOuPretsContracteActuel: new FormControl(''),

      }),
      step2Group: new FormGroup({
        capitauxPropreNMoinUn: new FormControl(''),
        capitauxPropreN: new FormControl(''),
        detteFinanciereNMoinsUn: new FormControl(''),
        detteFinanciereN: new FormControl(''),
        actifCirculantNMoinsUn: new FormControl(''),
        actifCirculantN: new FormControl(''),
        passifCirculantNMoinsUn: new FormControl(''),
        passifCirculantN: new FormControl(''),
        capitauxPermanentNMoinsUn: new FormControl(''),
        capitauxPermanentN: new FormControl(''),
        actifImmobiliseNMoinsUn: new FormControl(''),
        actifImmobiliseN: new FormControl(''),
        chiffreAffaireHTActiviteNMoinsUn: new FormControl(''),
        chiffreAffaireHTActiviteN: new FormControl(''),
        resultatNetNMoinsUn: new FormControl(''),
        resultatNetN: new FormControl(''),
        chiffreAffaireHTRentabiliteNMoinsUn: new FormControl(''),
        chiffreAffaireHTRentabiliteN: new FormControl(''),
        margeComercialeNMoinsUn: new FormControl(''),
        margeComercialeN: new FormControl(''),
        chiffreAffaireHTMargeNMoinsUn: new FormControl(''),
        chiffreAffaireHTMargeN: new FormControl(''),
        stockMoyenExerciceNMoinsUn: new FormControl(''),
        stockMoyenExerciceN: new FormControl(''),
        achatConsommeExerciceNMoinsUn: new FormControl(''),
        achatConsommeExerciceN: new FormControl(''),
        creanceClientNMoinsUn: new FormControl(''),
        creanceClientN: new FormControl(''),
        venteTTCNMoinsUn: new FormControl(''),
        VenteTTCN: new FormControl(''),
        dettesFournisseursNMoins: new FormControl(''),
        dettesFournisseursN: new FormControl(''),
        achatTTCNMoinsUn: new FormControl(''),
        achatTTCN: new FormControl(''),
        endettementNMoinsUn: new FormControl(''),
        endettementN: new FormControl(''),
        capaciteAutotFinancementNMoinsUn: new FormControl(''),
        capaciteAutotFinancementN: new FormControl(''),
        resultatNetRentabiliteCapitauxPropreNMoinsUn: new FormControl(''),
        resultatNetRentabiliteCapitauxPropreN: new FormControl(''),
        capitauxPropreRentabiliteNMoinsUn: new FormControl(''),
        capitauxPropreRentabiliteN: new FormControl(''),


      }),
      step3Group: new FormGroup({
        fondRoulement: new FormControl(''),
        beneficeNonReparti: new FormControl(''),
        beneficeAvantInteretImpot: new FormControl(''),
        valeurComptableCapitauxPropres: new FormControl(''),
        totalActifs: new FormControl(''),
        totalPassifs: new FormControl(''),
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
      this.formCompleted = true;
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

  goToCreditScoring() {
    this.router.navigate(['/credit-scoring']);
  }


}
