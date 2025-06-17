require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const UserRoutes = require('./routes/userRoutes')
const CarRoutes = require('./routes/CarRoutes')
const OrderRoutes = require('./routes/OrdeRoutes')



const app = express();

app.use(cors({
    origin: process.env.FRONTEND_API,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/user', UserRoutes)
app.use('/car', CarRoutes)
app.use('/cart', OrderRoutes)

const port = process.env.PORT
app.listen(port, () => {
    console.log('Connected Server')
})