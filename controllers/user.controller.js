import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'

export const test = (req, res) => {
    res.json({ message: 'Hello World' })
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You can update only your account'))
    }
    if (req.body.params) {
        if (req.body.password.lenght < 6) {
            return next(
                errorHandler(400, 'Password must be at least 6 characters')
            )
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if (req.body.username) {
        if (req.body.username.lenght < 7 || req.body.username.lenght > 20) {
            return next(
                errorHandler(
                    400,
                    'Username must be between 7 and 20 characters'
                )
            )
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(
                errorHandler(
                    400,
                    'Username can only contain letters and numbers'
                )
            )
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            {
                new: true,
            }
        )
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
    console.log(req.user)
}
