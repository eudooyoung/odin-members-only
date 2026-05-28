import type { RequestHandler } from "express";

const actionProvider =
  (action: Action): RequestHandler =>
  (req, res, next) => {
    res.locals.action = action;
    next();
  };

export default actionProvider;
