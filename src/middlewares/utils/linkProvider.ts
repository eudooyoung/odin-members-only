import type { RequestHandler } from "express";

const commonLink = [{ href: "/home", text: "Home" }];

const guestLink = [
  { href: "/auth/signup", text: "SignUp" },
  { href: "/auth/login", text: "Login" },
];

const memberLink = [
  { href: "/dashboard", text: "Dashboard" },
  { href: "/logout", text: "Logout" },
];

const linkProvider: RequestHandler = (req, res, next) => {
  if (req.user) {
    res.locals.links = [...commonLink, ...memberLink];
  }
  if (!req.user) {
    res.locals.links = [...commonLink, ...guestLink];
  }
  next();
};

export default linkProvider;
