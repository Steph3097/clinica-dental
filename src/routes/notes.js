const router = require('express').Router();

router.get('/notes', (req, res) => {
    res.send('notes desde BD');
});
module.exports = router;