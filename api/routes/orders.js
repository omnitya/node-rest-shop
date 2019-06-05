const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderControllers = require('../controllers/orderController');

router.get('/', orderControllers.orders_get_all);

router.get('/:orderId', orderControllers.orders_get_order);

router.post('/', orderControllers.orders_create_order);

router.put('/:orderId', orderControllers.orders_update_order);

router.delete('/:orderId', orderControllers.orders_delete_order);

module.exports = router;