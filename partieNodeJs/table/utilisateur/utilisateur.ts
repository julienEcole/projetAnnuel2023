import { TableBasic } from "../tableBasic";
import { RoleUtilisateur } from "./roleUtilisateur";

export interface utilisateur extends TableBasic{
    pseudo:string;
    mdp:string;
    mail:string;
    role:RoleUtilisateur;
}