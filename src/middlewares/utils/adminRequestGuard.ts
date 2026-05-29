import type { RequestHandler } from "express";

const adminRequestGuard: RequestHandler = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.end();
  }
  next();
};

export default adminRequestGuard;
