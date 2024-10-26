const slugify = require('slugify')
// eslint-disable-next-line import/no-extraneous-dependencies
const asyncHandler = require('express-async-handler');

const Product = require('../models/product');

const ApiError = require('../utils/ApiError');

const ApiFeatures = require('../utils/api_features');

const product = require('../models/product');

const factory = require('./handlers_factory');


// exports.setCategoryIdToBody = (req, res, next) => {
//     if (!req.body.category) req.body.category = req.params.categoryId;
//     next();

// };

// exports.setFilterObject = (req, res, next) => {
//     let filterObject = {};

//     if (req.params.productId)
//         filterObject = { category: req.params.categoryId };
//     req.filterObject = filterObject;
//     console.log(filterObject);
//     next();

// };
// @ dec create  sub categories
// @ route '/api/v1/subcategory
// @ access private 
exports.createProduct = asyncHandler(async (req, res, next) => {
    req.body.slug = slugify(req.body.title);
    const product = await Product.create(req.body);
    res.status(201).json({ data: product });
});
// @ dec get list of sub categories
// @ route '/api/v1/subcategory
// @ access Public 
exports.getProducts = asyncHandler(async (req, res, next) => {
    const countOfDocuments = await Product.countDocuments();
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search("Products")
        .filter()
        .sort()
        .limitFields()
        .paginate(countOfDocuments);

    // Ensure apiFeatures has mongooseQuery and paginationResult
    const { mongooseQuery, paginationResult } = apiFeatures;

    const products = await mongooseQuery;

    res.status(200).json({
        count: products.length,
        paginationInfo: paginationResult,
        data: products,
    });
});

// @ dec get specific subcategory
// @ route /api/v1/subcategory/:id
// @ public
exports.getOneProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ApiError(`No Product for this ${id}`, 404));
    }
    res.status(200).json({ data: product });
});
// @ dec update  sub categories
// @ route '/api/v1/subcategory
// @ access private 
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    req.body.slug = slugify(req.body.title);

    const product = await Product.findByIdAndUpdate(

        { _id: id },
        req.body
        ,
        {

            new: true,
        }

    );
    if (!product) {
        return next(new ApiError(`No Sub product for this ${id}`, 404));

    }
    res.status(200).json({ data: product });


});
// @ dec delete  sub categories
// @ route '/api/v1/subcategory
// @ access private 
exports.deleteProduct = factory.deleteOne(Product);
// @ dec delete all categories
// @ route '/api/v1/subcategory
// @ access private 
exports.deleteAllProducts = asyncHandler(async (req, res, next) => {
    await Product.deleteMany();
    res.status(204).send();

});
