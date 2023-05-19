import jwt from "jsonwebtoken";
import config from "config";


export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        
        if (!token) {
            return res.status(401).json({message: "Ошибка авторизации! 1"})
        }
        const decoded = jwt.verify(token, config.get('secretKey'))
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: "Ошибка авторизации! 2"})
    }
}