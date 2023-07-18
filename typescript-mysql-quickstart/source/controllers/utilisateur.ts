import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { executeSQLCommand } from './shared/executeCommand';
import { SecurityUtils } from './shared/SecurityUtils';

const NAMESPACE = 'utilisateur';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting utilisateurs');

    if(!req.body && (!req.body.mdp || !req.body.mail || !req.body.prenom || !req.body.nom || !req.body.role_utilisateur_id)){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    //const atelier_id : number = req.body.atelier_id;
    const mdp : string = SecurityUtils.toSHA512(req.body.mdp);
    const mail : string = req.body.mail;
    const prenom:string = req.body.prenom;
    const nom:string = req.body.nom;
    const role_utilisateur_id:number = req.body.role_utilisateur_id

    if(mdp.length < 8 || mail.length < 4){
        res.status(400);
        res.send("le mail ou mdp sont trop court pour être vraiment utile.");
        return;
    }
    let query = `INSERT INTO utilisateur (mdp, mail, role_utilisateur_id, prenom, nom) VALUES ("${mdp}", "${mail}", ${role_utilisateur_id}, "${prenom}", "${nom}")`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'user created: ');
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all users.');

    let query = 'SELECT * FROM utilisateur';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved users: ');
};

const getOneUserById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    // console.log()
    const userId : number = parseInt(req.params.utilisateur_id);
    if(!userId){
        res.status(400);
        res.send("");
        return;
    }
    const query = `SELECT * FROM utilisateur WHERE utilisateur.utilisateur_id = ${userId}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user: ');
};

const getOneUserByMail = async (req: Request<{ mailUser: string}>, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    if(!(req.params && req.params.mailUser && typeof req.params.mailUser === "string")){
        res.status(400);
        res.send("erreur, les arguments doivent être le mail de l'utilisateur");
        return;
    }
    const query = `SELECT * FROM utilisateur WHERE utilisateur.mail = '${req.params.mailUser}'`;
    logging.info(NAMESPACE,"ma query = ", query);

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user: ');
};


// CREATE TABLE IF NOT EXISTS utilisateur (
//     utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     mdp TEXT NOT NULL,
//     mail VARCHAR(255) NOT NULL UNIQUE,
//     prenom TEXT,
//     nom TEXT,
//     role_utilisateur_id INT NOT NULL REFERENCES role_utilisateur(role_utilisateur_id)
// );

const updateOneUserById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'updating one user by id.');
    const isInt : RegExp = new RegExp("[0-9]*")
    if(!req.params || !req.body || !req.params.utilisateur_id || !isInt.test(req.params.utilisateur_id)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'utilisateur`); //\n req.params.utilisateur_id = ${req.params.utilisateur_id}
        return;
    }
    //ajouter verification que 1 argument soit la au minimum
    
    const utilisateur_id : number = parseInt(req.params.utilisateur_id);
    const mail:string = req.body.mail;
    const mdp : string = SecurityUtils.toSHA512(req.body.mdp);
    const adresse : string = req.body.adresse;
    const prenom:string = req.body.prenom;
    const nom:string = req.body.nom;
    const role_utilisateur_id:number = parseInt(req.body.role_utilisateur_id);
    const isMail : RegExp = new RegExp(`(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))`)
    if(!isMail.test(mail) && mdp.length < 8 ){
        res.status(400);
        res.send("le nouveau mail n'est pas au bon format ou le mot de passe n'est pas assez long (8 caractère minimum)");
        return;
    }
    
    
    let query = `UPDATE utilisateur SET `
    if(mail){    //ne surtout pas enlever espace avant virgule!!
        query += `mail = \'${mail}\' ,`
    }
    if(mdp){
        query += `mdp = \"${mdp}\" ,`
    }
    if(adresse){
        query += `adresse = \"${adresse}\" ,`
    }
    if(prenom){
        query += `prenom = "${prenom}" ,`
    }
    if(nom){
        query += `nom = "${nom}" ,`
    }
    if(role_utilisateur_id){
        query += `role_utilisateur_id = ${role_utilisateur_id} `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE utilisateur_id = ${utilisateur_id}`
    
    logging.info(NAMESPACE,"ma query = ", query);

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'updating users: ');
};

const deleteOneUserById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    if(!req.params.utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'utilisateur");
        return;
    }
    const query = `DELETE FROM utilisateur WHERE utilisateur.utilisateur_id = ${req.params.utilisateur_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'deleted users: ');
};

const deleteOneUserByMail = async (req: Request<{ mailUser: string}>, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    if(!(req.params && req.params.mailUser && typeof req.params.mailUser === "string")){
        res.status(400);
        res.send("erreur, les arguments doivent être le mail de l'utilisateur");
        return;
    }
    const query = `DELETE * FROM utilisateur WHERE utilisateur.mail = '${req.params.mailUser}'`;
    logging.info(NAMESPACE,"ma query = ", query);

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'deleted users: ');
};

export default { createUser, getAllUsers, getOneUserById, getOneUserByMail,updateOneUserById, deleteOneUserById, deleteOneUserByMail };
