import type { RequestHandler } from "express";

const blockAuthRequest: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

export default blockAuthRequest;
