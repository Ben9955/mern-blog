import { Route } from "express";
import { verifyToken } from "../utils/verifyUser";
import { create } from "../controllers/post.controllers.js";

const route = Route();

route.post("/create", verifyToken, create);

export default route;
