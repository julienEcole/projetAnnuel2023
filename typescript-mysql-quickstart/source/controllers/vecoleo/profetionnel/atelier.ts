import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//atelier = nom de la table

const NAMESPACE = 'atelier';

const getAllAtelier = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all atelier.');

    let query = 'SELECT * FROM atelier';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier: ');
};

const createAtelier = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting atelier');

    if(!req.body || !req.body.etat_id || req.body.nomAtelier || !req.body.horaire_ouverture || !req.body.horaire_fermeture){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    //const atelier_id : number = req.body.atelier_id;
    const nomAtelier : string = req.body.nomAtelier;
    const adresse : string = req.body.adresse;
    const horaire_ouverture:Date = req.body.horaire_ouverture;
    const horaire_fermeture:Date = req.body.horaire_fermeture;

    let query = `INSERT INTO atelier (nomAtelier, adresse, horaire_ouverture, horaire_fermeture) VALUES ("${nomAtelier}", "${adresse}", ${horaire_ouverture}, ${horaire_fermeture})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'atelier created: ');
};

const getOneAtelierById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one atelier by id.');
    if(!req.params.idatelier){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du atelier");
        return;
    }
    const query = `SELECT * FROM atelier WHERE atelier.atelier_id = ${req.params.idatelier}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier : ');
};

const updateOneAtelierById = async (req: Request, res: Response, next: NextFunction) => {   //TOVERIFY
    logging.info(NAMESPACE, 'updating one atelier by id.');
    const isInt : RegExp = new RegExp("[0-9]+")
    if(!req.params || !req.body || !req.params.idatelier || !isInt.test(req.params.idatelier)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'atelier`); //\n req.params.idatelier = ${req.params.idatelier}
        return;
    }
    
    const atelier_id : number = parseInt(req.params.idatelier);
    const nomAtelier : string = req.body.nomAtelier;
    const adresse : string = req.body.adresse;
    const horaire_ouverture:Date = req.body.horaire_ouverture;
    const horaire_fermeture:Date = req.body.horaire_fermeture;
    let query = `UPDATE atelier SET `
    if(atelier_id){    //ne surtout pas enlever espace avant virgule!!
        query += `atelier_id = ${atelier_id} ,`
    }
    if(nomAtelier){
        query += `nomAtelier = \"${nomAtelier}\" ,`
    }
    if(adresse){
        query += `adresse = \"${adresse}\" ,`
    }
    if(horaire_ouverture){
        query += `horaire_ouverture = ${horaire_ouverture} ,`
    }
    if(horaire_fermeture){
        query += `horaire_fermeture = ${horaire_fermeture} `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE atelier.atelier_id = ${req.params.atelier_id}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating ateliers: ");
};

const DeleteOneAtelierById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one atelier by id.');
    if(!req.params.idatelier){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'atelier");
        return;
    }
    const query = `DELETE FROM atelier WHERE atelier.atelier_id = ${req.params.idatelier}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete atelier : ');
};

export default {getAllAtelier, createAtelier, getOneAtelierById, updateOneAtelierById, DeleteOneAtelierById};