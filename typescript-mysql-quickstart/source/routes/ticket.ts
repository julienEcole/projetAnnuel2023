import express from 'express';
import controller from '../controllers/vecoleo/atelier';

const router = express.Router();

router.get("/get/ticket",controller.getAllAtelier);
router.get("get/ticket/:idTicket", controller.getOneAtelierById);
router.post("/post/ticket",express.json(), controller.createAtelier);
router.put("/put/ticket", express.json(), controller.updateOneAtelierById);
router.delete("/delete/ticket/:idTicket", controller.DeleteOneAtelierById)

export = router;