import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return next(errorHandler(400, 'All fields are required'))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const user = new User({ username, email, password: hashedPassword });

    try {
        await user.save();
        res.status(201).json(user)
        console.log(user);
    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(errorHandler(400, 'All fields are required'))
    }
    try {
        const user = await User.findOne({ email });
        if (user && bcryptjs.compareSync(password, user.password)) {
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '10d'
                }
            )

            const { password: pass, ...rest } = user._doc

            res.status(200).cookie('access_token', token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
                httpOnly: true
            }).json(rest)
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: 'Invalid credentials'
            })
        }
    } catch (error) {
        next(errorHandler(400, error))
    }
}

export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '10d'
                }
            )
            
        }
    } catch (error) {
        next(error)
    }
}