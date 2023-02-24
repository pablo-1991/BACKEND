import { Router } from "express";
import ChatManager from "../dao/mongoManagers/chatManager.js";

const router = Router();

router.get('/',( req , res ) => {
    res.render("chat");
})

export default router