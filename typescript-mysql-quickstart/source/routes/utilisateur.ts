import express from 'express';
import controller from '../controllers/utilisateur';

const router = express.Router();

router.post('/create/utilisateur', express.json(), controller.createUser);
router.get('/get/utilisateur', controller.getAllUsers);
router.get("/get/utilisateur/:idUser", controller.getOneUser)

export = router;