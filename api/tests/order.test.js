const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');  // Assuming you export your Express app from app.js or server.js
const Order = require('../models/orders');
const Product = require('../models/products');

require('dotenv').config()

console.log(process.env.TESTDB)
// Connect to a test database
beforeAll(async () => {
    await mongoose.connect(process.env.TESTDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

// Close the database connection after all tests
afterAll(async () => {
    await mongoose.connection.close();
});

// Mock Order and Product models
jest.mock('../models/orders');
jest.mock('../models/products');

describe('Orders API', () => {

    describe('GET /orders', () => {
        it('should get all orders', async () => {
            Order.find();

            const response = await request(app).get('/orders').set('Authorization', `Bearer ${process.env.ACCESSTOKEN}`);
            expect(response.status).toBe(200);
            expect(response.body.count).toBe(mockOrders.length);
        });
    });

    describe('POST /orders', () => {
        it('should create an order if product exists', async () => {
            const mockProductId = new mongoose.Types.ObjectId();
            const mockOrderId = new mongoose.Types.ObjectId();

            const mockProduct = { _id: mockProductId, name: 'Product 123' };
            const mockOrder = { _id: mockOrderId, product: mockProduct._id, quantity: 5 };

            Product.findById.mockResolvedValue(mockProduct);
            Order.prototype.save.mockResolvedValue(mockOrder);

            const response = await request(app).post('/orders').send({
                product: mockProduct._id,
                quantity: 5
            });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe("Order has been initiated");
        });

        it('should return 404 if product is not found', async () => {
            Product.findById.mockResolvedValue(null);

            const response = await request(app).post('/orders').send({
                product: new mongoose.Types.ObjectId(),
                quantity: 5
            });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe(`Product with id: ${response.body.product} not found`);
        });
    });

    describe('GET /orders/:orderId', () => {
        it('should get an order by ID', async () => {
            const mockOrderId = new mongoose.Types.ObjectId();
            const mockOrder = { _id: mockOrderId, product: 'Product123', quantity: 2 };
            Order.findById.mockResolvedValue(mockOrder);

            const response = await request(app).get(`/orders/${mockOrderId}`);
            expect(response.status).toBe(200);
            expect(response.body._id).toBe(mockOrderId.toString());
        });
    });

    describe('PUT /orders/:orderId', () => {
        it('should update an order by ID', async () => {
            const mockOrderId = new mongoose.Types.ObjectId();
            const mockOrder = { _id: mockOrderId, product: 'Product123', quantity: 3 };
            Order.findByIdAndUpdate.mockResolvedValue(mockOrder);

            const response = await request(app).put(`/orders/${mockOrderId}`).send({
                quantity: 3
            });

            expect(response.status).toBe(200);
            expect(response.body.updated).toBe(true);
        });

        it('should return 500 if order update fails', async () => {
            const mockOrderId = new mongoose.Types.ObjectId();
            Order.findByIdAndUpdate.mockRejectedValue(new Error("Update failed"));

            const response = await request(app).put(`/orders/${mockOrderId}`).send({
                quantity: 3
            });

            expect(response.status).toBe(500);
        });
    });

    describe('DELETE /orders/:orderId', () => {
        it('should delete an order by ID', async () => {
            const mockOrderId = new mongoose.Types.ObjectId();
            Order.deleteOne.mockResolvedValue({ deletedCount: 1 });

            const response = await request(app).delete(`/orders/${mockOrderId}`);
            expect(response.status).toBe(200);
            expect(response.body.message).toBe(`Deleted the order ${mockOrderId} successfully`);
        });

        it('should return 500 if order deletion fails', async () => {
            const mockOrderId = new mongoose.Types.ObjectId();
            Order.deleteOne.mockRejectedValue(new Error("Deletion failed"));

            const response = await request(app).delete(`/orders/${mockOrderId}`);
            expect(response.status).toBe(500);
        });
    });
});
