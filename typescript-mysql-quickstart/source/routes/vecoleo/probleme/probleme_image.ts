import express from 'express';
import controller from "../../../controllers/vecoleo/probleme/probleme_image"

const router = express.Router();

// router.get("/get/atelier",controller.getAllAtelier);
router.get("/get/probleme_image/idService/:probleme_id", controller.getAllImageFromProbleme);
router.post("/post/probleme_image",express.json(), controller.createProbleme_Image);
router.patch("/patch/probleme_image", controller.updateOneProbleme_ImageById); //produit toujours erreur 403 fichier json ou non
router.delete("/delete/probleme_image",express.json(), controller.DeleteOneProbleme_ImageById) //envoyer JSON car contiens une clef composé
router.delete("/delete/probleme_image/imageId/:image_id", controller.DeleteOneProbleme_ImageById)
router.delete("/delete/probleme_image/problemeId/:probleme_id", controller.DeleteAllProbleme_ImageByProbleme)

export = router;