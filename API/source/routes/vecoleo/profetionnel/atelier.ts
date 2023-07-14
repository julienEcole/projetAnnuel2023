import express from 'express';
import controller from "../../../controllers/vecoleo/profetionnel/atelier"

const router = express.Router();

router.get("/get/atelier",controller.getAllAtelier);
router.get("get/atelier/:idAtelier", controller.getOneAtelierById);
router.post("/post/atelier",express.json(), controller.createAtelier);
router.patch("/patch/atelier/:idAtelier", express.json(), controller.updateOneAtelierById);
router.delete("/delete/atelier/:idAtelier", controller.DeleteOneAtelierById)

export = router;