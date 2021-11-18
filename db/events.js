const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  detail:{
      type:String,
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
});

const Event = mongoose.model("events", EventSchema);

module.exports = Event;