import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { Connect, Query } from '../config/mysql';
import { executeSQLCommand } from './shared/executeCommand';

const NAMESPACE = 'utilisateur';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting utilisateurs');

    if(!req.body){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le put, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const mdp : string = req.body.password;
    const mail : string = req.body.email;
    const pseudo : string = req.body.pseudo;
    const role_utilisateur_id: number = req.body.role_utilisateur_id || 0;
    

    // if(mdp.length < 8 || mail.length < 4){
    //     res.status(400);
    //     res.send("le mail ou mdp sont trop court pour être vraiment utile.");
    //     return;
    // }
    console.log(req.body);
    console.log(mdp, mail, pseudo, role_utilisateur_id);
    let query = `INSERT INTO utilisateur (mdp, mail, role_utilisateur_id,pseudo) VALUES ("${mdp}", "${mail}", ${role_utilisateur_id}, "${pseudo}")`;
    console.log(query);
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'user created: ');
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all users.');

    let query = 'SELECT * FROM utilisateur';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved users: ');
};

const getOneUserById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    if(!req.params.idUser){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'utilisateur");
        return;
    }
    const query = `SELECT * FROM utilisateur WHERE utilisateur.utilisateur_id = ${req.params.idUser}`;

    
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
    const isInt : RegExp = new RegExp("[0-9]*")
    if(!req.params || !req.body || !req.params.idUser || !isInt.test(req.params.idUser)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'utilisateur`); //\n req.params.idUser = ${req.params.idUser}
        return;
    }
    
    const mdp : string = req.body.mdp;
    const mail : string = req.body.mail;
    const isMail : RegExp = new RegExp(`(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))`)
    if(!isMail.test(mail) && mdp.length < 8 ){
        res.status(400);
        res.send("le nouveau mail n'est pas au bon format ou le mot de passe n'est pas assez long");
        return;
    }
    let query = `UPDATE utilisateur SET `;
    if(mail){
        if(mdp){
            query += `mdp = "${mdp}", mail = "${mail}" `
        }
        else{
            query+= `mail = "${mail}" `;
        }
    }
    else if (mdp){
        query += `mdp = "${mdp}" `;
    }
    else{
        res.status(400);
        res.send("veuillez envoyer un mdp et un mail dans l'update pour mettre a jour l'utilisateur.");
        return;
    }
    query += `WHERE utilisateur.utilisateur_id = ${req.params.idUser}`
    
    logging.info(NAMESPACE,"ma query = ", query);

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'updating users: ');
};

const deleteOneUserById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one user by id.');
    if(!req.params.idUser){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'utilisateur");
        return;
    }
    const query = `DELETE * FROM utilisateur WHERE utilisateur.utilisateur_id = ${req.params.idUser}`;

    
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
