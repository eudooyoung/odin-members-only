import type { RequestHandler } from "express";

export const logoutGet: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
