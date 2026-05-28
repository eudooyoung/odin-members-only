import type { RequestHandler } from "express";

const commonLink = [{ href: "/home", text: "Home" }];

const guestLink = [
  { href: "/signup", text: "SignUp" },
  { href: "/login", text: "Login" },
];

const memberLink = [
  { href: "/auth/dashboard", text: "Dashboard" },
  { href: "/auth/logout", text: "Logout" },
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
