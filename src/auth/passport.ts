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
        const match = await bcrypt.compare(password, member.password);
        if (!member) {
          return done(null, false, { message: "Incorrect username" });
        }
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

passport.serializeUser((user, done) => {
  done(null, user.memberId);
});

passport.deserializeUser((userId: number, done) => {
  void (async () => {
    try {
      const user = await getMemberById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })();
});
