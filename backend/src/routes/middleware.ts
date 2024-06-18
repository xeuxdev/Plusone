import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../config/response";
import jwt from "jsonwebtoken";
import { APIRequest } from "../types";

export function verifyUserToken(
  req: APIRequest,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization;
  if (!token) return APIResponse("Unauthorized request", 401, res);
  try {
    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return APIResponse("Unauthorized request", 401, res);
    }

    const verifiedUser = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as APIRequest["user"];

    if (!verifiedUser) {
      return APIResponse("Unauthorized request", 401, res);
    }

    req.user = verifiedUser;
    next();
  } catch (error) {
    return APIResponse("Invalid Token", 500, res);
  }
}
