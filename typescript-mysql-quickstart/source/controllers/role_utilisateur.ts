import { NextFunction, Request, Response } from 'express';
import logging from '../config/logging';
import { executeSQLCommand } from './shared/executeCommand';

const NAMESPACE = 'role_utilisateur';

const getAllRole_utilisateur = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all role_utilisateur.');

    let query = 'SELECT * FROM role_utilisateur';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved role_utilisateur: ');
};

// CREATE TABLE IF NOT EXISTS role_utilisateur (
//     role_utilisateur_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     titre VARCHAR(255) NOT NULL UNIQUE,
//     `description` TEXT
// );

const createRole_utilisateur = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting role_utilisateur');

    if(!req.body || !req.body.titre || !req.body.description){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le put, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const titre : string = req.body.titre;
    const description : string = req.body.description;

    if(description && description.length < 1){
        res.status(400);
        res.send("la description est trop courte veuillez mettre au moins 1 caractère.");
        return;
    }
    if(!titre){
        res.status(400);
        res.send("le nouveau role doit obligatoirement comporter un titre.");
        return;
    }
    let query = `INSERT INTO role_utilisateur (titre, description) VALUES ( ${titre}, ${description})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'role_utilisateur created: ');
};

const getOneRole_utilisateurById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one role_utilisateur by id.');
    if(!req.params.role_utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du role_utilisateur");
        return;
    }
    const query = `SELECT * FROM role_utilisateur WHERE role_utilisateur.role_utilisateur_id = ${req.params.role_utilisateur_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved role_utilisateur : ');
};

const updateOneRole_utilisateurById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'updating one role_utilisateur by id.');
    const isInt : RegExp = new RegExp("[0-9]+")
    if(!req.params || !req.body || !req.params.role_utilisateur_id || !isInt.test(req.params.role_utilisateur_id)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id du role_utilisateur`); //\n req.params.role_utilisateur_id = ${req.params.role_utilisateur_id}
        return;
    }
    if(!req.body.etat_id && !req.body.urgence_id && !req.body.titre && !req.body.description){
        res.status(400);
        res.send(`erreur, le body doit contenir les informations a mettre a jours`); //\n req.params.role_utilisateur_id = ${req.params.role_utilisateur_id}
        return;
    }
    
    const titre : string = req.body.titre;
    const description : string = req.body.description;
    let query = `UPDATE role_utilisateur SET `
    if(titre){    //ne surtout pas enlever espace avant virgule!!
        query += `titre = "${titre}" ,`
    }
    if(description){
        query += `description = "${description}"  `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE role_utilisateur.role_utilisateur_id = ${parseInt(req.params.role_utilisateur_id)}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating role_utilisateur: ");
};

const DeleteOneRole_utilisateurById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one role_utilisateur by id.');
    if(!req.params.role_utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du role_utilisateur");
        return;
    }
    const query = `DELETE FROM role_utilisateur WHERE role_utilisateur.role_utilisateur_id = ${req.params.role_utilisateur_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete role_utilisateur : ');
};

export default {getAllRole_utilisateur, createRole_utilisateur, getOneRole_utilisateurById, updateOneRole_utilisateurById, DeleteOneRole_utilisateurById};