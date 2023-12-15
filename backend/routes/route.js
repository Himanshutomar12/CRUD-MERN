import express from "express";
import { showClient, addClient, deleteClient, findClient, updateClient } from "../controller/client.js";

const router = express.Router();
router.post("/", addClient);
router.get("/", showClient);
router.post("/delete", deleteClient);
router.post("/find", findClient);
router.post("/update", updateClient);

export default router;