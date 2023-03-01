import express from "express"
const Router =  express.Router();
import MainRouter from "./mainRouter.js";
import AuthRouter from "./authRouter.js";

Router.use('/auth',AuthRouter);
Router.use('/main',MainRouter);

Router.get('/', (res,req)=>{
    req.redirect('main/home');
})

export default Router;

