import { TableBasic } from "../tableBasic";

export interface RoleUtilisateur extends TableBasic{
    textDescription?:string;
    titre:string;
}