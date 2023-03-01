import express from "express"
const Router = express.Router();
import AuthController from "../controllers/authController.js"
import oAuthRouter from "../routes/oAuthRouter.js"



Router.route('/login')
    .post(AuthController.loginController)
    .get(AuthController.getLoginPage)

Router.route('/registration')
    .post(AuthController.signUser)
    .get(AuthController.getChoosePage);

Router.get('/verification', AuthController.getVerificationPage);

Router.post('/CheckLogin', AuthController.checkOnBusy);

Router.post('/sendRegistrationMail', AuthController.sendRegistrationMail);

Router.post('/checkCode',AuthController.checkCode);

Router.route('/total')
    .get(AuthController.getTotalPage)
    .post(AuthController.signUser)

Router.use('/oauth',oAuthRouter)

export default Router;