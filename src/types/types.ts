import e from "express";

export type ErrorHandler = (
  err: { statusCode: number; message: string },
  req: e.Request,
  res: e.Response,
  next: e.NextFunction,
) => void;
