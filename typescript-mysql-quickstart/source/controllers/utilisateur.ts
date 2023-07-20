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
    const mdp : string = req.body.mdp;
    const mail : string = req.body.mail;
    const prenom:string = req.body.prenom;
    const nom:string = req.body.nom;
    const telephone:string =req.body.telephone;
    const role_utilisateur_id:number = req.body.role_utilisateur_id

    const isNumber : RegExp = new RegExp("^(?:(?:\+|0)\d{1,3}\s?)?(?:\d{2}\s?){4}\d{2}$")
    const isMail : RegExp = new RegExp(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
    const passwordRegex : RegExp = new RegExp(`/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z]).{8,}$/`) ;
    if(telephone &&!isNumber.test(telephone)){
        res.status(400);
        res.send("le numero de telephone n'est pas correct, veuillez en choisir un correct.");
        return;
    }
    if(!isMail.test(mail)){
        res.status(400);
        res.send("mail n'est pas correct , veuillez en choisir un correct.");
        return;
    }
    if(!passwordRegex.test(mdp) ){
        res.status(400);
        res.send("le mot de passe n'est pas assez long (8 caractère minimum dont un minuscule, une majuscule & un caractère spécial)");
        return;
    }
    let query = `INSERT INTO utilisateur (mdp, mail, role_utilisateur_id, prenom, nom, telephone) VALUES ("${SecurityUtils.toSHA512(mdp)}", "${mail}", ${role_utilisateur_id}, "${prenom}", "${nom}", "${telephone}")`;
    
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

const updateOneUserById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'updating one user by id.');
    // const isInt : RegExp = new RegExp("[0-9]*")
    // if(!req.params || !req.body || !req.params.id || !isInt.test(req.params.utilisateur_id)){
    //     res.status(400);
    //     res.send(`erreur, les arguments doivent être le mail ou l'id de l'utilisateur`); //\n req.params.utilisateur_id = ${req.params.utilisateur_id}
    //     return;
    // }
    //ajouter verification que 1 argument soit la au minimum
    
    const utilisateur_id : number = parseInt(req.params.utilisateur_id);

    const mail:string = req.body.mail;
    const mdp : string = req.body.password;
    const adresse : string = req.body.adresse;
    const pseudo : string = req.body.pseudo;
    const prenom:string = req.body.prenom;
    const nom:string = req.body.nom;
    const telephone:string = req.body.telephone;
    const role_utilisateur_id:number = parseInt(req.body.role_utilisateur_id);

    const isNumber : RegExp = new RegExp("^(?:(?:\+|0)\d{1,3}\s?)?(?:\d{2}\s?){4}\d{2}$")
    const isMail : RegExp = new RegExp(`^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`)
    const passwordRegex : RegExp = new RegExp(`/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z]).{8,}$/`) ;
    if(!isNumber.test(telephone)){
        res.status(400);
        res.send("le numero de telephone n'est pas correct, veuillez en choisir un correct.");
        return;
    }
    if(!isMail.test(mail)){
        res.status(400);
        res.send("mail n'est pas correct , veuillez en choisir un correct.");
        return;
    }
    if(!passwordRegex.test(mdp) ){
        res.status(400);
        res.send("le mot de passe n'est pas assez long (8 caractère minimum dont un minuscule, une majuscule & un caractère spécial)");
        return;
    }
    
    
    let query = `UPDATE utilisateur SET `
    if(mail){    //ne surtout pas enlever espace avant virgule!!
        query += `mail = \"${mail}\" ,`
    }
    if(mdp){
        query += `mdp = \"${SecurityUtils.toSHA512(mdp)}\" ,`
    }
    if(adresse){
        query += `adresse = ${adresse} ,`
    }
    if(prenom){
        query += `prenom = \"${prenom}\" ,`
    }
    if(pseudo){
        query += `pseudo = \"${pseudo}\" ,`
    }
    if(nom){
        query += `nom = \"${nom}\" ,`
    }
    if(telephone){
        query += `telephone = "${telephone}" ,`
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
    const query = `DELETE FROM utilisateur WHERE utilisateur_id = ${req.params.utilisateur_id}`;


    
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
