import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controllers.js";

const route = Router();

route.post("/create", verifyToken, create);

export default route;
