import express from 'express';
import controller from "../../controllers/vecoleo/notification"

const router = express.Router();

// router.get("/get/atelier",controller.getAllAtelier);
router.get("/get/notification/idService/:service_id", controller.getAllProblemeFromService);
router.get("/get/notification/idProbleme/:probleme_id", controller.getAllServiceFromProbleme);
router.post("/post/notification",express.json(), controller.createNotification);
router.patch("/patch/notification/:atelier_id", express.json(), controller.updateOneNotificationById); //produit toujours erreur 403
router.delete("/delete/notification",express.json(), controller.DeleteOneNotificationById) //envoyer JSON car contiens une clef composé

export = router;