import { Router } from "express";
import { routesUser } from "./RoutesUser";

export const routes = Router()

routes.use('/user', routesUser)