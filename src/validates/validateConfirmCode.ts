import { body } from "express-validator";
import { invalidCodeErr } from "./errors.js";
import config from "../config.js";

export const validateConfirmCode = [
  body("confirmCode")
    .trim()
    .isIn([config.adminCode, config.memberCode])
    .withMessage(`confirm code ${invalidCodeErr}`),
];
