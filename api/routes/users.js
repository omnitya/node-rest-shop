const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res, next) => {
    userModel.find({
        email : req.body.email
    })
    .exec()
    .then(user =>{
        if(user.length > 0){
            return res.status(409).json({
                message : 'The Email Id already exist ::' + req.body.email
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        error : err
                    });
                } else {
                    const user = new userModel({
                        _id : new mongoose.Types.ObjectId(),
                        email : req.body.email,
                        password : hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            descr : 'User Created Succesfully.',
                            product : {
                                email : result.email,
                                Id : result._id
                            }
                        });
                    })
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({
                            error : err
                        });
                    });
                }
            });
        }
    })
});

router.delete('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    if(mongoose.Types.ObjectId.isValid(userId)){
        userModel.findById(userId)
        .exec()
        .then(user =>{
            if(user == null){
                return res.status(404).json({
                    message : 'No Such User id Exist ::' + userId
                })
            } else {
                userModel.remove({
                    _id : userId
                })
                .exec()
                .then(result =>{
                    console.log('Deleted user ', result);
                    res.status(200).json({
                        message : 'Deleted User with id '+ userId
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({
                        err : err
                    });
                });
            }
        });

    }
    else {
        console.log('No such User found to delete');
        res.status(404).json({
            message : 'No such user id found to delete '+ userId
        });
    }
});

module.exports = router;