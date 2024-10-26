const slugify = require('slugify')
const asyncHandler = require('express-async-handler');

const Brand = require('../models/brand');

const ApiError = require('../utils/ApiError');

const ApiFeatures = require('../utils/api_features');

const factory = require('./handlers_factory');

exports.setCategoryIdToBody = (req, res, next) => {
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();

};

exports.setFilterObject = (req, res, next) => {
    let filterObject = {};

    if (req.params.categoryId)
        filterObject = { category: req.params.categoryId };
    req.filterObject = filterObject;
    console.log(filterObject);
    next();

};
// @ dec create  brand
// @ route '/api/v1/brand
// @ access private 
exports.createBrand = asyncHandler(async (req, res, next) => {

    const { name } = req.body;
    const brand = await Brand.create({ name, slug: slugify(name) });
    res.status(201).json({ data: brand });
});
// @ dec get list of sub categories
// @ route '/api/v1/subcategory
// @ access Public 
exports.getBrands = asyncHandler(async (req, res, next) => {
    const countOfDocuments = await Brand.countDocuments();
    const apiFeatures = new ApiFeatures(Brand.find(), req.query)
        .search()
        .filter()
        .sort()
        .limitFields()
        .paginate(countOfDocuments);

    const { mongooseQuery, paginationResult } = apiFeatures;

    const brands = await mongooseQuery;
    res.status(200).json({ result: brands.length, paginationResult, data: brands });

});
// @ dec get specific subcategory
// @ route /api/v1/subcategory/:id
// @ public
exports.getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
        return next(new ApiError(`No Brand for this ${id}`, 404));
    }
    res.status(200).json({ data: brand });
});
// @ dec update  brand
// @ route '/api/v1/brand
// @ access private 
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const brand = await Brand.findByIdAndUpdate(

        { _id: id },
        {
            name, slug: slugify(name),

        }
        ,
        {

            new: true,
        }

    );
    if (!brand) {
        return next(new ApiError(`No Sub Category for this ${id}`, 404));

    }
    res.status(200).json({ data: brand });


});
// @ dec delete  brand
// @ route '/api/v1/brand
// @ access private 
exports.deleteBrand = factory.deleteOne(Brand);
// @ dec delete all categories
// @ route '/api/v1/brand
// @ access private 
exports.deleteBrands = asyncHandler(async (req, res, next) => {
    await Brand.deleteMany();
    res.status(204).send();

});