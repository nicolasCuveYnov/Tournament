const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  detail:{
      type:String,
      default:"Pas de description"
  },
  category:{
      type : String,
      required: true,
  },
  lat:{
      type: Number,
      required: true,
  },
  lng:{
      type: Number,
      required: true,
  },
  date:{
    type:Date,
    require:true,
  },
  startTime:{
    type:String,
    require: true
  },
  endTime:{
    type: String,
    require: true
  },
  createdBy:{
    type:String,
    require:true
  }
});

const Event = mongoose.model("events", EventSchema);

module.exports = Event;