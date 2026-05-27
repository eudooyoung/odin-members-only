import { matchedData, validationResult } from "express-validator";
import { validateConfirmCode } from "../validates/validateConfirmCode.js";
import type { RequestHandler } from "express";

export const confirmGet: RequestHandler = (req, res) => {
  res.render("index");
};

const confirmPostMiddleWare: RequestHandler = (req, res) => {
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
