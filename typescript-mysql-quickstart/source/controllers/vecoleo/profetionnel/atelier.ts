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
        res.send("le body ne contiens pas toutes les information pour mener a bien le create, veuillez ajouter le json contenant TOUTES les donnés necessaire dans le body.");
        return;
    }
    //const atelier_id : number = req.body.atelier_id;
    const nomAtelier : string = req.body.nomAtelier;
    const adresse : string = req.body.adresse;
    const longitude : number = req.body.longitude;
    const latitude : number = req.body.latitude;
    const telephone : string = req.body.telephone;
    const horaire_ouverture:Date = req.body.horaire_ouverture;
    const horaire_fermeture:Date = req.body.horaire_fermeture;

    const isNumber : RegExp = new RegExp("^(?:(?:\+|0)\d{1,3}\s?)?(?:\d{2}\s?){4}\d{2}$")
    if(telephone && !isNumber.test(telephone)){
        res.status(400);
        res.send("le numero de telephone n'est pas correct, veuillez en choisir un correct.");
        return;
    }

    let query = `INSERT INTO atelier (nomAtelier, adresse, horaire_ouverture, horaire_fermeture, longitude, latitude, telephone)
     VALUES ("${nomAtelier}", "${adresse}", ${horaire_ouverture}, ${horaire_fermeture}, ${longitude}, ${latitude},  "${telephone}")`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'atelier created: ');
};

const getOneAtelierById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one atelier by id.');
    if(!req.params.idAtelier){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du atelier");
        return;
    }
    const query = `SELECT * FROM atelier WHERE atelier.atelier_id = ${req.params.idAtelier}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved atelier : ');
};

const updateOneAtelierById = async (req: Request, res: Response, next: NextFunction) => {   //TOVERIFY
    logging.info(NAMESPACE, 'updating one atelier by id.');
    const isInt : RegExp = new RegExp("[0-9]+")
    if(!req.params || !req.body || !req.params.idAtelier || !isInt.test(req.params.idAtelier)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'atelier`); //\n req.params.idAtelier = ${req.params.idAtelier}
        return;
    }
    
    const atelier_id : number = parseInt(req.params.idAtelier);
    const nomAtelier : string = req.body.nomAtelier;
    const adresse : string = req.body.adresse;
    const horaire_ouverture:Date = req.body.horaire_ouverture;
    const horaire_fermeture:Date = req.body.horaire_fermeture;
    const longitude : number = req.body.longitude;
    const latitude : number = req.body.latitude;
    const telephone : string = req.body.telephone;
    

    const isNumber : RegExp = new RegExp("^(?:(?:\+|0)\d{1,3}\s?)?(?:\d{2}\s?){4}\d{2}$")
    if(telephone && !isNumber.test(telephone)){
        res.status(400);
        res.send("le numero de telephone n'est pas correct, veuillez en choisir un correct.");
        return;
    }

    let query = `UPDATE atelier SET `
    if(nomAtelier){
        query += `nomAtelier = \"${nomAtelier}\" ,`
    }
    if(adresse){
        query += `adresse = \"${adresse}\" ,`
    }
    if(telephone){
        query += `adresse = \"${telephone}\" ,`
    }
    if(longitude){
        query += `adresse = ${longitude} ,`
    }
    if(latitude){
        query += `adresse = ${latitude} ,`
    }
    if(horaire_ouverture){
        query += `horaire_ouverture = ${horaire_ouverture} ,`
    }
    if(horaire_fermeture){
        query += `horaire_fermeture = ${horaire_fermeture} `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE atelier.atelier_id = ${atelier_id}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating ateliers: ");
};

const DeleteOneAtelierById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one atelier by id.');
    if(!req.params.idAtelier){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'atelier");
        return;
    }
    const query = `DELETE FROM atelier WHERE atelier.atelier_id = ${req.params.idAtelier}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete atelier : ');
};

export default {getAllAtelier, createAtelier, getOneAtelierById, updateOneAtelierById, DeleteOneAtelierById};