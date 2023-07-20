import express from 'express';
import controller from "../../../controllers/vecoleo/probleme/probleme"

const router = express.Router();

router.get("/get/probleme/:idProbleme", controller.getOneProblemeById);
router.get("/get/probleme",controller.getAllProbleme);
router.post("/post/probleme",express.json(), controller.createProbleme);
router.patch("/patch/probleme/:idProbleme", express.json(), controller.updateOneProblemeById);
router.delete("/delete/probleme/:idProbleme", controller.DeleteOneProblemeById)
router.delete("/delete/probleme/allProblemeFromUser/:utilisateur_id", controller.DeleteAllProblemeFromUser)
export = router;