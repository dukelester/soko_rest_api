const express = require('express');

const checkAuth = require('../middlewares/check-auth');
const { getAllOrders, createOrder, getOrderById, updateOrder, deleteOrder } = require('../controllers/orders');

const router = express.Router();

router.get('/', checkAuth, getAllOrders);

router.post('/', checkAuth, createOrder);


router.get('/:orderId', checkAuth, getOrderById);


router.patch('/:orderId', checkAuth, updateOrder);


router.delete('/:orderId', checkAuth, deleteOrder);


module.exports = router;