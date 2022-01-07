import tournoiRepoJson from "../repositories/repositoryJson.js";

const Tournoi  = require("./Tournoi.js")

function ajouterTournoi(nomDuTournoi){
    var tournoiIsExist = tournoiRepoJson.tournoiIsExist(nomDuTournoi);
    if(tournoiIsExist)
        return {error:"Un tournoi porte déja ce nom"}
    var tournoiCreate = tournoiRepoJson.sauvegarderTournoi(new Tournoi(nomDuTournoi))
    return {msg : tournoiCreate}
}


const TournoiService ={ajouterTournoi}

module.exports = TournoiService
