const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth')


router.get('/bienvenida/welcome', isAuthenticated, (req, res) => {
    res.render('bienvenida/welcome');
});

module.exports = router;