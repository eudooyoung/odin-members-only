import { matchedData, validationResult } from "express-validator";
import jsConvert from "js-convert-case";
import type { Middleware } from "../types/types.js";
import { validateNewMember } from "../middlewares/validates/validateMember.js";
import { insertMember } from "../db/queries.js";
import type { MemberRequest } from "../models/memberRequest.dto.js";

export const signUpGet: Middleware = (req, res) => {
  res.render("index");
};

const signUpPostMiddleware: Middleware = (req, res) => {
  void (async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("index", {
        prev: jsConvert.camelKeys(req.body),
      });
    }
    const { username, password, firstName, lastName }: MemberRequest =
      matchedData(req);
    await insertMember({ username, password, firstName, lastName });
    res.redirect("/sign-up/code");
  })();
};

export const signUpPost = [...validateNewMember, signUpPostMiddleware];
