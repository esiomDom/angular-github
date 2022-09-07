
export enum Role {
  Admin = 'Admin',
  Editeur = 'Editeur'
}

export interface User {
  nomPrenom: string;
  telephone: string;
  position: string;
  role: Role;
}
