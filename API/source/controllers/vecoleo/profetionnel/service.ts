import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//service = nom de la table

// CREATE TABLE IF NOT EXISTS service (
//     service_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     prix int NOT NULL,
//     `description` TEXT NOT NULL,
//     titreService TEXT NOT NULL,
//     reparation_type_id INT PRIMARY KEY NOT NULL REFERENCES reparation_type(reparation_type_id)
// );

const NAMESPACE = 'service';

const getAllService = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all service.');

    let query = 'SELECT * FROM service';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved service: ');
};

const createService = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting service');

    if(!req.body || !req.body.etat_id || req.body.prix || !req.body.titreService || !req.body.reparation_type_id || !req.body.description){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    // const service_id : number = req.body.service_id;
    const prix : number = req.body.prix;
    const description : string = req.body.description;
    const titreService:string = req.body.titreService;
    const reparation_type_id:number = req.body.reparation_type_id;

    let query = `INSERT INTO service (prix, description, titreService, reparation_type_id) VALUES ("${prix}", "${description}", "${titreService}", ${reparation_type_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'service created: ');
};

const getOneServiceById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one service by id.');
    if(!req.params.idservice){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du service");
        return;
    }
    const query = `SELECT * FROM service WHERE service.service_id = ${req.params.idservice}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved service : ');
};

const updateOneServiceById = async (req: Request, res: Response, next: NextFunction) => {   //TOVERIFY
    logging.info(NAMESPACE, 'updating one service by id.');
    const isInt : RegExp = new RegExp("[0-9]*")
    if(!req.params || !req.body || (!req.body.prix && !req.body.titreService && !req.body.reparation_type_id && !req.body.description) || !isInt.test(req.params.idservice)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'service`); //\n req.params.idservice = ${req.params.idservice}
        return;
    }
    
    const service_id : number = parseInt(req.params.idservice);
    const prix : number = req.body.prix;
    const description : string = req.body.description;
    const titreService:string = req.body.titreService;
    const reparation_type_id:number = req.body.reparation_type_id;
    let query = `UPDATE service SET `
    if(service_id){    //ne surtout pas enlever espace avant virgule!!
        query += `service_id = ${service_id} ,`
    }
    if(prix){
        query += `prix = ${prix} ,`
    }
    if(description){
        query += `description = "${description}" ,`
    }
    if(titreService){
        query += `titreService = "${titreService}" ,`
    }
    if(reparation_type_id){
        query += `reparation_type_id = ${reparation_type_id} `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE service.service_id = ${req.params.service_id}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating services: ");
};

const DeleteOneServiceById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one service by id.');
    if(!req.params.idservice){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'service");
        return;
    }
    const query = `DELETE * FROM service WHERE service.service_id = ${req.params.idservice}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete service : ');
};

export default {getAllService, createService, getOneServiceById, updateOneServiceById, DeleteOneServiceById};