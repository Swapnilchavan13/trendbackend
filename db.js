const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://swapnil:swapnil@cluster0.ghocflp.mongodb.net/Banner?retryWrites=true&w=majority")

module.exports={
    connection
}