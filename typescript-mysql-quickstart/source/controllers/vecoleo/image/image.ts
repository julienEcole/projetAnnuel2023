import { NextFunction, Request, Response } from 'express';
import logging from '../../../config/logging';
import { executeSQLCommand } from '../../shared/executeCommand';

//image = nom de la table

// CREATE TABLE IF NOT EXISTS image (
//     image_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     url_image TEXT NOT NULL,
//     `description` TEXT,
//     nom VARCHAR(255) NOT NULL UNIQUE
// );

const NAMESPACE = 'image';

const getAllImage = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all image.');

    let query = 'SELECT * FROM image';

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved image: ');
};

const createImage = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Inserting image');

    if(!req.body || !req.body.url_image || !req.body.nom){
        res.status(400);
        res.send("le body ne contiens pas d'information pour le create, veuillez ajouter le json contenant les donnés dans le body.");
        return;
    }
    //const image_id : number = req.body.image_id;
    const url_image:string = req.body.url_image;
    const nom : string = req.body.nom;
    const description : string = req.body.description;

    let query = `INSERT INTO image (url_image, nom, description) VALUES ("${url_image}", "${nom}", "${description}")`;
    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'image created: ');
};

const getOneImageById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting one image by id.');
    if(!req.params.idImage){
        res.status(400);
        res.send("erreur, l'argument en parametre doit être l'id de la image");
        return;
    }
    const query = `SELECT * FROM image WHERE image.image_id = ${req.params.idImage}`;

    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'Retrieved image : ');
};

const updateOneImageById = async (req: Request, res: Response, next: NextFunction) => {   //TOVERIFY
    logging.info(NAMESPACE, 'updating one image by id.');
    const isInt : RegExp = new RegExp("[0-9]+$")
    if(!req.params || !req.body || !req.params.idImage || !isInt.test(req.params.idImage)){
        res.status(400);
        res.send(`erreur, un body doit être envoyé contenant les arguments doivent être le mail et l'id de l'image doit être spécifié dans la route`); //\n req.params.idImage = ${req.params.idImage}
        return;
    }
    
    const image_id : number = parseInt(req.params.idImage);
    const url_image:string = req.body.url_image;
    const nom : string = req.body.nom;
    const description : string = req.body.description;
    let query = `UPDATE image SET `
    if(url_image){
        query += `note = \"${url_image}\" ,`
    }
    if(nom){
        query += `nom = \"${nom}\" ,`
    }
    if(description){
        query += `description = "${description}"  `
    }
    query = query.substring(0, query.length - 1)

    query += `WHERE image.image_id = ${image_id}`
    
    //logging.info(NAMESPACE,"ma query = ", query); //DEBUG

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, "updating images: ");
};

const DeleteOneImageById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'DELETE one image by id.');
    if(!req.params.idImage){
        res.status(400);
        res.send("erreur, les arguments doivent être l'id de l'image");
        return;
    }
    const query = `DELETE FROM image WHERE image.image_id = ${req.params.idImage}`;

    
    return await executeSQLCommand(req, res, next, NAMESPACE, query, 'delete image : ');
};

export default {getAllImage, createImage, getOneImageById, updateOneImageById, DeleteOneImageById}; 