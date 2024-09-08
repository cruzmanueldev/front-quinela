import config from "./../../../config"
import { 
    GET_DATA_HISTORICAL_QUINELA_USERS,
    GET_DATA_POSITIONS_USERS,
} from "./../../../Constants/Users/Users"

export const GetDataPositionsUsersReducer = (tornid) => async (dispatch, getState) =>{

    let req_tornid
    if(!tornid){
        req_tornid = parseInt(localStorage.getItem('tornid'))
    }else{
        req_tornid = tornid
    }

    await fetch(config.apiUrl + "users/ranking",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_tornid : req_tornid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_POSITIONS_USERS,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const GetDataQuinelaUserReducer = (usuid) => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "quinela/history-user",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_usuid : usuid,
                req_tornid : parseInt(localStorage.getItem('tornid'))
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_HISTORICAL_QUINELA_USERS,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}
