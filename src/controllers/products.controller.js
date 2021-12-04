const express = require('express');

const Product = require('../models/product.model');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    try {
        const user = req.user;
        const product = await Product.create({
            title: req.body.title,
            body: req.body.body,
            user: user.user._id,
        });

        return res.status(201).send(product);
    } catch (e) {
        res.status(500).send({
            message: e.message,
            status: 'Failed'
        });
    }
});

router.get('/', async (req, res) => {
    try {
              const users = await Product.find().lean().exec();
            return res.json({
                users
            });
            } catch (e) {
        res.status(500).send({
            message: e.message,
            status: 'Failed'
        });
    }
});

module.exports = router;