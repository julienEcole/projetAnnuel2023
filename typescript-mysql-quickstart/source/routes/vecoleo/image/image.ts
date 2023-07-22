import express from 'express';
import controller from "../../../controllers/vecoleo/image/image"

const router = express.Router();

router.get("/get/image/:idImage", controller.getOneImageById);
router.get("/get/image", controller.getAllImage);
router.post("/post/image",express.json(), controller.createImage);
router.patch("/patch/image/:idImage", express.json(), controller.updateOneImageById);
router.delete("/delete/image/:idImage", controller.DeleteOneImageById)

export = router;