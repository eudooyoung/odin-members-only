import { matchedData, validationResult } from "express-validator";
import type { Middleware } from "../types/types";
import jsConvert from "js-convert-case";
import type { MemberInput } from "../models/memberInput.dto";

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
    const memberInput = ({ username, password, firstName, lastName } =
      matchedData(req));
    await insertMember(memberInput);
    res.redirect("/sign-up/code");
  })();
};
