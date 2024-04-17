import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'

export const test = (req, res) => {
    res.json({ message: 'Hello World' })
}

export const updateUser = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You can update only your account'))
    }
    if (req.body.params) {
        if (req.body.password.lenght < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'))
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    console.log(req.user);
}
