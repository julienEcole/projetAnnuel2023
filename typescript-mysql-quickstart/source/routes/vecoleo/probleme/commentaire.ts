import express from 'express';
import controller from "../../../controllers/vecoleo/probleme/commentaire"

const router = express.Router();

router.get("/get/commentaire/", controller.getAllCommentaire);
router.get("/get/commentaire/idUser/:utilisateur_id", controller.getAllCommentaireFromUser);
router.get("/get/commentaire/idProbleme/:probleme_id", controller.getAllCommentaireFromProbleme);
router.post("/post/commentaire",express.json(), controller.createCommentaire);
router.patch("/patch/commentaire", controller.updateOneCommentaireById); 
router.delete("/delete/commentaire",express.json(), controller.DeleteOneCommentaireById) //envoyer JSON car contiens une clef composé
router.delete("/delete/commentaire/idUser/:idUser",express.json(), controller.DeleteOneCommentaireFromUser) //a utiliser en cas de suppression de compte
router.delete("/delete/commentaire/idProbleme/:probleme_id",express.json(), controller.DeleteOneCommentaireFromProbleme) //a utiliser en cas de résolution de probleme


export = router;