import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//critique = nom de la table

// CREATE TABLE IF NOT EXISTS critique (
//     critique_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     `message` TEXT NOT NULL,
//     note INT
// );

const NAMESPACE = 'critique';

const getAllCritique = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all critique.');

    let query = 'SELECT * FROM critique';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved critique: ');
};

const createCritique = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting critique');

    if(!req.body || !req.body.note || !req.body.message){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    //const critique_id : number = req.body.critique_id;
    const note:number = req.body.note;
    const message : string = req.body.message;

    let query = `INSERT INTO critique (message, note) VALUES ("${message}", ${note})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'critique created: ');
};

const getOneCritiqueById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one critique by id.');
    if(!req.params.idCritique){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du critique");
        return;
    }
    const query = `SELECT * FROM critique WHERE critique.critique_id = ${req.params.idCritique}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved critique : ');
};

const updateOneCritiqueById = async (req: Request, res: Response, next: NextFunction) => {   //TOVERIFY
    logging.info(NAMESPACE, 'updating one critique by id.');
    const isInt : RegExp = new RegExp("[0-9]+$")
    if(!req.params || !req.body || !req.params.idCritique || !isInt.test(req.params.idCritique)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'critique`); //\n req.params.idCritique = ${req.params.idCritique}
        return;
    }
    
    const critique_id : number = parseInt(req.params.idCritique);
    const note:number = req.body.note;
    const message : string = req.body.message;
    let query = `UPDATE critique SET `
    if(critique_id){    //ne surtout pas enlever espace avant virgule!!
        query += `critique_id = ${critique_id} ,`
    }
    // if(utilisateur_id){
    //     query += `utilisateur_id = ${utilisateur_id} ,`
    // }
    if(note){
        query += `note = \"${note}\" ,`
    }
    if(message){
        query += `message = "${message}" `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE critique.critique_id = ${critique_id}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating critiques: ");
};

const DeleteOneCritiqueById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one critique by id.');
    if(!req.params.idCritique){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'critique");
        return;
    }
    const query = `DELETE * FROM critique WHERE critique.critique_id = ${req.params.idCritique}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete critique : ');
};

export default {getAllCritique, createCritique, getOneCritiqueById, updateOneCritiqueById, DeleteOneCritiqueById}; 