import type { Middleware } from "../types/types";

export const signUpGet: Middleware = (req, res) => {
  res.render("index");
};
