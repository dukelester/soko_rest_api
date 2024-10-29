const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const router = express.Router()

const User = require('../models/user');
const user = require('../models/user');

router.get('/', (req, res, next) => {
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


router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    
    User.findById({_id: id}).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(405).json(error);
    });
});

router.patch('/:userId', (req, res, next) => {
    const id = req.params.userId;
    const userBody = req.body;
    if (id && userBody) {
        User.findByIdAndUpdate({_id: id}, userBody, { new: true }).then((updatedUser) => {
            res.status(200).json({
                updated: "User updated successfully",
                updatedUser: updatedUser
            });
        }).catch((error) => {
            res.status(500).res.json(error);
        });
    }
});


router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({_id: id}).then(() => {
        res.status(200).json({
            delete: 'success',
            message: `Deleted the user with user id: ${id}`
        });
    }).catch((error) => {
        res.status(500).json(error);
    });
});



module.exports = router;