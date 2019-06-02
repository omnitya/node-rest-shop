const express = require('express');
const router = express.Router();
const orderModel = require('../models/orderModel');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    orderModel.find()
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            products : docs.map(result =>{
                return {
                    product : result.product,
                    price : result.quantity,
                    Id : result._id,
                    request : {
                        type : 'GET',
                        productUrl : 'http://localhost:3000/products/' + result.product,
                        orderUrl : 'http://localhost:3000/orders/' + result._id
                    }
                }
            })
        }
        console.log(response);
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    if(mongoose.Types.ObjectId.isValid(orderId)){
        orderModel.findById(orderId)
        .exec()
        .then(result => {
            res.status(200).json({
                product : result.product,
                quantity : result.quantity,
                Id : result._id,
                request : {
                    type : 'GET',
                    productUrl : 'http://localhost:3000/products/' + result.product,
                    orderUrl : 'http://localhost:3000/orders/' + result._id
                }
            });  
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        })
    } else{
        console.log('Not a valid id');
        res.status(404).json({
            message : "No Entry found for provided order id."
        })
    }
});

router.post('/', (req, res, next) => {
    const order = new orderModel({
        _id : new mongoose.Types.ObjectId(),
        product : req.body.product,
        quantity : req.body.quantity
    });
    if(mongoose.Types.ObjectId.isValid(req.body.product)){
        order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                descr : 'Order Created Succesfully.',
                order : {
                    product : result.product,
                    quantity : result.quantity,
                    Id : result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            })
        }); 
    } else{
        res.status(404).json({
            message : 'Product Not Found!'
        })
    }
});

router.put('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    orderModel.update({_id : orderId}, { $set : updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            mesaage : 'Product Updated',
            request : {
                type : 'PUT',
                url : 'http://localhost:3000/orders/' + orderId
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

router.delete('/:orderId', (req, res, next) => {
    const productId = req.params.productId;
    if(mongoose.Types.ObjectId.isValid(req.body.product)){
        productModel.remove({
            _id : productId
        })
        .exec()
        .then(result =>{
            console.log('Deleted product item with id ::', productId);
            res.status(200).json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                err : err
            });
        });
    }
    else {
        console.log('No such product id found to delete');
        res.status(404).json({
            message : 'No such product id found to delete '+ productId
        });
    }
});

module.exports = router;