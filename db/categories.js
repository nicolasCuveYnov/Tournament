const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    list:{
        type: Array,
        required:true
    }
});

const Category = mongoose.model("categories", CategorySchema);

module.exports = Category;