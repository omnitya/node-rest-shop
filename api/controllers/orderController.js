const orderModel = require('../models/orderModel');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    orderModel.find()
    // .populate('product','_id' )
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            orders : docs.map(result =>{
                return {
                    Id : result._id,
                    product : result.product,
                    quantity : result.quantity,
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
}

exports.orders_create_order = (req, res, next) => {
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
}

exports.orders_get_order = (req, res, next) => {
    const orderId = req.params.orderId;
    if(mongoose.Types.ObjectId.isValid(orderId)){
        orderModel.findById(orderId)
        .exec()
        .then(result => {
            console.log(result);
            if(result){
                res.status(200).json({
                    product : result.product,
                    quantity : result.quantity,
                    Id : result._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/orders/' + result._id
                    }
                });
            } else{
                res.status(404).json({
                    message : 'No Entry found for order id :: ' +orderId
                })
            }
            
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
            message : "No Entry found for provided orderId id."
        })
    }
}

exports.orders_delete_order = (req, res, next) => {
    const orderId = req.params.orderId;
    if(mongoose.Types.ObjectId.isValid(orderId)){
        orderModel.remove({
            _id : orderId
        })
        .exec()
        .then(result =>{
            console.log('Deleted order item with id ::', orderId);
            res.status(200).json({
                message : 'Deleted order item with id '+ orderId
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                err : err
            });
        });
    }
    else {
        console.log('No such orderId id found to delete');
        res.status(404).json({
            message : 'No such orderId id found :: '+ orderId
        });
    }
}

exports.orders_update_order = (req, res, next) => {
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
}