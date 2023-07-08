import express from 'express';
import controller from "../../controllers/vecoleo/atelier"

const router = express.Router();

router.get("/get/atelier",controller.getAllAtelier);
router.get("get/atelier/:idAtelier", controller.getOneAtelierById);
router.post("/post/atelier",express.json(), controller.createAtelier);
router.put("/put/atelier", express.json(), controller.updateOneAtelierById);
router.delete("/delete/atelier/:idAtelier", controller.DeleteOneAtelierById)

export = router;