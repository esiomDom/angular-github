import { Member } from './Actionnaire';
import { Customer } from "./customer";
import { Files } from "./files";
import { Localisation } from "./localisation";
import { Entrepot } from "./Entrepot";

export enum TypeEntite {
  cooperative = "cooperative",
  exportateur = "exportateur",
  transformateur = "transformateur",
}

export enum FiliereIntervention {
  cacao = "Cacao",
  karite = "Karité",
  hevea = "Hévéa",
  cajou = "Cajou"
}

export enum StatutJuridique {
  sarl = "SARL",
  sa = "SA",
  snc = "SNC",
  scs = 'SCS',
  coop = 'COOP',
  ca = 'CA',
  scoops = 'SCOOPS',
  gie = 'GIE'
}



export interface Kyc {
  type_entity: TypeEntite;
  denomination: string;
  customer: Customer;
  abreviation: string;
  adresse_postale: string;
  region_implantation: Localisation[];
  siege_social: Localisation;
  site_internet: string;
  filiere_intervention: FiliereIntervention[];
  date_creation_entite: string;
  statut_juridique: StatutJuridique;
  capital_social: number;
  dfe: Files;
  rccm: Files;
  licence_exploitation: string[];
  certificats: string[];
  actionnaires: Member[];
  responsables: Member[];
  organigramme: string;
  entrepots: Entrepot[];
}
