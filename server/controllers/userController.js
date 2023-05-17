import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import User from '../models/User.js'
import config from "config";
import {check, validationResult} from "express-validator";
import {authMiddleware} from "../middleware/auth.middleware.js"


export const register = async (req, res) => {

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        
        const {name, lastname, email, password, phone} = req.body
console.log(name, '\\' , lastname, '\\' , email, '\\' , password, '\\' , phone)
        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `Пользователь с почтой ${email} был создан. Авторизуйтесь, пожалуйста :3`})
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const user = new User({name, lastname, email, password: hashPassword, phone})
        await user.save()
        return res.json({message: "Пользователь был успешно создан :3"})

    } catch (error) {
        console.log(error)
        res.send({message: "Server error!"})
    }
}

export const login =async (req, res) => {

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
        const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "7d"})
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
}

export const auth = async (req, res) => {

    try {
        const user = await User.findOne({_id: req.user.id})
        const token = jwt.sign({id: user._id}, config.get("secretKey"), {expiresIn: "7d"})
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
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id
        await User.updateOne(
            {
                _id: userId
            },
          {
            name: req.body.name,
            lastname: req.body.lastname, 
            email: req.body.email,
            phone: req.body.phone,
          }
        )
          .then(() => {
            res.status(200).send({ message: "Ваши данные были успешно обновлены." });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({ message: "Ошибка обновления данных." });
          });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить ваши данные" });
      }
}