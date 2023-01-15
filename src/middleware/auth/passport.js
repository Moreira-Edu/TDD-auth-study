import passport from "passport";
import passportjwt from "passport-jwt";
import database from "../../database/index.js";

const { Strategy, ExtractJwt } = passportjwt;

const params = {
  secretOrKey: process.env.SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const strategy = new Strategy(params, async (payload, done) => {
  try {
    const user = await database("users")
      .where(payload.id)
      .first();
    if (user) {
      done(null, { ...payload });
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});
passport
  .use(strategy);

export default passport;
