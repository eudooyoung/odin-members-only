import type { RequestHandler } from "express";

const pageMiddleware =
  (page: string): RequestHandler =>
  (req, res, next) => {
    res.locals.route = { page: page };
    next();
  };

export default pageMiddleware;
