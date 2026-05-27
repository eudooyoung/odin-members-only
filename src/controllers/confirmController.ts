import { matchedData, validationResult } from "express-validator";
import type { Middleware } from "../types/types.js";
import { validateConfirmCode } from "../validates/validateConfirmCode.js";

export const confirmGet: Middleware = (req, res) => {
  res.render("index");
};

const confirmPostMiddleWare: Middleware = (req, res) => {
  void (async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
      });
    }
    const role = matchedData(req);
    console.log(role);
    res.end();
  })();
};

export const confirmPost = [...validateConfirmCode, confirmPostMiddleWare];
