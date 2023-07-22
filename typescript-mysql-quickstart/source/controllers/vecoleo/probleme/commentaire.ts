

import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//commentaire = nom de la table

const NAMESPACE = 'commentaire';

// CREATE TABLE IF NOT EXISTS commentaire (
//     utilisateur_id INT NOT NULL REFERENCES utilisateur(utilisateur_id),
//     probleme_id INT NOT NULL REFERENCES probleme(probleme_id),
//     `description` TEXT,
//     titre TEXT,
//     date_de_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
//     date_mise_a_jour DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     PRIMARY KEY (utilisateur_id,probleme_id)
// );

const createCommentaire = async (req: Request, res: Response, next: NextFunction) => {  //TODO
    logging.info(NAMESPACE, 'Inserting commentaire');
    console.log("mon body = ", req.body)
    if(!req.body || !req.body.probleme_id || !req.body.utilisateur_id || !req.body.description){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const probleme_id : number = parseInt(req.body.probleme_id);
    const utilisateur_id : number = parseInt(req.body.utilisateur_id);
    let titre: string
    if (req.body.titre) {
       titre = req.body.resume
    }
    else {
        titre = ""
    }
    
    const description:string = req.body.description;

    let query = `INSERT INTO commentaire (probleme_id, utilisateur_id, titre, description) VALUES (${probleme_id}, ${utilisateur_id}, "${titre}", "${description}")`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'commentaire created: ');
};

const getAllCommentaire = async (req: Request, res: Response, next: NextFunction) => { //TODO
    logging.info(NAMESPACE, 'Getting all commentaire.');
    const query = `SELECT commentaire.* FROM commentaire`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved commentaire list : ');
};

const getAllCommentaireFromUser = async (req: Request, res: Response, next: NextFunction) => { //TODO
    logging.info(NAMESPACE, 'Getting all commentaire by utilisateur_id.');
    if(!req.params.utilisateur_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du commentaire");
        return;
    }
    const query = `SELECT commentaire.* FROM commentaire WHERE commentaire.utilisateur_id = ${req.params.utilisateur_id}`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved commentaire list : ');
};

const getAllCommentaireFromProbleme = async (req: Request, res: Response, next: NextFunction) => { //TODO
    logging.info(NAMESPACE, 'Getting all commentaire by utilisateur_id.');
    if(!req.params.probleme_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du commentaire");
        return;
    }
    const query = `SELECT commentaire.* FROM commentaire WHERE commentaire.probleme_id = ${req.params.probleme_id}`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved image list : ');
};

const updateOneCommentaireById = async (req: Request, res: Response, next: NextFunction) => {//TODO
    if(!req.params || !req.body.commentaire_id || (!req.body.titre && !req.body.description)){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le update, veuillez ajouter le json contenant les donnés dans le body ou le .");
        return;
    }
    const commentaire_id : number = parseInt(req.body.commentaire_id);
    const titre: string = req.body.titre;
    const description:string = req.body.description;
    
    let query = `UPDATE commentaire SET `
    if(titre){
        query += `adresse = \"${titre}\" ,`
    }
    if(description){
        query += `description = "${description}"  `
    }
    query = query.substring(0, query.length - 1)
    query += `WHERE commentaire.commentaire_id = ${commentaire_id}`
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating problemes: ");
};

const DeleteOneCommentaireById = async (req: Request, res: Response, next: NextFunction) => {//TODO
    logging.info(NAMESPACE, 'DELETE one commentaire by id.');
    if(!req.params || !req.params.commentaire_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const commentaire_id : number = parseInt(req.body.commentaire_id);
    const query = `DELETE FROM commentaire WHERE commentaire.commentaire_id = ${commentaire_id}`;

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete commentaire : ');
};

const DeleteOneCommentaireFromUser = async (req: Request, res: Response, next: NextFunction) => {//TODO
    logging.info(NAMESPACE, 'DELETE all commentaire from userId.');
    if(!req.params || !req.params.utilisateur_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const utilisateur_id : number = parseInt(req.params.utilisateur_id);
    const query = `DELETE FROM commentaire WHERE commentaire.utilisateur_id = ${utilisateur_id}`;

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete commentaire : ');
};

const DeleteOneCommentaireFromProbleme = async (req: Request, res: Response, next: NextFunction) => {//TODO
    logging.info(NAMESPACE, 'DELETE all commentaire from probleme Id.');
    if(!req.params || !req.params.probleme_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const probleme_id : number = parseInt(req.params.probleme_id);
    const query = `DELETE FROM commentaire WHERE commentaire.probleme_id = ${probleme_id}`;

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete commentaire : ');
};

export default {
    createCommentaire, 
    getAllCommentaire, 
    getAllCommentaireFromUser, 
    getAllCommentaireFromProbleme, 
    updateOneCommentaireById, 
    DeleteOneCommentaireById, 
    DeleteOneCommentaireFromUser, 
    DeleteOneCommentaireFromProbleme
};