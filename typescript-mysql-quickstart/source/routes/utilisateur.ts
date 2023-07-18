import express from 'express';
import controller from '../controllers/utilisateur';

const router = express.Router();

router.post('/create/utilisateur', express.json(), controller.createUser);
router.patch("/patch/utilisateur/:utilisateur_id", express.json(), controller.updateOneUserById);
router.get("/get/utilisateur/id/:utilisateur_id", controller.getOneUserById);
router.get("/get/utilisateur/mail/:mailUser", controller.getOneUserByMail);
router.get('/get/utilisateur', controller.getAllUsers);
router.delete("/delete/utilisateur/id/:utilisateur_id", controller.deleteOneUserById);
router.delete("/delete/utilisateur/mail/:mailUser", controller.deleteOneUserByMail);

export = router;