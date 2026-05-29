import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import {
  confirmMemberAsAdminWithId,
  confirmMemberAsMemberWithId,
  insertMember,
} from "../db/queries.js";
import type { MemberRequest } from "../models/member.dto.js";
import { validateNewMember } from "../middlewares/validates/validateMember.js";
import { validateConfirmCode } from "../middlewares/validates/validateConfirmCode.js";
import config from "../config.js";

export const signUpGet: RequestHandler = (req, res) => {
  res.render("index");
};

const signUpPostHandler: RequestHandler = (req, res) => {
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
    res.redirect("/dashboard");
  })();
};

export const signUpPost = [...validateNewMember, signUpPostHandler];

export const loginGet: RequestHandler = (req, res) => {
  res.render("index");
};

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
    const { confirmCode } = matchedData(req);
    if (confirmCode === config.memberCode) {
      await confirmMemberAsMemberWithId(req.user!.memberId);
    } else {
      await confirmMemberAsAdminWithId(req.user!.memberId);
    }
    res.redirect("/dashboard");
  })();
};

export const confirmPost = [...validateConfirmCode, confirmPostMiddleWare];

export const logoutGet: RequestHandler = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
