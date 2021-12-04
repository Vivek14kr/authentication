const express = require('express');
const {
    register,
    login
} = require('./controllers/auth.controller');
const {
    body
} = require('express-validator');
const app = express();


app.use(express.json());
const productController = require('./controllers/products.controller');
app.post(
    '/signup',
    body('name')
    .isLength({
        min: 4,
        max: 20,
    })
    .withMessage(
        'name is required'
    ),
    body('email').custom(async value => {
        const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);

        if (!isEmail) {
            throw new Error('please Enter valid email');
        }

        return true;
    }),
    body('password').custom(async value => {
        const isPassword = value
       

        if (!isPassword) {
            throw new Error(
                'please enter password in right format'
            );
        }

        return true;
    }),
    register
);
app.post(
    '/signin',
    body('email').custom(async value => {
        const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(value);

        if (!isEmail) {
            throw new Error('please Enter valid email');
        }

        return true;
    }),
    body('password').custom(async value => {
        const isPassword = 
            value
       

        if (!isPassword) {
            throw new Error(
                'please Enter a correct password'
            );
        }

        return true;
    }),
    login
);
app.use('/products', productController);

module.exports = app;