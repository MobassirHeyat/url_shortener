const mongoose = require("mongoose");
const { Schema } = mongoose;

// models/Url.js
const urlSchema = new Schema({
    originalUrl: String,      // required
    shortCode: String,        // unique, indexed
    createdAt: { type: Date, default: Date.now },
    expiresAt: Date,          // optional
    clicks: { type: Number, default: 0 },
    userId: String          // optional, if you add auth
})
const urlmodel = mongoose.model("url", urlSchema);

module.exports = urlmodel;