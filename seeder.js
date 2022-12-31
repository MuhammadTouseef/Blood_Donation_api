const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');

const BloodBank = require("./models/Bloodbank")

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/blood-donation?authSource=admin`, () => {
    console.log(`MongoDB Connected: ${mongoose.connection.host}`.cyan.underline.bold);
});

const blood = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/bloodbanks.json`, 'utf-8')
);
