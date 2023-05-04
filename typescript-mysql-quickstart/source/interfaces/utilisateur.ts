import IRoleUser from "./roleUtilisateur";

export default interface IUser {
    utilisateur_id: number;
    mdp: string;
    mail: string;
    role_utilisateur: IRoleUser
}
