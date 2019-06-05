const productModel = require('../models/productModel');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    productModel.find()
    .select('name price _id')
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            products : docs.map(doc =>{
                return {
                    name : doc.name,
                    price : doc.price,
                    Id : doc._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/products/'+ doc._id
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

exports.products_get_product = (req, res, next) => {
    const productId = req.params.productId;
    if(mongoose.Types.ObjectId.isValid(productId)){
        productModel.findById(productId)
        .exec()
        .then(result => {
            console.log(result);
            if(result){
                res.status(200).json({
                    name : result.name,
                    price : result.price,
                    Id : result._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/products/' + result._id
                    }
                });
            } else{
                res.status(404).json({
                    message : "No Entry found for provided product id."
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
            message : "No Entry found for provided product id."
        })
    }
}

exports.products_create_product = (req, res, next) => {
    const product = new productModel({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                descr : 'Product Created Succesfully.',
                product : {
                    name : result.name,
                    price : result.price,
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
}

exports.products_update_product = (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    for(const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    productModel.update({_id : productId}, { $set : updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
}

exports.products_delete_product = (req, res, next) => {
    const productId = req.params.productId;
    if(mongoose.Types.ObjectId.isValid(productId)){
        productModel.remove({
            _id : productId
        })
        .exec()
        .then(result =>{
            console.log('Deleted product item with id ::', productId);
            res.status(200).json({
                message : 'Deleted product item with id '+ productId
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
        console.log('No such productId id found to delete');
        res.status(404).json({
            message : 'No such productId id found to delete '+ productId
        });
    }
}