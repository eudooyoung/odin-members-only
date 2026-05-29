import type { RequestHandler } from "express";

const blockNonAuthRequest: RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log(`Not authenticated access..!`);
    return res.redirect("/");
  }
  next();
};

export default blockNonAuthRequest;
