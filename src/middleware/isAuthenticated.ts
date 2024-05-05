import { prisma } from "@/lib/prisma";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
type JwTPayload = {
  id: string;
};

export const authenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try{
    const { authorization } = request.headers
    
  if (!authorization) {
    
    return response.status(401).json({ message: "Token não encontrado." });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return response.status(401).json({
      message: "Token inválido.",
    });
  }

  const { id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as JwTPayload;

  const user = await prisma.user.findFirst({ where: { id } });

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  const { password, ...userWithoutPassword } = user;

  request.user = userWithoutPassword;

  next();
  }catch{
      return response.status(500).send('erro inesperado com o token')
  }
};
