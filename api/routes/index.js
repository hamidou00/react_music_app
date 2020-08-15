const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
        res.send("Hello, Welcome to my music app Api. See All the routes below :");
})

module.exports = router;