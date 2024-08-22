import { authenticated } from "@/middleware/isAuthenticated";
import { UserController } from "@/useCases/User/UserController";
import { Router } from "express";

const userController = new UserController();

export const routesUser = Router();

routesUser.post("/create", userController.create);
routesUser.post("/auth", userController.authenticate);
routesUser.get("/getuser", authenticated, userController.getUser);
routesUser.get("/getallusers", authenticated, userController.getAllUsers);
routesUser.delete("/delete/:id", authenticated, userController.delete);
routesUser.post("/forgetpassword", userController.forgetPassword);
routesUser.post("/recovery", userController.VerifyPasswordToken);
routesUser.put("/changepassword", userController.UpdatePassword);