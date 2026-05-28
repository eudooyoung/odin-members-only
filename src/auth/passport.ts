import bcrypt from "bcryptjs";
import passport from "passport";
import passportLocal from "passport-local";
import { getMemberByUsername, getMemberById } from "../db/queries.js";

const LocalStrategy = passportLocal.Strategy;

export default passport.use(
  new LocalStrategy((username, password, done) => {
    void (async () => {
      try {
        const member = await getMemberByUsername(username);
        if (!member) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, member.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, member);
      } catch (err) {
        return done(err);
      }
    })();
  }),
);

passport.serializeUser((member, done) => {
  done(null, member.memberId);
});

passport.deserializeUser((memberId: number, done) => {
  void (async () => {
    try {
      const member = await getMemberById(memberId);
      done(null, member);
    } catch (err) {
      done(err);
    }
  })();
});
