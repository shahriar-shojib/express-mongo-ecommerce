require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;
const db = require('./config/db');
db(); //connect to db

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//import routes
const productsRoute = require('./routes/products');
const userRoute = require('./routes/user/user');
const adminRoute = require('./routes/admin/admin');
const promoRoute = require('./routes/promo');

//use routes
app.use('/products', productsRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/promo', promoRoute);
//start the server
app.listen(port, () => console.log('Server Started on Port: ' + port));
