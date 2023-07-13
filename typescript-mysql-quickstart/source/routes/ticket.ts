import express from 'express';
import controller from '../controllers/ticket';

const router = express.Router();

router.get("/get/ticket",controller.getAllTicket);
router.get("get/ticket/:ticket_id", controller.getOneTicketById);
router.post("/post/ticket",express.json(), controller.createTicket);
router.put("/patch/ticket/:ticket_id", express.json(), controller.updateOneTicketById);
router.delete("/delete/ticket/:ticket_id", controller.DeleteOneTicketById)

export = router;