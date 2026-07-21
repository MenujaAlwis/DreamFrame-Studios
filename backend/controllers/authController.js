const AuthService = require('../services/AuthService');

const registerUser = async (req, res, next) => {
    try {
        const result = await AuthService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            ...result
        });
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const result = await AuthService.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            ...result
        });
    } catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const user = AuthService.getUserData(req.user);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
};