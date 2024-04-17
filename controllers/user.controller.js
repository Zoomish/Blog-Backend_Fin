export const test = (req, res) => {
    res.json({ message: 'Hello World' })
}

export const updateUser = (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, 'You can update only your account'))
    }
    console.log(req.user);
    res.json({ message: 'Update User' })
}
