import express from 'express';
import controller from '../controllers/utilisateur';

const router = express.Router();

router.post('/create/utilisateur', express.json(), controller.createUser);
router.put("/put/utilisateur/:idUser", express.json(), controller.updateOneUserById);
router.get('/get/utilisateur', controller.getAllUsers);
router.get("/get/utilisateur/id/:idUser", controller.getOneUserById);
router.get("/get/utilisateur/mail/:mailUser", controller.getOneUserByMail);
router.delete("/delete/utilisateur/id/:idUser", controller.deleteOneUserById);
router.delete("/delete/utilisateur/mail/:mailUser", controller.deleteOneUserByMail);

export = router;