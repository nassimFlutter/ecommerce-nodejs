const slugify = require('slugify')
// eslint-disable-next-line import/no-extraneous-dependencies

const Product = require('../models/product');

const product = require('../models/product');

const factory = require('./handlers_factory');


// @ dec create  sub categories
// @ route '/api/v1/subcategory
// @ access private 
exports.createProduct = factory.createOne(Product);
// @ dec get list of sub categories
// @ route '/api/v1/subcategory
// @ access Public 
exports.getProducts = factory.getAll(Product);
// @ dec get specific subcategory
// @ route /api/v1/subcategory/:id
// @ public
exports.getOneProduct = factory.getOne(Product);
// @ dec update  sub categories
// @ route '/api/v1/subcategory
// @ access private 
exports.updateProduct = factory.updateOne(Product);
// @ dec delete  sub categories
// @ route '/api/v1/subcategory
// @ access private 
exports.deleteProduct = factory.deleteOne(Product);
// @ dec delete all categories
// @ route '/api/v1/subcategory
// @ access private 
exports.deleteAllProducts = factory.deleteAll(Product);
