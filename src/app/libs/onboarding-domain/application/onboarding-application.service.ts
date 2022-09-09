import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FiliereIntervention, Kyc, StatutJuridique, TypeEntite } from '../entities/kyc';
import { Commune, Ville } from '../entities/localisation';
import { OnboardingService } from '../infrastructure/onboarding.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OnboardingApplicationService {

  public kycData = new BehaviorSubject<string>("");
  public uploadedFile = new BehaviorSubject<string>("");


  constructor(private onboardingService: OnboardingService, private router: Router) { }

  private generateSampleKycPayload(): Kyc {
    return {
      "type_entity": TypeEntite.cooperative,
      "denomination": "GIE HEVEA",
      "customer": {
        "raison_social": "GIE HEVEA",
        "email": "gie-hevea@gmail.com",
        "numero": "0707070707"
      },
      "abreviation": "HEVEA",
      "adresse_postale": "Daloa",
      "region_implantation": [
        {
          "ville": Ville.abidjan,
          "commune": Commune.cocody,
          "details": "detail region d'implementation"
        }
      ],
      "siege_social": {
        "ville": Ville.abidjan,
        "commune": Commune.cocody,
        "details": "detail siege social"
      },
      "site_internet": "http://www.giehevea.com",
      "filiere_intervention": [
        FiliereIntervention.hevea
      ],
      "date_creation_entite": "2022-05-27",
      "statut_juridique": StatutJuridique.sarl,
      "capital_social": 20000000,
      "dfe": {
        "numero": "547877978",
        "file": "http://0.0.0.0:9003/docs"
      },
      "rccm": {
        "numero": "547877978",
        "file": "http://0.0.0.0:9003/docs"
      },
      "licence_exploitation": [
        "http://0.0.0.0:9003/docs"
      ],
      "certificats": [
        "http://0.0.0.0:9003/docs"
      ],
      "actionnaires": [
        {
          "nom_prenom": "Seydou Kone",
          "telephone": "07070707070",
          "pourcentage": 75,
          "date_prise_position": "2022-09-07T14:32:48.803Z"
        }
      ],
      "responsables": [
        {
          "nom_prenom": "Meite Ibrahim Stephane",
          "telephone": "0707070707",
          "position": "Chef de projet",
          "date_prise_position": "2022-09-07T14:32:48.803Z"
        }
      ],
      "organigramme": "http://0.0.0.0:9003/docs",
      "status": "http://0.0.0.0:9003/docs",
      "entrepots": [
        {
          "capacite": 8000,
          "localisation": {
            "ville": Ville.abidjan,
            "commune": Commune.cocody,
            "details": "detail entrepots"
          }
        }
      ]
    }
  }

  private parseFromDataToDto(data: any): Kyc {
    return {
      "type_entity": data.step1Group.typeEntite,
      "denomination": data.step1Group.denomination,
      "customer": {
        "raison_social": data.step1Group.raisonSocial,
        "email": data.step1Group.email,
        "numero": data.step1Group.telephone
      },
      "abreviation": data.step1Group.abreviation,
      "adresse_postale": data.step1Group.adressePostal,
      "region_implantation": [
        {
          "ville": data.step1Group.villeRegionImplementation,
          "commune": data.step1Group.communeRegionImplementation,
          "details": data.step1Group.detailRegionImplementation
        }
      ],
      "siege_social": {
        "ville": data.step1Group.villeSiegeSocial,
        "commune": data.step1Group.communeSiegeSocial,
        "details": data.step1Group.detailSiegeSocial
      },
      "site_internet": data.step1Group.siteInternet,
      "filiere_intervention": [...data.step1Group.filiereIntervention],
      "date_creation_entite": data.step1Group.dateCreationEntite,
      "statut_juridique": data.step1Group.statutJuridique[0],
      "capital_social": parseInt(data.step1Group.capitalSocial),
      "dfe": {
        "numero": data.step2Group.numeroDfe,
        "file": data.step2Group.fichierDfe
      },
      "rccm": {
        "numero": data.step2Group.numeroRccm,
        "file": data.step2Group.fichierRccm
      },
      "licence_exploitation": [
        data.step2Group.licenseExploitation
      ],
      "certificats": [
        data.step2Group.certificats
      ],
      "actionnaires": [...data.step3Group.actionnaires.map((actionnaire: any) => this.parseActionnaireFormDataToDtoActionnaireData(actionnaire))],
      "responsables": [...data.step3Group.responsables.map((responsable: any) => this.parseResponsabeFormDataToDtoResponsabeData(responsable))],
      "organigramme": data.step2Group.fichierOrganigramme,
      "status": data.step2Group.fichierStatus,
      "entrepots": [
        ...data.step1Group.entrepots.map((entrepots: any) => this.parseEntrepotFormDataToDtoEntrepotData(entrepots))
      ]
    }
  }
