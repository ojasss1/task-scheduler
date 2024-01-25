const mongoose = require('mongoose');

const firstschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    age : {
        type : Number,
        required : true,
        trim : false,
    }
});

const firstmodel = mongoose.model("firstsdds", firstschema);


module.exports = firstmodel;