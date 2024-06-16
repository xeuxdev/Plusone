import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { APIResponse } from "../config/response";
import { validateEmail, validatePassword } from "../lib/utils";
import db from "../config/db";

async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!validateEmail(email) || !validatePassword(password)) {
    return APIResponse("Invalid credentials", 400, res);
  }

  try {
    const user = await db.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (!user) {
      throw Error("user not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw Error("Invalid credentials");
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2h",
      }
    );

    return APIResponse("Login Successful", 200, res, { token });
  } catch (error: any) {
    return APIResponse(error.message, 500, res);
  }
}

async function register(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body;

  if (
    password !== confirmPassword ||
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validatePassword(confirmPassword) ||
    !name
  ) {
    return APIResponse("Invalid credentials", 400, res);
  }

  const user = await db.user.findUnique({
    where: {
      email: email.trim(),
    },
  });

  if (user) {
    return APIResponse("User already exists", 400, res);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const newUser = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
      },
    });

    if (!newUser) {
      throw Error("something went wrong");
    }

    return APIResponse("Successfully Registered User", 201, res);
  } catch (error: any) {
    return APIResponse(error.message, 500, res);
  }
}

export default { login, register };
