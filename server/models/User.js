import {Schema, model} from "mongoose";

const User = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    ad: {type: String, default: 0},
    avatar: {type: String}
})

export default model('User', User)