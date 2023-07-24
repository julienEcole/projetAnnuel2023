import express from 'express';
import controller from "../../../controllers/vecoleo/probleme/commentaire"

const router = express.Router();

router.get("/get/commentaire/", controller.getAllCommentaire);
router.get("/get/commentaire/idUtilisateur/:utilisateur_id", controller.getAllCommentaireFromUser);
router.get("/get/commentaire/idProbleme/:probleme_id", controller.getAllCommentaireFromProbleme);
router.post("/post/commentaire",express.json(), controller.createCommentaire);
router.patch("/patch/commentaire/:commentaire_id", controller.updateOneCommentaireById); 
router.delete("/delete/commentaire/idUtilisateur/:utilisateur_id", controller.DeleteOneCommentaireFromUser) //a utiliser en cas de suppression de compte
router.delete("/delete/commentaire/idProbleme/:probleme_id", controller.DeleteOneCommentaireFromProbleme) //a utiliser en cas de résolution de probleme
router.delete("/delete/commentaire/:commentaire_id", controller.DeleteOneCommentaireById) //envoyer JSON car contiens une clef composé


export = router;