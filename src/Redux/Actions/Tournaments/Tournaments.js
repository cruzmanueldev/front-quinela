import config from "./../../../config"
import { 
    GET_DATA_POSITIONS_PREDICTION_TOURNAMENT,
    GET_DATA_POSITIONS_TOURNAMENT,
    GET_DATA_TOURNAMENTS
} from "./../../../Constants/Tournaments/Tournaments"

export const GetDataAllMatchesReducer = () => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "matches/all-matches",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            // console.log(data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const GetDataTournamentsReducer = () => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "tournaments/all",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_TOURNAMENTS,
                payload : data.data
            })

        }
    })
    .catch((error) => {
        console.log(error)
    })
}


export const GetPositionsTournamentReducer = () => async (dispatch, getState) => {

    await fetch(config.apiUrl + "tournaments/positions",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "usutoken" : localStorage.getItem('usutoken'),

            },
            body : JSON.stringify({
                tornid : parseInt(localStorage.getItem('tornid'))
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type    : GET_DATA_POSITIONS_TOURNAMENT,
                payload : data.data
            })

            // console.log(data.data)
            dispatch({
                type    : GET_DATA_POSITIONS_PREDICTION_TOURNAMENT,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })

}