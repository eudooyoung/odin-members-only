import type { NextFunction, Request, Response } from "express";

export type ErrorHandler = (
  err: { statusCode: number; message: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

export type Middleware = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => void;
