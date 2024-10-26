const asyncHandler = require('express-async-handler');

const ApiError = require('../utils/ApiError');

const ApiFeatures = require('../utils/api_features');

exports.deleteOne = (Model) => asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
        return next(new ApiError(`No document for this ${id}`, 404));
    }
    res.status(204).send();
});