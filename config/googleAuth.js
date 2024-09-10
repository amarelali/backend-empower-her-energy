const passport = require("passport");
require("dotenv").config();
const User = require("../models/userModel");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      const { name, id } = profile;
      try {
        let user = await User.findOne({ googleId: id });
        if (!user) {
          user = await new User({
            googleId: profile.id,
            firstName: name.givenName,
            lastName: name.familyName,
            email: profile.emails[0].value,
            is_verified:profile.emails[0].verified
          }).save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
      console.log("accessToken", accessToken);
      done(null, profile);
    }
  )
);


passport.serializeUser((user, done) => {
  // Serialize the user ID into the session
  console.log("serializeUser",user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by ID
    const user = await User.findById(id);
    console.log("deserializeUser",user);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
