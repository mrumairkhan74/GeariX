const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const cookie = require('cookie-parser')

const userModel = require('../models/userModel')


// create User

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ error: error.message })
        }

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({
            name, email, password: hashPassword
        })
        const token = jwt.sign({ email: user.email, name: user.name, id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
        res.cookie('token', token);

        return res.status(201).json({ message: 'Created Successfully', user: { email: user.email, name: user.name, id: user._id, role: user.role } })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// user Login
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ error: "Invalid Credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Password" })
        }
        const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' })
        res.cookie('token', token)
        return res.status(200).json({ message: 'Successfully Login', user: { email: user.email, name: user.name, id: user._id, role: user.role } })
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// update user 
const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userId = req.params.id;

        let updateData = { name, email };

        if (password) {
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Logout User
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, // Set to true if you're using HTTPS in production
            sameSite: "None", // "Lax" for most cases, "None" if used across domains
        });

        return res.status(200).json({ message: "Logout Successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};



module.exports = {
    LoginUser,
    createUser,
    updateUser,
    logoutUser
}