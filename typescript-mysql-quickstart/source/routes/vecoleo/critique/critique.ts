import express from 'express';
import controller from "../../../controllers/vecoleo/critique/critique"

const router = express.Router();

router.get("/get/critique",controller.getAllCritique);
router.get("/get/critique/:idCritique", controller.getOneCritiqueById);
router.post("/post/critique",express.json(), controller.createCritique);
router.patch("/patch/critique/:idCritique", express.json(), controller.updateOneCritiqueById);
router.delete("/delete/critique/:idCritique", controller.DeleteOneCritiqueById)

export = router;