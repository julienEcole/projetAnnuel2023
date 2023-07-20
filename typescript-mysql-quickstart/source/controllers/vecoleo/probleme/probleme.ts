import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//probleme = nom de la table

// CREATE TABLE IF NOT EXISTS probleme (
//     probleme_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     adresse TEXT NOT NULL,
//     titre TEXT NOT NULL,
//     `description` TEXT NOT NULL,
//     utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id)
// );

const NAMESPACE = 'probleme';

const getAllProbleme = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all probleme.');

    let query = 'SELECT * FROM probleme';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved probleme: ');
};

const createProbleme = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting probleme');

    if(!req.body || !req.body.utilisateur_id || !req.body.adresse || !req.body.titre){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    //const probleme_id : number = req.body.probleme_id;

    const utilisateur_id:number = req.body.utilisateur_id;
    let description : string
    if(req.body.description){
        description = req.body.description
    }
    else{
        description = ""
    }
    const adresse : string = req.body.adresse;
    const titre : string = req.body.titre;

    let query = `INSERT INTO probleme (titre, adresse, description, utilisateur_id, date_de_publication) VALUES ("${titre}", "${adresse}", "${description}", ${utilisateur_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'probleme created: ');
};

const getOneProblemeById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one probleme by id.');
    if(!req.params.idProbleme){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du probleme");
        return;
    }
    const query = `SELECT * FROM probleme WHERE probleme_id = ${parseInt(req.params.idProbleme)}`;
    console.log(" mon id recherché = " + req.params.idProbleme)
    console.log(" mon query = " + query)
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved probleme : ');
};

const updateOneProblemeById = async (req: Request, res: Response, next: NextFunction) => {   //TOVERIFY
    logging.info(NAMESPACE, 'updating one probleme by id.');
    const isInt : RegExp = new RegExp("[0-9]+$")
    if(!req.params || !req.body || !req.params.idProbleme || !isInt.test(req.params.idProbleme)){
        res.status(400);
        res.send(`erreur, les arguments doivent être le mail ou l'id de l'probleme & un body en json doit accompagner la requete`); //\n req.params.idProbleme = ${req.params.idProbleme}
        return;
    }
    if(req.body.utilisateur_id  ){
        res.status(403);
        res.send(`erreur, le propriétaire de ce problème ou la date de publication de ce probleme ne peuvent pas être modifié, enlevez ce champ du fichier envoyé`); //\n req.params.idProbleme = ${req.params.idProbleme}
        return;
    }
    
    const probleme_id : number = parseInt(req.params.idProbleme);
    // const utilisateur_id:number = req.body.utilisateur_id;
    const description : string = req.body.description;
    const adresse : string = req.body.adresse;
    const titre : string = req.body.titre;
    let query = `UPDATE probleme SET `
    if(adresse){
        query += `adresse = \"${adresse}\" ,`
    }
    if(description){
        query += `description = "${description}" ,`
    }
    if(titre){
        query += `titre = "${titre}" `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE probleme.probleme_id = ${probleme_id}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating problemes: ");
};

const DeleteOneProblemeById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one probleme by id.');
    if(!req.params.idProbleme){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'probleme");
        return;
    }
    const query = `DELETE FROM probleme WHERE probleme.probleme_id = ${req.params.idProbleme}`;

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete probleme : ');
};

const DeleteAllProblemeFromUser = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one probleme by utilisateur id.');
    if(!req.params.utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'probleme");
        return;
    }
    const query = `DELETE FROM probleme WHERE probleme.utilisateur_id = ${req.params.utilisateur_id}`;

    await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete probleme : ');
};

export default {getAllProbleme, createProbleme, getOneProblemeById, updateOneProblemeById, DeleteOneProblemeById, DeleteAllProblemeFromUser}; 