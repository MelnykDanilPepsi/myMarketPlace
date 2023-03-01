import User from "../sevice/dbService/models/user.js";
import bcrypt from "bcrypt";
import fs from 'fs';
import multiparty from "multiparty";
import OAuthController from "./oAuthController.js";
import {google} from "googleapis";
import EmailService from "../sevice/email-service.js";



let code;

class AuthController {
    async loginController(req,res){
        try{
            const {email, password} = req.body;
            const candidate = User.findOne(email)
        }catch (e){
            res.status(400).json({message: 'Login error! (' + e + ')'})
        }
    }
    getChoosePage(req,res){
        res.render('choose',{
            title: 'Registration',
            back: '/home',
        });
    }
    getVerificationPage(req,res){
        res.render('verification',{
            title: 'Registration',
            userChoose: req.query.userChoose
        })
    }
    getLoginPage(req,res){
        res.render('login',
            {    title: 'Login',
                 back:'/home',

            });
    }

    async signUser(req,res){
        try{

            const id = Date.now().toString(36) + Math.random().toString(36).substring(2);
            const dirPath = createUserDir(id);
            const form = new multiparty.Form({uploadDir:dirPath});

            form.parse(req, async (err, fields, files)=>{

               let {firstname,lastname,gender,username, email, password, photoUrl} = getValuesFromForm(fields);

                const candidate = await User.findOne({username}) || await User.findOne({email});
                if (candidate){
                    return res.status(400).redirect('/auth/registration');
                }

                const hashPassword = bcrypt.hashSync(password, 7);

                email = email.toLowerCase();
                const lowerUsername = username.toLowerCase();


                if(files.photoUrl[0].originalFilename === ''){
                    console.log('no photo')
                    removeTrash(dirPath);
                    photoUrl = useDefaultImage(dirPath);
                } else {
                    console.log('is photo')

                    photoUrl = files.photoUrl.path;
                }
                const user = new User({ID:id, firstname, lastname, gender, username,lowerUsername,email , password : hashPassword, photoUrl})


                await user.save();
                res.redirect('/main/home')

            })
        }
        catch (e){
            res.redirect('/main/home');
        }
    }
    getTotalPage(req,res){
        res.render('total',{
            back:'/home',
        })
    }


    async  checkOnBusy(req,res){
        const value = req.body.value, valueType = req.body.valueType;
        if(await User.findOne({[valueType]:value})){
            res.end(JSON.stringify({flag:false}));
            return;
        }

        res.end(JSON.stringify({flag:true}))
    }
    sendRegistrationMail(req,res){
        const {userContactData, subject, text} = req.body;
        const obj = EmailService.sendRegistrationMail(userContactData,subject,text);

        code = obj.code;
        res.end(JSON.stringify({message:obj.flag}));
    };

    checkCode(req,res){
        console.log('correct code:' + code + ' \n userCode:' + req.body.code);
        if(code == req.body.code){
            res.end(JSON.stringify({flag:true}));
            return;
        }
        res.end(JSON.stringify({flag:false}));
    }
}


function useDefaultImage(path){
    const newPath = path += 'user.png';
    fs.copyFile('./public/user.png',newPath,(err)=>{
        if(err) throw err;
    })
    return newPath;
}
function createUserDir(userID) {
    const path = `./db/users/${userID}/`;
    fs.mkdir(path,{recursive: true},(err)=>{
        if(err) throw err;
    });
    return path;
}
function removeTrash(dir){
   fs.unlink(dir + '/' + fs.readdirSync(dir, err =>{
        if(err) throw err
    })[0], err => { if(err) throw err});
}
function getValuesFromForm(fields){
    const obj = {};
    for (const field in fields){
        obj[field] = fields[field][0]
    }

    return obj;
}

export default new AuthController;
