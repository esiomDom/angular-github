export enum Ville {
  abidjan = 'abidjan'
}

export enum Commune {
  cocody = 'cocody'
}

export interface Localisation {
  ville: Ville;
  commune: Commune;
  details: string;
}
