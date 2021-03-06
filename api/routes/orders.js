const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderControllers = require('../controllers/orderController');

router.get('/',checkAuth, orderControllers.orders_get_all);

router.get('/:orderId', checkAuth, orderControllers.orders_get_order);

router.post('/', checkAuth, orderControllers.orders_create_order);

router.put('/:orderId',checkAuth, orderControllers.orders_update_order);

router.delete('/:orderId', checkAuth, orderControllers.orders_delete_order);

module.exports = router;