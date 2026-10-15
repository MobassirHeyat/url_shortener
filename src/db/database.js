const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async() => {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongoDB");
}

module.exports = connectDB;