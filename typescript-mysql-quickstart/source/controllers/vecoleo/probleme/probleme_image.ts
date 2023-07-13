

import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//probleme_image = nom de la table

const NAMESPACE = 'probleme_image';

// const getAllprobleme_image = async (req: Request, res: Response, next: NextFunction) => {
//     logging.info(NAMESPACE, 'Getting all probleme_image.');

//     let query = 'SELECT * FROM probleme_image';

//     return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved probleme_image: ');
// };

const createProbleme_Image = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting probleme_image');

    if(!req.body || !req.body.probleme_id || !req.body.image_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const probleme_id : number = req.body.probleme_id;
    const image_id : number = req.body.image_id;

    let query = `INSERT INTO probleme_image (probleme_id, image_id) VALUES (${probleme_id}, ${image_id})`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'probleme_image created: ');
};

const getAllImageFromProbleme = async (req: Request, res: Response, next: NextFunction) => { 
    logging.info(NAMESPACE, 'Getting all probleme_image by utilisateur_id.');
    if(!req.params.probleme_id){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id du probleme_image");
        return;
    }
    const query = `SELECT image.* FROM probleme_image, image WHERE probleme_image.probleme_id = ${req.params.probleme_id} AND probleme_image.image_id = image.image_id`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved image list : ');
};

// const getAllProblemeFromImage = async (req: Request, res: Response, next: NextFunction) => {
//     logging.info(NAMESPACE, 'Getting one probleme_image by id.');
//     if(!req.params.atelier_id){
//         res.status(400);
//         res.send("erreur, les arguments doivent être l'id du probleme_image");
//         return;
//     }
//     const query = `SELECT utilisateur.* FROM probleme_image, utilisateur WHERE probleme_image.atelier_id = ${req.params.atelier_id} AND probleme_image.utilisateur_id = utilisateur.utilisateur_id`; 
    
//     return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved user list : ');
// };

const updateOneProbleme_ImageById = async (req: Request, res: Response, next: NextFunction) => {
    res.status(403);
        res.send("erreur, Cette table n'est pas sensé être update");
    return;
};

const DeleteOneProbleme_ImageById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one probleme_image by id.');
    if(!req.body || !req.body.probleme_id || !req.body.image_id){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le DELETE, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    const probleme_id : number = req.body.probleme_id;
    const image_id : number = req.body.image_id;
    const query = `DELETE * FROM probleme_image WHERE probleme_image.probleme_id = ${probleme_id} AND probleme_image.image_id = ${image_id}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete probleme_image : ');
};

export default {/*getAllprobleme_image,*/ createProbleme_Image, getAllImageFromProbleme, /*getAllProblemeFromImage,*/  updateOneProbleme_ImageById, DeleteOneProbleme_ImageById};


// CREATE TABLE IF NOT EXISTS probleme_image (
//     image_id INT PRIMARY KEY NOT NULL REFERENCES image(image_id),
//     probleme_id INT PRIMARY KEY NOT NULL REFERENCES probleme(probleme_id),
//     PRIMARY KEY(image_id,probleme_id)
// );