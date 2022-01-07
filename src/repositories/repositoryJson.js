import fs from "fs";

const jsonFile = "../Datas/tournois.json"

function tournoiIsExist(nomDuTournoi){
    const jsonTournois = JSON.parse(fs.readFileSync(jsonFile))
    var tournoiSameName = jsonTournois.filter((nomDuTournoi)=> nomDuTournoi.name == nomDuTournoi)
    return tournoiSameName.length > 0
}

function sauvegarderTournoi(tournoi){
    const jsonTournois = JSON.parse(fs.readFileSync(jsonFile))
    jsonTournois.push(tournoi)
    fs.writeFileSync(jsonFile,JSON.stringify(jsonTournois))
    return tournoi.id
}
const tournoiRepoJson={
    tournoiIsExist,
    sauvegarderTournoi
}

export default tournoiRepoJson