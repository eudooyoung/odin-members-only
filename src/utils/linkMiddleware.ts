import type { RequestHandler } from "express";

const links = [
  { href: "/home", text: "Home" },
  { href: "/sign-up", text: "Sign Up" },
  { href: "/login", text: "Login" },
];

const linkMiddleware: RequestHandler = (req, res, next) => {
  res.locals.links = links;
  next();
};

export default linkMiddleware;
