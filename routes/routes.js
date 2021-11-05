const { request } = require("express");
const express = require("express");
const userModel = require("../db/users");
const app = express();

/*app.post("/api/inscription", async (request, response) => {
    const user = new userModel(request.body);
    try {
      await user.save();
      console.log("Post OK")
      response.send(user);
    } catch (error) {
        console.log("Erreur 500")
        response.status(500).send(error);
    }
});*/

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

app.get("/api/getAllUsers", async (request, response) => {
    const users = await userModel.find({});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });


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


module.exports = app;