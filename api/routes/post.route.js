import { Router } from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletePost,
  getPosts,
} from "../controllers/post.controllers.js";

const route = Router();

route.post("/create", verifyToken, create);
route.get("/getposts", getPosts);
route.delete("/deletePost/:postId/:userId", verifyToken, deletePost);
export default route;
