import type { Middleware } from "../types/types";

const links = [
  { href: "/home", text: "Home" },
  { href: "/sign-up", text: "Sign Up" },
];

export const linkMiddleware: Middleware = (req, res, next) => {
  res.locals.links = links;
  next!();
};
