const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create product
router.post('/', async (req, res) => {
  try {
    const { name, quantity, pricePerQuantity, costprice, unit, shopname } = req.body;

    // Validate required fields
    if (!name || quantity === undefined || pricePerQuantity === undefined || !costprice || !unit || !shopname) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the unit is valid
    const validUnits = ['kg', 'Bag', 'Pac', 'Lit'];
    if (!validUnits.includes(unit)) {
      return res.status(400).json({ message: 'Invalid unit' });
    }

    // Check if product already exists
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }

    const newProduct = new Product({ name, quantity, pricePerQuantity, costprice, unit, shopname });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Sort by latest created
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { name, quantity, pricePerQuantity, costprice, unit, shopname } = req.body;

    // Validate required fields
    if (!name || quantity === undefined || pricePerQuantity === undefined || !costprice || !unit || !shopname) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the unit is valid
    const validUnits = ['kg', 'Bag', 'Pac', 'Lit'];
    if (!validUnits.includes(unit)) {
      return res.status(400).json({ message: 'Invalid unit' });
    }

    // Check if product exists before updating
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update fields
    product.name = name;
    product.quantity = quantity;
    product.pricePerQuantity = pricePerQuantity;
    product.costprice = costprice;
    product.unit = unit;
    product.shopname = shopname;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
