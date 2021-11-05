const { request } = require("express");
const express = require("express");
const userModel = require("../db/users");
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
                phoneNumber: request.body.phoneNumber
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

// route pour la connexion
app.get("/api/checkUser", async (request, response) => {
    userModel.findOne({email: request.query.email,password: request.query.password},function(err,user){
        if(!user){
            return response.status(404).json({email : "mail inexistant",password: "mot de passe incorrect"})
        }
        else{
            response.json({id: user.id})
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
module.exports = app;