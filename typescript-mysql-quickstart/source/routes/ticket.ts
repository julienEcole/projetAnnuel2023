import express from 'express';
import controller from '../controllers/ticket';

const router = express.Router();

router.get("/get/ticket",controller.getAllTicket);
router.get("get/ticket/:idTicket", controller.getOneTicketById);
router.post("/post/ticket",express.json(), controller.createTicket);
router.put("/put/ticket", express.json(), controller.updateOneTicketById);
router.delete("/delete/ticket/:idTicket", controller.DeleteOneTicketById)

export = router;