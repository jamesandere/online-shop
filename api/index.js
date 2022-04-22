const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const productsRoute = require('./routes/products');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/products", productsRoute);

app.listen(process.env.PORT || 5000, 
    ()=> console.log(`Server started on port ${process.env.PORT}`));