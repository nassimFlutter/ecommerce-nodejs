const slugify = require('slugify');
const { check, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');

exports.getCategoryValidator = [
  check('id').isMongoId().withMessage('Invalid category id format'),
  validatorMiddleware,
];
