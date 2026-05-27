import { body } from "express-validator";
import { existMemberByUsername } from "../../db/queries.js";
import type { MemberRequest } from "../../models/memberRequest.dto.js";
import bcrypt from "bcryptjs";

const emptyErr = "must be present";
const usernameMinLengthErr = "must be more than 5 characters";
const usernameMaxLengthErr = "must be less than 31 characters";
const emailErr = "must be email";
const duplicateErr = "already in use";
const passwordMinLengthErr = "must be more than 7 characters ";
const passwordMaxLengthErr = "must be less than 73 characters ";
const passwordUppercaseErr = "must contain an uppercase letter";
const passwordNumericErr = "must contain a number";
const passwordSpecialCharacterErr = "must contain a special character";
const passwordConfirmNotMatchErr = "password don't match";
const alphaErr = "must only contain alphabet characters";
const nameLengthErr = "must be between 1 and 15 characters";

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
