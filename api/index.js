const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoute = require('./routes/products');
const register = require('./routes/register');
const login = require('./routes/login');
const stripe = require('./routes/stripe');
const users = require('./routes/users');
const orders = require('./routes/orders');

dotenv.config();

mongoose.connect(process.env.DB_URI).then(()=> console.log('DB connection successful'))
.catch((err)=> console.log('DB connection failed', err.message));

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products", productsRoute);
app.use("/api/stripe", stripe);
app.use("/api/users", users);
app.use("/api/orders", orders);

app.listen(process.env.PORT || 5000, 
    ()=> console.log(`Server started on port ${process.env.PORT}`));