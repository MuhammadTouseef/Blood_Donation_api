const express = require("express");
const colors = require("colors");
const mongoose = require("mongoose");
const path = require("path");
const errorHandler = require("./middleware/error");
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const morgan = require("morgan");
const blood = require('./models/Bloodbank')

// Routes Import
const auth = require("./routes/auth")
const bloodbank = require("./routes/bloodBank")
const campaaign = require("./routes/campaign")
const user = require("./routes/user")
const {add} = require("nodemon/lib/rules");



const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/blood-donation?authSource=admin`, () => {
    console.log(`MongoDB Connected: ${mongoose.connection.host}`.cyan.underline.bold);
});

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());


app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/auth", auth);
app.use("/api/v1/bloodbank", bloodbank);
app.use("/api/v1/campaign", campaaign);
app.use("/api/v1/user", user);


const addbloodbanks = async()=>{
    let len = await blood.count()

    if(len === 0){
        await blood.create([
                {
                    "name": "Blood Bank, PIMS Hospital",
                    "address": "G 8/3 G-8, Islamabad",
                    "phonenumber": "123456778"
                },
                {
                    "name": "Pakistan Thalassemia Center",
                    "address": "Jinnah Avenue, F-9, Islamabad",
                    "phonenumber": "123456778"
                }
            ]
        )
    }

}
addbloodbanks()

app.use(errorHandler);



const PORT = process.env.PORT || 5000;
const server = app.listen(
    PORT, () => {
        console.log(
            `Server running in ${process.env.NODE_ENV} mode on ports ${PORT}`.yellow.bold
        )
    }
);
