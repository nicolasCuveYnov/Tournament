/* eslint-disable */
const express = require("express");
const userModel = require("../db/users");
const eventModel = require("../db/events");
const { checkOrSetAlreadyCaught } = require("@sentry/utils");
const app = express();

// routes pour inscription
app.post("/api/inscription",async (request,response)=>{
    userModel.findOne({email: request.body.email}).then((user)=>{
        if(user){
            return response.status(400).json({email : "mail déja existant"})
        }else{
            const newUser = new userModel({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                phoneNumber: request.body.phoneNumber,
                proBoolean: request.body.proBoolean
            })
            newUser.save()
            return response.status(200).json({msg: newUser})
        }
    })
})

// routes récupérer tous les utilisateurs
app.get("/api/getAllUsers", async (request, response) => {
    const users = await userModel.find({});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

// app.post("/api/checkUser",async (request,response)=>{
//     userModel.findOne({email: request.body.email}).then((user,err)=>{
//         if(user.email == request.body.email){
//             if(user.password == request.body.password){
//                 return response.status(200).json({email : "identifiants corrects :)"})
//             }else{
//                 return response.status(400).json({email: "identifiants incorrects :("})
//             }
//         }
//     })
// })

app.post("/api/checkUser",async (request,response)=>{
    userModel.findOne({email: request.body.email}).then((user)=>{
        try{
            if(user.email == request.body.email){
                if(user.password == request.body.password){
                    return response.status(200).json(user)
                }else{
                    return response.status(400).json({msg : "mot de passe incorrect"})
                }
            }
        }catch(error){
            return response.status(400).json({msg:"adresse mail incorrect"})
        }
    })
})

// route update user
app.put("/api/updateUser",async(request,response)=>{
    // const filter = {_id : request.body.id}
    // const update = {toto : 89}
    let updates = request.body
    userModel.findOneAndUpdate({_id: request.body.id},updates,{new: true})
        .then(updateUser => response.json(updateUser))
        .catch(err => response.status(400).json("Error : "+err))
})

// routes récupérer tous les utilisateurs
app.get("/api/getAllEvents", async (request, response) => {
    const events = await eventModel.find({});
    try {
      response.send(events);
    } catch (error) {
      response.status(500).send(error);
    }
  });

// route création d'un event
app.post("/api/createEvent",async (request,response)=>{
    const event = new eventModel(request.body)
    try{
        await event.save()
        response.send(event)
    }catch(error){
        response.status(500).json({msg:error})
    }
})

// route ajout event à un utilisateur
app.put("/api/addEventToUser",async(request,response)=>{
    // const filter = {_id : request.body.id}
    // const update = {toto : 89}
    let updates = request.body
    updates = {
        "id":updates.id,
        "$addToSet":{"listEvents":updates.listEvents}
    }
    userModel.findOneAndUpdate({_id: request.body.id},updates,{new: true,upsert: true})
        .then(updateUser => response.json(updateUser))
        .catch(err => response.status(400).json("Error : "+err))
})

// route supprimer event à un utilisateur
app.put("/api/deleteEventFromUser",async(request,response)=>{
    // const filter = {_id : request.body.id}
    // const update = {toto : 89}
    let updates = request.body
    updates = {
        "id":updates.id,
        "$pull":{"listEvents":updates.listEvents}
    }
    userModel.findOneAndUpdate({_id: request.body.id},updates,{new: true,upsert: true})
        .then(updateUser => response.json(updateUser))
        .catch(err => response.status(400).json("Error : "+err))
})
// // route get events par user
app.get("/api/eventsByUserId", async (request, response) => {
    const users = await userModel.findOne({_id: request.body.id})
    const listOfId = users.listEvents
    try {
        const events = await eventModel.find().where("_id").in(listOfId).exec()
        response.send(events);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
module.exports = app;