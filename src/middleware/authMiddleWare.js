import jwt from 'jsonwebtoken';
import db from '~/models';
import { StatusCodes } from 'http-status-codes';

// const jwt = require('jsonwebtoken');
// const db = require('../models');
// const User = db.User;
// const emailController = require('../controllers/emailController');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    status: 'error',
                    message: 'Access denied',
                });
            }
            req.user = user;
            next();
        });
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            status: 'error',
            message: "You're not authenticated",
        });
    }
};

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'Admin') {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({
                status: 'error',
                message: "You're not allowed",
            });
        }
    });
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.role === 'Admin') {
            next();
        } else {
            return res.status(StatusCodes.FORBIDDEN).json({
                status: 'error',
                message: "You're not allowed",
            });
        }
    });
};

const optionalVerifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(StatusCodes.FORBIDDEN).json({
                    status: 'error',
                    message: 'Token is not valid',
                });
            }
            req.user = user;
        });
    }
    next();
};
const checkEmailExits = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await db.User.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).json({
                errCode: 3,
                errMess: 'Email already exists',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            errCode: 8,
            errMess: `Internal Server Error: ${error.message}`,
        });
    }
};

export const authMiddleWare = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization,
    optionalVerifyToken,
    checkEmailExits,
};

// module.exports = {
//     verifyToken,
//     verifyTokenAndAdmin,
//     verifyTokenUserOrAdmin,
//     checkEmailExits,
//     optionalVerifyToken,
// };
