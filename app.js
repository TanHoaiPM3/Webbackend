const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
  }));
  
app.use(express.json());

app.use('/api/products', require('./routes/productRoutes'));
//app.use('/api/import-orders', require('./routes/importOrderRoutes'));
//app.use('/api/export-orders', require('./routes/exportOrderRoutes'));
//app.use('/api/export-orders', require('./routes/exportOrderRoutes'));


const PORT = process.env.PORT || 3567;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
