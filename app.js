/* eslint-disable no-undef */
const express = require('express');
// const mysql = require('mysql');
// const axios = require('axios')
require('dotenv').config();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
// const multer  = require('multer');

// const { DB_HOST, DB_USER, DB_PASSWORD ,DB_DATABASE} = process.env;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//change path for html present
app.use('/admin', express.static('public/admin'));
app.use('/user', express.static('public/sign'));
app.use('/', express.static('public'));

//img storage
app.use('/img', express.static('uploads'));

//---api---//
//marketing
const marketingRoutes = require('./api/1.0/marketing/marketing');
app.use('/api/1.0/marketing' , marketingRoutes);
//order
const ordersRoutes = require('./api/1.0/order/payments');
app.use('/api/1.0/order/payments' , ordersRoutes);

//user
const signupRoutes = require('./routes/user/sign');
const profileROutes = require('./routes/user/profile');
app.use('/user' , signupRoutes );
app.use('/user', profileROutes);
//admin
const productRoutes = require('./routes/admin/product');
const variantROutes = require('./routes/admin/variant');
const campaignsROutes = require('./routes/admin/campaigns');
const getOrdersROutes = require('./routes/admin/getOrders');


app.use('/admin/product' , productRoutes );
app.use('/admin/variant', variantROutes);
app.use('/admin/campaigns', campaignsROutes);
//midterm
app.use('/admin/getorders', getOrdersROutes);

const dataRoutes = require('./api/1.0/order/data');
app.use('/api/1.0/order/data' , dataRoutes );
//api
const productsRoutes = require('./api/1.0/products');
app.use('/api/1.0/products' , productsRoutes );
//order
const orderRoutes = require('./routes/order/checkout');
app.use('/order/checkout' , orderRoutes );


app.use((req, res, next) =>{ //  app error Middleware
    const err= new Error('NOT FOUND');
    next(err);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res ,next) => {  // error's handler
    // res.render('error',err);
    res.locals.error = err; // throw err in to locals.error
    res.send(err.status);
});

app.listen(port, ()=>{
    console.log(`now connet to port ${port}!!`);
});
