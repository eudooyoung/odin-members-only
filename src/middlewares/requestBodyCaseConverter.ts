import jsConvert from "js-convert-case";
import type { Middleware } from "../types/types.js";

const requestBodyCaseConverter: Middleware = (req, res, next) => {
  if (req.body) {
    req.body = jsConvert.camelKeys(req.body);
  }
  next!();
};

export default requestBodyCaseConverter;
