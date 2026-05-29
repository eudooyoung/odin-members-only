import type { RequestHandler } from "express";

const blockNonAuthRequest: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

export default blockNonAuthRequest;
