const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const router = express.Router()

const User = require('../models/user');

router.get('/users', (req, res, next) => {
    User.find().then((results) => {
        res.status(200).json(results);
    }).catch((error) => {
        res.status(500).json(error);
    });
});


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (error, hashedPassword) => {
        if (error) {
            return res.status(500).json(error)
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                fullName: req.body.fullName,
                email: req.body.email,
                password: hashedPassword,
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
                userType: req.body.userType,
            });
            user.save().then((createdUser) => {
                console.log('User has been created!');
                res.status(201).json({
                    status: "success",
                    createdUser: createdUser,
                });
            }).catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
        }
    });
    
});








module.exports = router;