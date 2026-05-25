import bcrypt from "bcryptjs";
import passport from "passport";
import passportLocal from "passport-local";
import { getUserById, getUserByUsername } from "../db/queries";

const LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    void (async () => {
      try {
        const user = await getUserByUsername(username);
        const match = await bcrypt.compare(password, user.password);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })();
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.userId);
});

passport.deserializeUser((userId: number, done) => {
  void (async () => {
    try {
      const user = await getUserById(userId);
      done(null, user);
    } catch (err) {
      done(err);
    }
  })();
});
