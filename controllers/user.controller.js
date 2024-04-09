export const test = (req, res) => {
    res.json({ message: 'Hello World' })
}

export const updateUser = (req, res, next) => {
    res.json({ message: 'Update User' })
}
