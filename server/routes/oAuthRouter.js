import express from "express"
const Router = express.Router();
import oAuthController from '../controllers/oAuthController.js';
import passport from "passport";


Router.get('/google', passport.authenticate('google', {scope : 'profile'}));
Router.get('/redirect', oAuthController.google.getGoogleCallBack);
// Router.get('/facebook', passport.authenticate('facebook',  { authType: 'reauthenticate', scope: ['user_friends', 'manage_pages'] }));

export default Router;