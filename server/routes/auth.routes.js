import Router from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import {check, validationResult} from "express-validator";
const router = new Router()
import {authMiddleware} from "../middleware/auth.middleware.js"




router.post('/registration', 
    [
        check('email', "Неправильный email").isEmail(),
        check('password', "Пароль должен быть длиннее 3 и короче 12 символов").isLength({min: 3, max: 12})
    ],
    
    async (req, res) => {

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        
        const {name, lastname, phone, email, password,  ad} = req.body

        const candidate = await UserModel.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `Пользователь с почтой ${email} был создан. Авторизуйтесь, пожалуйста :3`})
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const user = new UserModel({name, lastname, phone, email, password: hashPassword,  ad})
        await user.save()
        return res.json({message: "Пользователь был успешно создан :3"})

    } catch (error) {
        console.log(error)
        res.send({message: "Server error!"})
    }
})


router.post('/login', 
    async (req, res) => {

    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if(!user) {
            return res.status(404).json({message: "Пользователь не найден"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if(!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
        }
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "23h"})
        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                lastname: user.lastname,
                email: user.email,
                avatar: user.avatar,
                ad: user.ad
            }
        })
    } catch (error) {
        console.log(error)
        res.send({message: "Server error!"})
    }
})

router.get('/auth', authMiddleware,
    async (req, res) => {

    try {
        const user = await user.findOne({_id: req.user.id})
        const token = jwt.sign({id: user._id}, config.get("secretKey"), {expiresIn: "7d"})
        return res.json({
            token,
            user: {
                id: user.id,
                phone: user.phone,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                avatar: user.avatar,
                ad: user.ad
            }
        })
    } catch (error) {
        console.log(error)
        res.send({message: "Server error!"})
    }
})


export default router