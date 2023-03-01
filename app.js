import express from "express";
import handlebars from "express-handlebars";
import routes from "./server/routes/index.js";
import mongoose from "mongoose";
import path from "path"
import passport from "passport";
import google_passport from "./server/sevice/oAuth/authenticate.js"

const __dirname = path.resolve();


const app = express();

//view engine setup

app.engine(
    'handlebars',
    handlebars.engine({defaultLayout: 'main'})
)


app.set("views", "./ui/views");
app.set("view engine", "handlebars");

//mongo setup
mongoose.set({strictQuery: false})

const HOST = '127.0.0.1', PORT = process.env.PORT || 5001;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));




app.use(passport.initialize());

//routes
app.use(express.static(path.join(__dirname, '/ui/public')))
app.use(routes);



    app.listen(PORT,HOST, async ()=>{
         await connectDB().catch(e => console.log(e));
        console.log(`Server listens http://${HOST}:${PORT}`)
    })



async function connectDB(){
        await mongoose.connect('mongodb+srv://Danylo:Danylo@firstproject.vm2p5dz.mongodb.net/Placer?retryWrites=true&w=majority');

}

