
//This file contains the schema for the items collection in the database
const mongoose = require('mongoose')

//declare schema
const Schema = mongoose.Schema

//create schema
const chatbot = new Schema({
  name: {
    type: String,
    require:true
  },
  item: {
    type: String,
    
  },
  phoneNumber: {
    type: String,
  }
}, { timestamps: true })





//create & export model based on schema
module.exports = mongoose.model('chatbots', chatbot)