const exp=require("express")
const eventApp=exp.Router()
const expressAsyncHandler=require("express-async-handler")
const eventsModel=require("../Models/eventSchema")
//get All Events
eventApp.get("/events",expressAsyncHandler(async(req,res)=>{
  let currentDate = new Date();
  let EventsList = await eventsModel.find({ date: { $gt: currentDate } });
  if (EventsList.length > 0) {
    res.status(200).send({ message: "Events List", payload: EventsList });
  } else {
    res.status(200).send({ message: "No Upcoming Events" });
  }
}))
//Create Event
eventApp.post("/add-event",expressAsyncHandler(async(req,res)=>{
  let eventDetails = req.body;

  let eventInDb = await eventsModel.findOne({
    $and: [
            { title: eventDetails.title },
            { location: eventDetails.location },
            { date: eventDetails.date },
            {time:eventDetails.time}
          ]
      });

    if (eventInDb) {
          res.status(400).send({ message: "Event Already Present" });
    } else {
          let newEvent = new eventsModel(eventDetails);
          let newEventDoc = await newEvent.save();
          res.status(201).send({ message: "Event Added Successfully", payload: newEventDoc });
        }
}))

//Update An event 
eventApp.put("/events/:eventid",expressAsyncHandler(async(req,res)=>{
  let eventID=req.params.eventid.toString();
  let event=req.body
  let eventInDb=await eventsModel.findOneAndUpdate({_id : eventID},{$set:event},{new : true})
  if(eventInDb!=undefined){
    res.send({message:"Event Updated",payload:eventInDb})
  }else{
    res.send({message:"Event not prsent in DB"})
  }
}))
//Delete an Event 
eventApp.delete("/events/:eventid",expressAsyncHandler(async(req,res)=>{
  let eventID=req.params.eventid.toString();
  let eventInDb=await eventsModel.findOneAndDelete({_id : eventID})
  if(eventInDb!=undefined){
    res.send({message:"Event deleted",payload:eventInDb})
  }else{
    res.send({message:"Event not prsent in DB"})
  }
}))

module.exports=eventApp;