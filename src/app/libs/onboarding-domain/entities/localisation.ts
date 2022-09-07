export enum Ville {
  Abidjan
}

export enum Commune {
  Cocody
}

export interface Localisation {
  ville: Ville;
  commune: Commune;
  details: string;
}
