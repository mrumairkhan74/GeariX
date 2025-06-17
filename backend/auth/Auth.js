const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'UnAuthorized' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findOne({ email: decoded.email, _id: decoded.id })
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid user' });
        }
        req.user = user
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = { Auth }