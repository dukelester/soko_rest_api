const { default: mongoose } = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = (req, res, next) => {
    user.find().then((results) => {
        res.status(200).json(results);
    }).catch((error) => {
        res.status(500).json(error);
    });
}

exports.createUser = (req, res, next) => {
    User.find({ email: req.body.email }).then((user) => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Invalid user credentials. Use another email instead'
            });
        } else{
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
        }
    });
}

exports.userLogin = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            res.status(401).json({
                error: 'Authentication Failure. Check your Credentials'
            });
        } else {
            bcrypt.compare(req.body.password, user.password, (error, result) => {
                if (error) {
                    res.status(401).json({
                        error: 'Authentication Failure. Check your Credentials'
                    });
                } else if (result) {
                    const token = jwt.sign({
                        email: user.email, userId: user._id
                    }, process.env.JWT_KEY, 
                    {
                        expiresIn: "1h"
                    })
                    res.status(200).json({
                        message: 'Login Successful!',
                        token: token
                    });
                } else {
                    res.status(401).json({
                        error: 'Authentication Failure. Check your Credentials'
                    });
                }
            });
        }
    }).catch((error) => {
        res.status(404).json({
            message: 'Login failed. Check your credentials',
            error: error.message
        });
    });
}

exports.getUserDetails = (req, res, next) => {
    const id = req.params.userId;
    
    User.findById({_id: id}).then((result) => {
        res.status(200).json(result);
    }).catch((error) => {
        res.status(405).json(error);
    });
}

exports.updateUser = (req, res, next) => {
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
}

exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({_id: id}).then(() => {
        res.status(200).json({
            delete: 'success',
            message: `Deleted the user with user id: ${id}`
        });
    }).catch((error) => {
        res.status(500).json(error);
    });
}