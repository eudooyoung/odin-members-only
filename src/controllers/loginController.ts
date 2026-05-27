import type { RequestHandler } from "express";

export const loginGet: RequestHandler = (req, res) => {
  res.render("index");
};
