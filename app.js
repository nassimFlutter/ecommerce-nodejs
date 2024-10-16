const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const ApiError = require('./utils/ApiError');
const globalError = require('./middlewares/errorMiddleware');
const subCategoryRoute = require('./routes/sub_category_route');
const brandRoute = require('./routes/brand_route');
const productRoute = require('./routes/product_route');

dotenv.config({ path: 'config/config.env' });

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`Node environment: ${process.env.NODE_ENV}`);
}

app.use('/api/v1', userRoutes); // Prefix routes with /api/v1
app.use('/api/v1', categoryRoutes); // Prefix routes with /api/v1
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brand', brandRoute);
app.use("/api/v1/products", productRoute);

app.get('/', (req, res) => {
  res.send("Our Api V1");
});

app.all("*", (req, res, next) => {
  next(new ApiError(`cant find the router  ${req.originalUrl}`, 400))
});
app.use(globalError);

module.exports = app;