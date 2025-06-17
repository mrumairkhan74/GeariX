const express = require('express')
const { createUser, LoginUser, logoutUser, updateUser } = require('../controller/userController');
const { Auth } = require('../auth/Auth');
const router = express.Router()



router.post('/create', createUser);
router.post('/login', LoginUser);
router.get('/logout', logoutUser);
router.put('/update', updateUser);
router.get('/verify', Auth, (req, res) => {
    // `Auth` middleware already sets `req.user`
    res.status(200).json({ user: req.user })
});

module.exports = router