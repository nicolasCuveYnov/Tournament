import fs from "fs";
const Tournoi  = require("./Tournoi.js")


class TournoiService {
    constructor() {

    }


    add(tournoi){
        fs.readFile( __dirname + "/" + "tournoi.json", 'utf8', function (err, tournoi) {
            tournoi = JSON.parse( tournoi );
            console.log( tournoi );
            res.end( JSON.stringify(tournoi));
         });
    }

    recuperer(Id){

    }

    getNbMaxParticipans()

    
}


module.exports = TournoiService
