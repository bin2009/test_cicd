const authService = require('../services/authService');

const login = async (req, res) => {
    console.log('login: ', req.body);
    const response = await authService.loginService(req.body);
    const { refreshToken, errCode, ...other } = response;

    if (errCode === 200) {
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // true nếu sử dụng HTTPS
            path: '/',
            sameSite: 'strict',
        });
    }
    return res.status(errCode).json({ errCode, ...other });
};

const logout = async (req, res) => {
    const authorization = req.headers['authorization'];
    const response = await authService.logoutService(authorization);
    return res.status(response.errCode).json(response);
};

const refresh = async (req, res) => {
    // use authorization
    const authorization = req.headers['authorization'];
    const response = await authService.refreshService(authorization);
    return res.status(response.errCode).json(response);

    // use cookie
    // const refreshToken = req.cookies.refreshToken;
    // if (!refreshToken) {
    //     return res.status(401).json("you're not authenticated");
    // }

    // const response = await authService.refreshService(refreshToken);
    // if (response.errCode === 0) {
    //     res.cookie('refreshToken', response.newRefreshToken, {
    //         httpOnly: true,
    //         secure: false, // true nếu bạn sử dụng HTTPS
    //         path: '/',
    //         sameSite: 'strict',
    //     });
    //     const { newRefreshToken, ...other } = response;
    //     return res.status(200).json({ ...other });
    // } else {
    //     return res.status(response.errCode || 500).json(response.errMess);
    // }
};

const getOtpResetPass = async (req, res) => {
    const response = await authService.getOtpResetPassService(req.body.email);
    return res.status(response.errCode).json(response);
};

const requestResetPassword = async (req, res) => {
    const response = await authService.requestResetPasswordService(req.body.email);
    return res.status(response.errCode).json(response);
};

const resetForm = (req, res) => {
    const { token } = req.params;
    console.log(token);
    return res.render('reset', { token });
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({
            errCode: 400,
            message: 'Passwords do not match',
        });
    }

    const response = await authService.resetPasswordService(token, password);
    if (response.errCode == 404) {
        return res.send(response.message);
    }
    return res.status(response.errCode).json(response);
};

module.exports = {
    login,
    logout,
    refresh,
    getOtpResetPass,
    requestResetPassword,
    resetForm,
    resetPassword,
};
