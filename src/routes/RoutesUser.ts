import { authenticated } from "@/middleware/isAuthenticated";
import { UserController } from "@/useCases/User/UserController";
import { Router } from "express";

const userController = new UserController();

export const routesUser = Router();

// Rotas públicas (não requerem autenticação)
routesUser.post("/create", userController.create);
routesUser.post("/auth", userController.authenticate);
routesUser.post("/forgetpassword", userController.forgetPassword);
routesUser.post("/recovery", userController.VerifyPasswordToken);
routesUser.put("/changepassword", userController.UpdatePassword);

// Aplica o middleware de autenticação para as rotas que precisam de proteção
routesUser.use(authenticated);

// Rotas protegidas (requerem autenticação)
routesUser.get("/getuser", userController.getUser);
routesUser.get("/getallusers", userController.getAllUsers);
routesUser.delete("/delete/:id", userController.delete);