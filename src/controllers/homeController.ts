import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import type { MemberRequest } from "../models/memberRequest.dto.js";
import { insertMember } from "../db/queries.js";
import { validateNewMember } from "../validates/validateMember.js";

export const homeGet: RequestHandler = (req, res) => {
  res.render("index");
};

export const signUpGet: RequestHandler = (req, res) => {
  res.render("index");
};

const signUpPostMiddleware: RequestHandler = (req, res) => {
  void (async () => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
        prev: req.body as Record<string, unknown>,
      });
    }
    const { username, password, firstName, lastName }: MemberRequest =
      matchedData(req);
    await insertMember({ username, password, firstName, lastName });
    res.redirect("/");
  })();
};

export const signUpPost = [...validateNewMember, signUpPostMiddleware];

export const loginGet: RequestHandler = (req, res) => {
  res.render("index");
};
