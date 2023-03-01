import passport from "passport";
import passport_google from "passport-google-oauth20";
import OAuthController from "../../controllers/oAuthController.js";
import facebook from "passport-facebook"

const GoogleStrategy =  passport_google.Strategy,
    FacebookStrategy = facebook.Strategy;

passport.serializeUser((user, done) =>{
    done(null, user.id)
})


passport.deserializeUser((user, done)=>{
    done(null, user);
})

passport.use(new GoogleStrategy({
        clientID:     OAuthController.google.auth.CLIENT_ID,
        clientSecret: OAuthController.google.auth.CLIENT_SECRET,
        callbackURL: OAuthController.google.OAUTH_REDIRECT_URL,
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile)
       cb(null, profile)
    }
));

// passport.use(new FacebookStrategy({
//     clientID: OAuthController.facebook.auth.CLIENT_ID,
//     clientSecret: OAuthController.facebook.auth.CLIENT_SECRET,
//     callbackURL: 'http://localhost:3000/auth/facebook/redirect',
//
//     function(accessToken, refreshToken, profile, cb) {
//         console.log(profile)
//         cb(null, profile)
//     }
// }))
export default passport;