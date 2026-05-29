import type { NextFunction, Request, Response } from "express";

type ErrorHandler = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type { ErrorHandler as default };
