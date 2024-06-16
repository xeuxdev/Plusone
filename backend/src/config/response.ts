import { Response } from "express";

export function APIResponse(
  message: string,
  status: number,
  res: Response,
  data?: any
) {
  return res.status(status).json({
    message,
    data: data,
  });
}
