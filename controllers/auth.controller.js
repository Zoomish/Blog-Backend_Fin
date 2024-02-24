import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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
    const { username, password } = req.body;
    if (!username || !password) {
        return next(errorHandler(400, 'All fields are required'))
    }
    try {

    } catch (error) {
        next(errorHandler(400, error))
    }
}