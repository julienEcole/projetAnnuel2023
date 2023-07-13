import IRoleUser from "./roleUtilisateur";

export default interface IUser {
    utilisateur_id?: number;
    password: string;
    email: string;
    role_utilisateur: IRoleUser | number;
    pseudo: string; // Ajoutez la propriété 'pseudo'
  }