// TODO: this should be update for files so that we can upload multiple files on licence_exploitation and certificats
  private parseFromDtoToFormData(dto: Kyc): any {
    return {
      "step1Group": {
        "typeEntite": dto.type_entity,
        "denomination": dto.denomination,
        "abreviation": dto.abreviation,
        "raisonSocial": dto.customer.raison_social,
        "email": dto.customer.email,
        "telephone": dto.customer.numero,
        "adressePostal": dto.adresse_postale,
        "villeRegionImplementation": dto.region_implantation[0].ville,
        "communeRegionImplementation": dto.region_implantation[0].commune,
        "detailRegionImplementation": dto.region_implantation[0].details,
        "villeSiegeSocial": dto.siege_social.ville,
        "communeSiegeSocial": dto.siege_social.commune,
        "detailSiegeSocial": dto.siege_social.details,
        "siteInternet": dto.site_internet,
        "filiereIntervention": [...dto.filiere_intervention],
        "dateCreationEntite": dto.date_creation_entite,
        "statutJuridique": [dto.statut_juridique],
        "capitalSocial": dto.capital_social.toString(),
        "entrepots": [...dto.entrepots.map((entrepots: any) => {
          return this.parseEntrepotDtoToFormData(entrepots);
        })],
      },
      "step2Group": {
        "numeroDfe": dto.dfe.numero,
        "fichierDfe": dto.dfe.file,
        "numeroRccm": dto.rccm.numero,
        "fichierRccm": dto.rccm.file,
        fichierStatus: dto.status,
        "licenseExploitation": dto.licence_exploitation[0],
        "certificats": dto.certificats[0],
        "fichierOrganigramme": dto.organigramme
      },
      "step3Group": {
        "actionnaires": [...dto.actionnaires.map((actionnaire: any) => this.parseDtoActionnaireDataToActionnaireFormData(actionnaire))],
        "responsables": [...dto.responsables.map((responsable: any) => this.parseDtoResponsabeDataToResponsabeFormData(responsable))]
      }
    }
  }

  private parseDtoActionnaireDataToActionnaireFormData(dto: any): any {
    return {
      nomPrenom: dto.nom_prenom,
      telephone: dto.telephone,
      pourcentage: dto.pourcentage,
      datePrisePosition: this.formatDate(dto.date_prise_position)
    }
  }

  private parseDtoResponsabeDataToResponsabeFormData(dto: any): any {
    return {
      nomPrenom: dto.nom_prenom,
      telephone: dto.telephone,
      position: dto.position,
      datePrisePosition: this.formatDate(dto.date_prise_position)
    }
  }

  private parseActionnaireFormDataToDtoActionnaireData(member: any): any {
    return {
      nom_prenom: member.nomPrenom,
      telephone: member.telephone,
      pourcentage: member.pourcentage,
      date_prise_position: new Date(member.datePrisePosition)
    }
  }

  private parseResponsabeFormDataToDtoResponsabeData(member: any): any {
    return {
      nom_prenom: member.nomPrenom,
      telephone: member.telephone,
      position: member.position,
      date_prise_position: new Date(member.datePrisePosition)
    }
  }


  private parseEntrepotFormDataToDtoEntrepotData(dataEntrepotForm: any): any {
    return {
      capacite: parseInt(dataEntrepotForm.capacite),
      localisation: {
        ville: dataEntrepotForm.ville,
        commune: dataEntrepotForm.commune,
        details: dataEntrepotForm.details
      }
    }
  }

  private formatDate(date:any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  private parseEntrepotDtoToFormData(dto: any): any {
    return {
      capacite: dto.capacite,
      ville: dto.localisation.ville,
      commune: dto.localisation.commune,
      details: dto.localisation.details
    }
  }

  createUserKyc() {
    const payload = this.generateSampleKycPayload();
    this.onboardingService.createSampleKyc(payload).subscribe(async (res) => {

      await localStorage.setItem('kyc', JSON.stringify(res));
      await localStorage.setItem('isLoggedin', 'true');
      if (localStorage.getItem('isLoggedin')) {

       await this.router.navigate(['/']);
      }
    })
  }

  patchKyc(payload: any, id: any) {
    console.log('patch', this.parseFromDataToDto(payload));
    const parsedKyc = this.parseFromDataToDto(payload);
    this.onboardingService.pacthKyc(id, parsedKyc).subscribe((res) => {
      console.log('data res', res);
    });
  }

  getCurrentKyc(id: any) {
    this.onboardingService.getKyc(id).subscribe((res) => {
      const formData = this.parseFromDtoToFormData(res);
      this.kycData.next(formData);
      // localStorage.setItem('currentKycData', JSON.stringify(formData));
    })
  }

  uploadDocument(file: any) {
    this.onboardingService.uploadFile(file).subscribe((res:any) => {
      this.uploadedFile.next(res.filename);
    });
  }
}
