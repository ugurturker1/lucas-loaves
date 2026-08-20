import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';

import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();
const app = express();
app.use(express.json());

// --- CORS ---
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://localhost:5173', 
    'http://127.0.0.1:5173', 
    'https://127.0.0.1:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));


// --- SWAGGER ---
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: "Luca's Loaves API",
      version: '1.0.0',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 5000}` }
    ],
    paths: {
      '/api/products': {
        get: {
          summary: 'Fetches all products for the menu',
          responses: {
            '200': { description: 'Success' }
          }
        },
        post: {
          summary: 'Adds a new product to the database',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    price: { type: 'number' },
                    category: { type: 'string' },
                    description: { type: 'string' },
                    inStock: { type: 'boolean' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Product Created' }
          }
        }
      },
      '/api/products/{id}': {
        get: {
          summary: 'Fetches details of a single specific product',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            '200': { description: 'Success' }
          }
        },
        put: {
          summary: 'Updates an existing product completely',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    price: { type: 'number' },
                    category: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Product Updated' }
          }
        },
        patch: {
          summary: 'Partially updates an existing product',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    price: { type: 'number' },
                    category: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Product Partially Updated' }
          }
        },
        delete: {
          summary: 'Deletes a product from the database',
          parameters: [
            { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            '200': { description: 'Product Deleted' }
          }
        }
      },
      '/api/orders': {
        get: {
          summary: 'Fetches all orders',
          responses: {
            '200': { description: 'Success' }
          }
        },
        post: {
          summary: 'Submits a new guest order with customer details',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    items: { 
                      type: 'array', 
                      items: { 
                        type: 'object',
                        properties: {
                          productId: { type: 'string' },
                          quantity: { type: 'number' },
                          priceAtPurchase: { type: 'number' }
                        }
                      } 
                    },
                    totalPrice: { type: 'number' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    phoneNumber: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: {
            '201': { description: 'Order Placed' }
          }
        }
      },
      '/api/orders/{orderNumber}': {
        get: {
          summary: 'Retrieves a specific order status using its order number',
          parameters: [
            { name: 'orderNumber', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            '200': { description: 'Success' }
          }
        },
        put: {
          summary: 'Updates an existing order completely (items, customer details, status)',
          parameters: [
            { name: 'orderNumber', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    phoneNumber: { type: 'string' },
                    totalPrice: { type: 'number' },
                    items: { 
                      type: 'array', 
                      items: { 
                        type: 'object',
                        properties: {
                          productId: { type: 'string' },
                          quantity: { type: 'number' },
                          priceAtPurchase: { type: 'number' }
                        }
                      } 
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Order Updated' }
          }
        },
        patch: {
          summary: 'Partially updates an existing order',
          parameters: [
            { name: 'orderNumber', in: 'path', required: true, schema: { type: 'string' } }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    phoneNumber: { type: 'string' },
                    totalPrice: { type: 'number' }
                  }
                }
              }
            }
          },
          responses: {
            '200': { description: 'Order Partially Updated' }
          }
        },
        delete: {
          summary: 'Deletes an order from the database',
          parameters: [
            { name: 'orderNumber', in: 'path', required: true, schema: { type: 'string' } }
          ],
          responses: {
            '200': { description: 'Order Deleted' }
          }
        }
      }
    }
  },
  apis: [],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: savedProduct });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: error.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: `Product ${req.params.id} updated successfully`, updatedData: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: error.message });
  }
});

app.patch('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json({ message: `Product ${req.params.id} partially updated successfully`, updatedData: updatedProduct });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: error.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `Product ${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    
    let calculatedTotal = 0;
    if (req.body.items && req.body.items.length > 0) {
      calculatedTotal = req.body.items.reduce((sum, item) => {
        return sum + (item.quantity * item.priceAtPurchase);
      }, 0);
    }

    const orderNumber = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = new Order({ 
      ...req.body, 
      orderNumber,
      totalPrice: calculatedTotal 
    });
    
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: savedOrder });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: error.message });
  }
});

app.get('/api/orders/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber }).populate('items.productId');
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

app.put('/api/orders/:orderNumber', async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    
    if (updateData.items && updateData.items.length > 0) {
      updateData.totalPrice = updateData.items.reduce((sum, item) => {
        return sum + (item.quantity * item.priceAtPurchase);
      }, 0);
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      updateData,
      { new: true }
    );
    res.status(200).json({ message: `Order ${req.params.orderNumber} updated successfully`, updatedData: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: error.message });
  }
});

app.patch('/api/orders/:orderNumber', async (req, res) => {
  try {
    let updateData = { ...req.body };
    
    
    if (updateData.items && updateData.items.length > 0) {
      updateData.totalPrice = updateData.items.reduce((sum, item) => {
        return sum + (item.quantity * item.priceAtPurchase);
      }, 0);
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber }, 
      { $set: updateData }, 
      { new: true }
    );
    res.status(200).json({ message: `Order ${req.params.orderNumber} partially updated successfully`, updatedData: updatedOrder });
  } catch (error) {
    res.status(400).json({ message: "Bad request", error: error.message });
  }
});

app.delete('/api/orders/:orderNumber', async (req, res) => {
  try {
    await Order.findOneAndDelete({ orderNumber: req.params.orderNumber });
    res.status(200).json({ message: `Order ${req.params.orderNumber} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));