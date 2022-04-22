const router = require('express').Router();
const products = require('../data');

router.get('/', (req, res) => {
    res.send(products)
})

module.exports = router;