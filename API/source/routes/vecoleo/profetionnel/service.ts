import express from 'express';
import controller from "../../../controllers/vecoleo/profetionnel/service"

const router = express.Router();

router.get("/get/service",controller.getAllService);
router.get("get/service/:idService", controller.getOneServiceById);
router.post("/post/service",express.json(), controller.createService);
router.put("/put/service/:idService", express.json(), controller.updateOneServiceById);
router.delete("/delete/service/:idService", controller.DeleteOneServiceById)

export = router;