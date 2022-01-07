import fs from "fs";
const Participant  = require("./Participant.js")

class ParticipantService {
    constructor() {

    }

    add(participant){
        fs.readFile( __dirname + "/" + "participants.json", 'utf8', function (err, participant) {
            participant = JSON.parse( participant );
            console.log( participant );
            res.end( JSON.stringify(participant));
         });
    }

    delete(participant){
        fs.readFile( __dirname + "/" + "participants.json", 'utf8', function (err, participant) {
            participant = JSON.parse( participant );
            delete participant;
            console.log( participant );
            res.end( JSON.stringify(participant));
         });
    }

    returnList(){
        fs.readFile( __dirname + "/" + "participants.json", 'utf8', function (err, data) {
            console.log( data );
            res.end( data );
         });
    }
    
}


export default ParticipantService
