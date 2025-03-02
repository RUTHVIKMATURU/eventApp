const exp =require("express")
const app=exp()
const mongoose=require("mongoose")
const port= process.env.PORT||5000;
const cors =require("cors")
require("dotenv").config();
app.use(cors())
// Import Api
const userApp=require("./APIs/userApi")
const eventApp=require("./APIs/eventApi");

mongoose.connect(process.env.DBURL)
.then(()=>{
  console.log("DB connection successful")
  app.listen(port,()=>{console.log(`server listening on port ${port}`)})
})
.catch((err)=>{
  console.log("Server Error",err);
})
//Body Parser
app.use(exp.json())

//User API
app.use("/user-api",userApp);
//Event API
app.use("/event-api",eventApp);


// error handler
app.use((err,req,res,next)=>{
  console.log("error object: ",err);
  res.send({message:err.message})
})