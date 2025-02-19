const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique: true,  // Ensure unique product names
    trim: true,  
    maxlength: [20, 'Product name must be at most 10 characters long'],  // Maximum length of 10 characters
  },

  shopname: {
    type: String,
    trim: true,  // Ensure no extra spaces are stored
    maxlength: [20, 'Shop name must be at most 50 characters long'],  // Optional: Maximum length constraint
  },

  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be greater than or equal to 0'],
    default: 0,  // Default value to prevent undefined errors
  },
 
  costprice: {
    type: Number,
    required: true,
    min: [0, 'Cost price must be greater than or equal to 0'],
  },
  
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'Bag', 'Pac', 'Lit'],  // Valid options for unit
    default: 'kg',  // Default value for unit if not provided
  }
}, { timestamps: true });

// Create an index for optimized searching
productSchema.index({ name: 1, shopname: 1 });  // Optimized search for both product name and shop name

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
