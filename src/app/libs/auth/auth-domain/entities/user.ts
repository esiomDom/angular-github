
export enum Role {
  Admin,
  Editeur
}

export interface User {
  nomPrenom: string;
  telephone: string;
  position: string;
  role: Role;
}
