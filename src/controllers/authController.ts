import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { validateConfirmCode } from "../validates/validateConfirmCode.js";
import {
  confirmMemberAsAdminWithId,
  confirmMemberAsMemberWithId,
} from "../db/queries.js";

export const dashboardGet: RequestHandler = (req, res) => {
  res.render("index", {
    status: req.user!.status,
  });
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
    if (confirmCode === "MEMBER") {
      await confirmMemberAsMemberWithId(req.user!.memberId);
    } else {
      await confirmMemberAsAdminWithId(req.user!.memberId);
    }
    res.redirect("/auth/dashboard");
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
