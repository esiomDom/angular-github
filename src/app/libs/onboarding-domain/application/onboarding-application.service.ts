import { Injectable } from '@angular/core';
import { FiliereIntervention, Kyc, StatutJuridique, TypeEntite } from '../entities/kyc';
import { Commune, Ville } from '../entities/localisation';
import { OnboardingService } from '../infrastructure/onboarding.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingApplicationService {

  constructor(private onboardingService: OnboardingService) { }

  private generateSampleKycPayload(): Kyc {
    return {
      "type_entity": TypeEntite.cooperative,
      "customer": {
        "raison_social": "string",
        "email": "user@example.com",
        "numero": "string"
      },
      "abreviation": "string",
      "adresse_postale": "string",
      "region_implantation": [
        {
          "ville": Ville.abidjan,
          "commune": Commune.cocody,
          "details": "string"
        }
      ],
      "siege_social": {
        "ville": Ville.abidjan,
        "commune": Commune.cocody,
        "details": "string"
      },
      "site_internet": "string",
      "filiere_intervention": [
        FiliereIntervention.cacao
      ],
      "date_creation_entite": "string",
      "statut_juridique": StatutJuridique.sarl,
      "capital_social": 0,
      "dfe": {
        "numero": "string",
        "file": "http://0.0.0.0:9003/docs"
      },
      "rccm": {
        "numero": "string",
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
          "nom_prenom": "string",
          "telephone": "string",
          "pourcentage": 0,
          "date_prise_position": "2022-09-07T14:32:48.803Z"
        }
      ],
      "responsables": [
        {
          "nom_prenom": "string",
          "telephone": "string",
          "position": "string",
          "date_prise_position": "2022-09-07T14:32:48.803Z"
        }
      ],
      "organigramme": "http://0.0.0.0:9003/docs",
      "entrepots": [
        {
          "capacite": 0,
          "localisation": {
            "ville": Ville.abidjan,
            "commune": Commune.cocody,
            "details": "string"
          }
        }
      ]
    }
  }

  createUserKyc() {
    const payload = this.generateSampleKycPayload();
    this.onboardingService.createSampleKyc(payload).subscribe((res) => {
      console.log('data res', res);
      localStorage.setItem('kyc', res.data);
    })
  }
}
