import tournoiController from "./tournoiController";
const express = require("express");
const ParticipantService = require('./ParticipantService')
const TournoiService = require('./TournoiService')



const app = express();

// Ajouter participant
app.post("/api/addParticipant",async (request,response)=>{
    ParticipantService.add(request.body)

})

// Supprimer un participant
app.delete("/api/deleteParticipant", async (request, response) => {

  });

// Récuperer liste des participants 
app.get("/api/getParticipants", async (request, response) => {
    ParticipantService.get(request)

  });

// Ajout d'un tournoi
app.post("/api/addTournoi",tournoiController.post)

// Recuperer un tournoi
app.get("/api/getTournoi", async (request, response) => {


  });

// Recuperer nb max de participants d'un tournoi 
app.get("/api/getNbMaxParticipants", async (request, response) => {


  });

module.exports = app;