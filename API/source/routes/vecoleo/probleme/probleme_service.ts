import express from 'express';
import controller from "../../../controllers/vecoleo/probleme/probleme_service"

const router = express.Router();

// router.get("/get/atelier",controller.getAllAtelier);
router.get("/get/probleme_service/idService/:service_id", controller.getAllProblemeFromService);
router.get("/get/probleme_service/idProbleme/:probleme_id", controller.getAllServiceFromProbleme);
router.post("/post/probleme_service",express.json(), controller.createProbleme_Service);
router.patch("/patch/probleme_service", controller.updateOneProbleme_ServiceById); //produit toujours erreur 403 fichier json ou non
router.delete("/delete/probleme_service",express.json(), controller.DeleteOneProbleme_ServiceById) //envoyer JSON car contiens une clef composé

export = router;