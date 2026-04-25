const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Use user.id if your primary key isn't explicitly named 'uid'
        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                uid: user.uid || user.id, 
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        // Security: Use 401 for both cases to prevent email enumeration
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Ensure user.uid matches what you defined in the User model
        const payload = {
            uid: user.uid || user.id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                uid: user.uid || user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = { login, signup };