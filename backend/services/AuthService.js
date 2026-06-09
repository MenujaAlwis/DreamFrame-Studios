const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
    static generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        });
    }

    static async registerUser(userData) {
        const { name, email, password, role } = userData;
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'client',
        });
        const token = this.generateToken(user._id);
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    static async loginUser(loginData) {
        const { email, password } = loginData;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = this.generateToken(user._id);
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    static getUserData (user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    }
}

module.exports = AuthService;