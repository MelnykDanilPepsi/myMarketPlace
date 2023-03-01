import {Schema, model} from "mongoose";



const User = new Schema({
    ID: {type: String, unique: true, required: true},
    firstname :  {type: String, unique: false, required: false},
    lastname: {type: String, unique: false, required: false},
    gender: {type: String, unique: false, required: false},
    username: {type: String, unique: true, required: true },
    lowerUsername:{type: String, unique: true, required: true},
    phone:{type: String, unique: true, required: false},
    email: {type:String, unique: true, required: false},
    password: {type:String, unique: false, required: true },
    photoUrl: {type: String, required: false}
});

export default  model('User', User, 'Users');