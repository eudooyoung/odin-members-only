import type { Middleware } from "../types/types.js";

const links = [
  { href: "/home", text: "Home" },
  { href: "/sign-up", text: "Sign Up" },
];

const passLinks: Middleware = (req, res, next) => {
  res.locals.links = links;
  next!();
};

export default passLinks;
