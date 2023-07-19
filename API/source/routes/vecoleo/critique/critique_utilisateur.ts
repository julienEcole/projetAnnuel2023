import express from 'express';
import controller from "../../../controllers/vecoleo/critique/critique_utilisateur"

const router = express.Router();

// router.get("/get/critique_utilisateur",controller.getAllService);
router.get("get/critique_utilisateur/:idUtilisateur", controller.getAllCritiqueFromUtilsateur);
router.get("get/critique_utilisateur/:idCritique", controller.getAllUtilisateurFromCritique);
router.post("/post/critique_utilisateur",express.json(), controller.createCritique_Utilisateur);
router.patch("/patch/critique_utilisateur", controller.updateOneCritique_UtilisateurById);
router.delete("/delete/critique_utilisateur", express.json(), controller.DeleteOneCritique_UtilisateurById)

export = router;