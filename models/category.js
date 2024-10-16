const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [32, 'Name must be less than 32 characters long'],
    unique: [true, "Category name must be unique."]
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true // Ensure slug uniqueness
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
},

);



const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
