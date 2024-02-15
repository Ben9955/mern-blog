import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, getPosts } from "../controllers/post.controllers.js";

const route = Router();

route.post("/create", verifyToken, create);

route.get("/getposts", getPosts);

export default route;
