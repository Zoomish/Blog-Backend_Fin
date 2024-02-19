import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const user = new User({ username, email, password: hashedPassword });


    try {
        await user.save();
        res.status(201).json(user)
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}