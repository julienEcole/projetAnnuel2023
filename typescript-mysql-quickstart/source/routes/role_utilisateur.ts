import express from 'express';
import controller from '../controllers/role_utilisateur';

const router = express.Router();

router.get("/get/role_utilisateur",controller.getAllRole_utilisateur);
router.get("/get/role_utilisateur/:role_utilisateur_id", controller.getOneRole_utilisateurById);
router.post("/post/role_utilisateur",express.json(), controller.createRole_utilisateur);
router.patch("/patch/role_utilisateur/:role_utilisateur_id", express.json(), controller.updateOneRole_utilisateurById);
router.delete("/delete/role_utilisateur/:role_utilisateur_id", controller.DeleteOneRole_utilisateurById)

export = router;