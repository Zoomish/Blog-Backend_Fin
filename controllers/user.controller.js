export const test = (req, res) => {
    res.json({ message: 'Hello World' })
}

export const updateUser = (req, res, next) => {
    console.log(req.user);
    res.json({ message: 'Update User' })
}
