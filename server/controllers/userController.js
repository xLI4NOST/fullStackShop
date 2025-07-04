const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');



const generateJwt = (id, email, role) =>{
   return  jwt.sign(
        {id: id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration (req, res){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('Неккоректный email или password'))
        }

        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email не существует'))
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, role, password: hashedPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)

        return res.json({token})
    }

    async login (req, res){
        const {email, password} = req.body;
        const user = await User.findOne({where:{email}})

        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = await bcrypt.compareSync(password, user.password)

        if(!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check (req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController();