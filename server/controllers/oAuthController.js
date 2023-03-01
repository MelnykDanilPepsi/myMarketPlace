import passport from "passport";


class OAuthController{
    google = {
        auth: {
            CLIENT_ID : "849956642787-k16pp1mfp1vp4fpi7k7o2uj7ue5oah95.apps.googleusercontent.com",
            CLIENT_SECRET:"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",
            REFRESH_TOKEN: "1//04kZ6tf51FZuvCgYIARAAGAQSNwF-L9Ir7u9_y0-PGI3R807Wb-nRK1gEsA9LvdqJ8B6Gyl3t57nAD495fVzD4rVsPrMDOp3Imig"
        },
        SERVER_ENDPOINT : "http://127.0.0.1:5001",
        OAUTH_REDIRECT_URL: "http://127.0.0.1:5001/auth/oauth/redirect",

        getGoogleCallBack: function (req, res){
            passport.authenticate('google',{
                successRedirect: '/auth/registration',
                failureRedirect: '/auth/registration',
            })
            res.end('Logged in!')
        }
    };

    // facebook = {
    //     auth: {
    //         CLIENT_ID: '1192364095495420',
    //         CLIENT_SECRET: 'e1e94a9f8fb35f904437adcd7722f87c',
    //     },
    //     SERVER_ENDPOINT : "http://127.0.0.1:5001",
    //     OAUTH_REDIRECT_URL: "https://127.0.0.1:5001/auth/oauth/redirect",
    //
    //     getFacebookCallBack : function (req,res){
    //         passport.authenticate('facebook', {
    //             failureRedirect: '/auth/registration',
    //             successRedirect: '/auth/registration',
    //         })
    //     }
    // };
}


export default new OAuthController();