const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    date: { type: Date, required: true, index: true },
    time: { type: String, required: true},
    duration: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdUserEmail: { type: String, required: true} 
  },{timestamps:true},
  {"strict":"throw"}
);

const EventModel = mongoose.model("Event", eventSchema);
module.exports = EventModel;
