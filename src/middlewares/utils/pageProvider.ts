import type { RequestHandler } from "express";
import type Page from "../../types/page.js";

const pageProvider =
  (page: Page): RequestHandler =>
  (req, res, next) => {
    res.locals.page = page;
    next();
  };

export default pageProvider;
