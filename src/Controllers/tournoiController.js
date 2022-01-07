import TournoiService from "../Services/TournoiService"

function post(request,response){
    var response = TournoiService.ajouterTournoi(request.body.name)
    if (response.errorMessage != null){
        response.status(404).json({msg : response.errorMessage})
    }else{
        response.status(201).json({msg : response.tournoiId})
    }
}

const tournoiController = {post}

export default tournoiController