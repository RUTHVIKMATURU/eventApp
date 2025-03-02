const exp = require("express");
const userApp = exp.Router();
const expressAsyncHandler = require("express-async-handler");
const userschema = require("../Models/userSchema");

// Get User by Email
userApp.get("/user/:email",expressAsyncHandler(async (req, res) => {
      let userEmail = req.params.email;
      let userInDb = await userschema.findOne({ email: userEmail });

      if (userInDb) {
        return res.status(200).send({ message: "User found", payload: userInDb });
      } else {
        return res.status(404).send({ message: "No user with that email ID" });
      }
  })
);

// Create or Update User
userApp.post("/user",expressAsyncHandler(async (req, res) => {
      let userdata = req.body;
      let userInDb = await userschema.findOne({ email: userdata.email });

      if (userInDb) {
        if (Array.isArray(userInDb.role)) {
          if (!userInDb.role.includes(userdata.role)) {
            let updatedUser = await userschema.findOneAndUpdate(
              { email: userdata.email },
              { $push: { role: userdata.role } },
              { new: true }
            );
            return res.status(200).send({ message:updatedUser.role, payload: updatedUser });
          } else {
            return res.status(200).send({ message: "Role already exists", payload: userInDb });
          }
        } else if (userdata.role === userInDb.role) {
          return res.status(200).send({ message:userInDb.role, payload: userInDb });
        } else {
          return res.status(403).send({ message: "Invalid Role" });
        }
      }
      let newUser = new userschema(userdata);
      let newUserDoc = await newUser.save();
      return res.status(201).send({ message:userdata.role, payload: newUserDoc });
  })
);

module.exports = userApp;
