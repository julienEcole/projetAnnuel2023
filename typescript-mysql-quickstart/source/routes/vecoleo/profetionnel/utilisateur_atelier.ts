import express from 'express';
import controller from "../../../controllers/vecoleo/profetionnel/utilisateur_atelier"

const router = express.Router();

// router.get("/get/atelier",controller.getAllAtelier);
router.get("/get/utilisateur_atelier/idAtelier/:atelier_id", controller.getAllUtilisateurFromAtelier);
router.get("/get/utilisateur_atelier/idUtilisateur/:utilisateur_id", controller.getAllAtelierFromUtilisateur);
router.post("/post/utilisateur_atelier",express.json(), controller.createUtilisateur_Atelier);
router.patch("/patch/atelier/:atelier_id", express.json(), controller.updateOneUtilisateur_AtelierById); //produit toujours erreur 403
router.delete("/delete/atelier/:atelier_id",express.json(), controller.DeleteOneUtilisateur_AtelierById) //envoyer JSON car contiens une clef composé

export = router;