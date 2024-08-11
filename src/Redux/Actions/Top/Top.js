import { notifyAlert } from "../../../Functions/notifications"
import { GetDataMatchesReducer } from "../Matches/Matches"
import config from "./../../../config"
import { 
    SHOW_MODAL_MENU,
    GET_DATA_USER
} from "./../../../Constants/Top/Top"

export const ShowModalMenuReducer = (showModal) => async (dispatch, getState) => {
    
    dispatch({
        type    : SHOW_MODAL_MENU,
        payload : showModal
    })
}

export const ValidateUserReducer = (tornid = null) => async (dispatch, getState) =>{

    let response = false

    const usutoken = localStorage.getItem('usutoken')
    if(!usutoken){
        return false
    }

    await fetch(config.apiUrl + "auth/validate-user",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "usutoken" :  usutoken,
                "tornid" : tornid ? tornid : localStorage.getItem('tornid')
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_USER,
                payload : data.data
            })
            localStorage.setItem('usutoken', data.data.usutoken)
            localStorage.setItem('tornid', data.data.tornid)
            localStorage.setItem('tornombre', data.data.tornombre)
            
            if(tornid){
               await dispatch(GetDataMatchesReducer())
            }

            response = true
        }else{
            notifyAlert(data.message)
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}

export const AuthLoginReducer = (data) => async (dispatch, getState) =>{

    let response = false

    await fetch(config.apiUrl + "auth/login",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                // "reqtoken" : usutoken
            },
            body:JSON.stringify(data)
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_USER,
                payload : data.data
            })
            localStorage.setItem('usutoken', data.data.usutoken)
            localStorage.setItem('tornid', data.data.tornid)
            localStorage.setItem('tornombre', data.data.tornombre)
            localStorage.setItem('usuusuario', data.data.usuusuario)
            response = true
        }else{
            notifyAlert(data.message)
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}


export const AuthLogoutReducer = () => async (dispatch, getState) =>{
    dispatch({
        type : GET_DATA_USER,
        payload : {}
    })

    localStorage.removeItem('tornid')
    localStorage.removeItem('tornombre')
    localStorage.removeItem('usutoken')
}
// export const GetJourneysReducers = () => async (dispatch, getState) =>{

//     const usutoken = localStorage.getItem('usutoken')

//     await fetch(config.apiUrl + "matches/get-journeys",
//         {
//             mode: "cors",
//             method : "POST",
//             headers : {
//                 "Accept": "application/json",
//                 "Content-type":"application/json",
//                 "reqtoken" : usutoken 
//             },
//         },
//     )
//     .then( res => res.json())
//     .then(async data => {
//         if(data.response){
//             dispatch({
//                 type : GET_DATA_JOURNEYS,
//                 payload : data.data
//             })

//         }
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// }