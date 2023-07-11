import express from 'express';
import controller from "../../../controllers/vecoleo/profetionnel/utilisateur_atelier"

const router = express.Router();

// router.get("/get/atelier",controller.getAllAtelier);
router.get("get/utilisateur_atelier/idAtelier/:idAtelier", controller.getAllUtilisateurFromAtelier);
router.get("get/utilisateur_atelier/idUtilisateur/:idUtilisateur", controller.getAllAtelierFromUtilisateur);
router.post("/post/utilisateur_atelier",express.json(), controller.createUtilisateur_Atelier);
router.put("/put/atelier/:idAtelier", express.json(), controller.updateOneUtilisateur_AtelierById); //produit toujours erreur 403
router.delete("/delete/atelier/:idAtelier",express.json(), controller.DeleteOneUtilisateur_AtelierById) //envoyer JSON car contiens une clef composé

export = router;