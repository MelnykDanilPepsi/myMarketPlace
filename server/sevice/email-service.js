import nodemailer from 'nodemailer';
import OAuthController from "../controllers/oAuthController.js";
import {google} from "googleapis";

const oAuth2Client = new google.auth.OAuth2(OAuthController.google.auth.CLIENT_ID ,OAuthController.google.auth.CLIENT_SECRET);
oAuth2Client.setCredentials({refresh_token: OAuthController.google.auth.REFRESH_TOKEN});
const accessTkn = await oAuth2Client.getAccessToken()


class EmailService {
    sendRegistrationMail(email, subject, text){
        let flag;
        const code = Math.floor(100000 + Math.random() * 900000);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            authentication: 'plain',
            auth: {
                type: 'oAuth2',
                user: 'realasapgarage@gmail.com',
                clientId: OAuthController.google.auth.CLIENT_ID,
                clientSecret : OAuthController.google.auth.CLIENT_SECRET,
                refreshToken:OAuthController.google.auth.REFRESH_TOKEN,
                accessToken: accessTkn,
            }
        });
        const options = {
            from: 'realasapgarage@gmail.com',
            to: email,
            subject: subject,
            html: text + `<h2 style="text-align: center">${code}</h2>`
        }

        transporter.sendMail(options, (err, info)=>{
            if(err) {
                flag = false;
                return {code, flag};
            }
            else console.log('Email sent:' + info.response);
        })
        flag = true;
        return {code, flag};
 }

}

export default new EmailService()