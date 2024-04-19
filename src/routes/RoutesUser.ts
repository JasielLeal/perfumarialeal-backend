import { UserController } from "@/useCases/User/UserController";
import { Router } from "express";

const userController = new UserController();

export const routesUser = Router();

routesUser.post("/create", userController.create);
routesUser.post("/auth", userController.authenticate);
routesUser.get("/getuser", userController.getUser);
routesUser.get("/getallusers", userController.getAllUsers);
