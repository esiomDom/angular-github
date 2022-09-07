import { Member } from './Actionnaire';
import { Customer } from "./customer";
import { Files } from "./files";
import { Localisation } from "./localisation";
import { Entrepot } from "./Entrepot";

export enum FiliereIntervention {
  cacao,
  karite,
  hevea,
  cajout
}

export enum StatutJuridique {
  sarl,
  sa,
  snc,
  scs,
  coop,
  ca,
  scoops,
  gie
}



export interface Kyc {
  customer: Customer;
  abreviation: string;
  adresse_postale: string;
  region_implementation: Localisation[];
  siege_social: Localisation;
  site_internet: string;
  filier_intervention: FiliereIntervention[];
  date_creation_entite: string;
  statut_juridique: StatutJuridique;
  capital_social: string;
  dfe: Files;
  rccm: Files;
  license_exploitation: string[];
  certificats: string[];
  actionnaires: Member[];
  respoinsable: Member[];
  organigramme: string;
  entrepots: Entrepot[];
}
