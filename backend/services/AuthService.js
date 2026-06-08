const User = require('../models/User');

class AuthService {
    static async registerUser(userData) {
        const { name, email, password } = userData;
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }
        const user = new User({ name, email, password });
        await user.save();
        return user;
    }

    static async loginUser(loginData) {
        const { email, password } = loginData;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
}

module.exports = AuthService;