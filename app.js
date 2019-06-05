const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Handle incoming requests
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

//Mongo db connection info
mongoose.connect('mongodb+srv://'+ process.env.MONGO_ATLAS_USERNAME+ ':'+process.env.MONGO_ATLAS_PASSWORD+'@nodejsrestapp-ds9oy.mongodb.net/test?retryWrites=true&w=majority'
,{
    useNewUrlParser : true
}
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("h");
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(bodyParser.json());

//Commented out for future use of Access Control.
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers", "*"
//     );
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, UPDATE')
//         res.status(200);
//         res.json({});
//     }
// });

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

//Error Handle
app.use((req, res, next) =>{
    const error = new Error('Not Supported');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message || 'Something is not working as I am expecting it to work! Debug Time'
        }
    });
});

module.exports = app;