import { body } from "express-validator";
import bcrypt from "bcryptjs";
import {
  alphaErr,
  duplicateErr,
  emailErr,
  emptyErr,
  nameLengthErr,
  passwordConfirmNotMatchErr,
  passwordMaxLengthErr,
  passwordMinLengthErr,
  passwordNumericErr,
  passwordSpecialCharacterErr,
  passwordUppercaseErr,
  usernameMaxLengthErr,
  usernameMinLengthErr,
} from "./errorMessages.js";
import { existMemberByUsername } from "../../db/queries.js";
import type { MemberRequest } from "../../models/member.dto.js";

export const validateNewMember = [
  body("username")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`username ${emptyErr}`)
    .isEmail()
    .withMessage(`username ${emailErr}`)
    .isLength({ min: 6 })
    .withMessage(`username ${usernameMinLengthErr}`)
    .isLength({ max: 30 })
    .withMessage(`username ${usernameMaxLengthErr}`)
    .custom(async (username: string) => {
      const isDuplicate = await existMemberByUsername(username);
      if (isDuplicate) {
        throw new Error(`username ${duplicateErr}`);
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`password ${emptyErr}`)
    .matches(/[A-Z]/)
    .withMessage(`password ${passwordUppercaseErr}`)
    .matches(/[0-9]/)
    .withMessage(`password ${passwordNumericErr}`)
    .matches(/[!@#$%^&*]/)
    .withMessage(`password ${passwordSpecialCharacterErr}`)
    .isLength({ min: 8 })
    .withMessage(`password ${passwordMinLengthErr}`)
    .isLength({ max: 72 })
    .withMessage(`password ${passwordMaxLengthErr}`)
    .customSanitizer(
      async (password: string) => await bcrypt.hash(password, 10),
    ),
  body("passwordConfirm")
    .trim()
    .customSanitizer(
      async (password: string) => await bcrypt.hash(password, 10),
    )
    .custom(async (passwordConfirm: string, { req }) => {
      const body = req.body as MemberRequest;
      if (await bcrypt.compare(body.password, passwordConfirm)) {
        throw new Error(passwordConfirmNotMatchErr);
      }
    }),
  body("firstName")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`first name ${emptyErr}`)
    .isAlpha()
    .withMessage(`first name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`first name ${nameLengthErr}`),
  body("lastName")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`last name ${emptyErr}`)
    .isAlpha()
    .withMessage(`last name ${alphaErr}`)
    .isLength({ min: 1, max: 15 })
    .withMessage(`last name ${nameLengthErr}`),
];
