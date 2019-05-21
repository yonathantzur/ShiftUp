module.exports = {
    CheckManager: (req, res, next) => {
        if (req.user.isManager) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
}