import express from 'express';
import controller from "../../../controllers/vecoleo/critique/critique_atelier"

const router = express.Router();

// router.get("/get/critique_atelier",controller.getAllService);
router.get("get/critique_atelier/:utilisateur_id", controller.getAllCritiqueFromAtelier);
router.get("get/critique_atelier/:atelier_id", controller.getAllCritiqueFromAtelier);
router.post("/post/critique_atelier",express.json(), controller.createCritique_Atelier);
router.patch("/patch/critique_atelier", controller.updateOneCritique_AtelierById);
router.delete("/delete/critique_atelier", express.json(), controller.DeleteOneCritique_AtelierById)

export = router;