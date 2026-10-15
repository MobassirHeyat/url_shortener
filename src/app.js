const nanoid = require("nanoid");
const express = require("express");
const urlmodel = require("./models/url");
const cors = require("cors");

const app = express();

//middlerware to parse json data
app.use(express.json());
app.use(cors())
//post api , here client sends url --> generate code --> saves --> return the shorten url
app.post("/api/shorten", async(req, res)=> {
    // generate code with nanoid and save the corresponding url with it in database. 
    // and sends the shortend url to client.
    let {data} = req.body;
    let nan_code = nanoid.nanoid(8);
    console.log(data);
    let url = await urlmodel.create({
        originalUrl: data.url,
        shortCode: nan_code,
    })
    res.status(201).json(url);
    console.log(url);
})

//when client req from the shorten url it , this get api /:shortcode look up in databse and redirect the client to the original url 
app.get("/:shortcode", async(req, res)=>{
    let shortcode = req.params.shortcode;
    const url = await urlmodel.findOne({ shortCode: shortcode })
    console.log(shortcode);
    // write the logic to send back the orginal url when client req to with shortend url
    console.log(url);
    res.redirect(url.originalUrl);
})


module.exports = app;
