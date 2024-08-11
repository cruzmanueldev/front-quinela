import config from "./../../../config"
import { 
    DATA_PREDICTIONS_MATCHES,
    GET_DATA_LAST_MATCHES,
    GET_DATA_MATCHES,
    SHOW_DATE_MATCHES_EM
} from "./../../../Constants/Matches/Matches"
import { notifyAlert, notifySuccess } from '../../../Functions/notifications';
import { GetDataNextMatchesReducer } from "../Home/Home";

export const GetDataLastMatchesReducer = (selid) => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "matches/last-matches",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                selid : selid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_LAST_MATCHES,
                payload : data.data
            })

        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const EditCloseMatchReducer = (goal, match, value) => async (dispatch, getState) =>{
    const { rex_data_next_matches } = getState().home;
    console.log(match)
    rex_data_next_matches.map(dat => {
        if(match.partid == dat.partid){
            dat[goal] = parseInt(value)
        }
    })
}

export const ResetMatchPredictionReducer = () => async (dispatch, getState) =>{
    dispatch({
        type : DATA_PREDICTIONS_MATCHES,
        payload : {
            nameWinA : null,
            imageWinA : null,
            nameWinB : null,
            imageWinB : null,
            nameWinC : null,
            imageWinC : null,
            nameWinD : null,
            imageWinD : null,
            nameWinE : null,
            imageWinE : null,
            nameWinF : null,
            imageWinF : null,
            nameLoserE : null,
            imageLoserE : null,
            nameLoserF : null,
            imageLoserF : null,
        }
    })
}

export const EditWinMatchPredictionReducer = (team, icon, match, teamLoser, iconLoser) => async (dispatch, getState) =>{

    const { rex_data_predictions_matches } = getState().matches;

    if(match == "A"){
        if(rex_data_predictions_matches.nameWinA != team){
            rex_data_predictions_matches.nameWinA = team
            rex_data_predictions_matches.imageWinA = icon
        }else{
            rex_data_predictions_matches.nameWinA = null
            rex_data_predictions_matches.imageWinA = null
        }
        rex_data_predictions_matches.nameWinE = null
        rex_data_predictions_matches.imageWinE = null
    }else if(match == "B"){
        if(rex_data_predictions_matches.nameWinB != team){
            rex_data_predictions_matches.nameWinB = team
            rex_data_predictions_matches.imageWinB = icon
            
        }else{
            rex_data_predictions_matches.nameWinB = null
            rex_data_predictions_matches.imageWinB = null
        }
        rex_data_predictions_matches.nameWinE = null
        rex_data_predictions_matches.imageWinE = null
    }
    else if(match == "C"){
        if(rex_data_predictions_matches.nameWinC != team){
            rex_data_predictions_matches.nameWinC = team
            rex_data_predictions_matches.imageWinC = icon
        }else{
            rex_data_predictions_matches.nameWinC = null
            rex_data_predictions_matches.imageWinC = null
        }
        rex_data_predictions_matches.nameWinF = null
        rex_data_predictions_matches.imageWinF = null
        rex_data_predictions_matches.nameLoserE = null
        rex_data_predictions_matches.imageLoserE = null
        rex_data_predictions_matches.nameLoserF = null
        rex_data_predictions_matches.imageLoserF = null

    }else if(match == "D"){
        if(rex_data_predictions_matches.nameWinD != team){
            rex_data_predictions_matches.nameWinD = team
            rex_data_predictions_matches.imageWinD = icon
        }else{
            rex_data_predictions_matches.nameWinD = null
            rex_data_predictions_matches.imageWinD = null
        }
        rex_data_predictions_matches.nameWinF = null
        rex_data_predictions_matches.imageWinF = null
    }else if(match == "E"){
        if(rex_data_predictions_matches.nameWinE != team){
            rex_data_predictions_matches.nameWinE = team
            rex_data_predictions_matches.imageWinE = icon
        }else{
            rex_data_predictions_matches.nameWinE = null
            rex_data_predictions_matches.imageWinE = null
        }
        if(rex_data_predictions_matches.nameLoserE != teamLoser){
            rex_data_predictions_matches.nameLoserE = teamLoser
            rex_data_predictions_matches.imageLoserE = iconLoser
        }else{
            rex_data_predictions_matches.nameLoserE = null
            rex_data_predictions_matches.imageLoserE = null
        }

    }else if(match == "F"){
        if(rex_data_predictions_matches.nameWinF != team){
            rex_data_predictions_matches.nameWinF = team
            rex_data_predictions_matches.imageWinF = icon
        }else{
            rex_data_predictions_matches.nameWinF = null
            rex_data_predictions_matches.imageWinF = null
        }
        if(rex_data_predictions_matches.nameLoserF != teamLoser){
            rex_data_predictions_matches.nameLoserF = teamLoser
            rex_data_predictions_matches.imageLoserF = iconLoser
        }else{
            rex_data_predictions_matches.nameLoserF = null
            rex_data_predictions_matches.imageLoserF = null
        }

    }

    dispatch({
        type : DATA_PREDICTIONS_MATCHES,
        payload : rex_data_predictions_matches
    })
}

export const CloseMatchReducer = (partid) => async (dispatch, getState) =>{

    const { rex_data_next_matches } = getState().home;
    const matchUpdate = rex_data_next_matches.find(par => par.partid == partid)

    if ((!("req_pargoalaway" in matchUpdate) || (isNaN(matchUpdate.req_pargoalaway))) 
        || (!("req_pargoalhome" in matchUpdate) || (isNaN(matchUpdate.req_pargoalhome)) )) {
            notifyAlert("Los goles no son validos")
        return false
    }

    await fetch(config.apiUrl + "quinela/close-match",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_partid      : partid,
                req_selhome     : matchUpdate.parlocalsel.selid,
                req_selaway     : matchUpdate.parvisitasel.selid,
                req_pargoalhome : matchUpdate.req_pargoalhome,
                req_pargoalaway : matchUpdate.req_pargoalaway
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            notifySuccess(data.message)
        }else{
            notifyAlert(data.message)
        }
        dispatch(GetDataNextMatchesReducer())
    })
    .catch((error) => {
        console.log(error)
    })
}

export const DisableMatchReducer = (partid) => async (dispatch, getState) =>{
    await fetch(config.apiUrl + "matches/disable-match",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_partid : partid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            notifySuccess(data.message)
        }else{
            notifyAlert(data.message)
        }
        dispatch(GetDataNextMatchesReducer())
    })
    .catch((error) => {
        console.log(error)
    })
}


export const GetDataMatchesReducer = () => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "matches/all",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                tornid : localStorage.getItem('tornid')
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_MATCHES,
                payload : data.data
            })

        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const ShowDateMatchReducer = (date) => async (dispatch, getState) =>{
    dispatch({
        type    : SHOW_DATE_MATCHES_EM,
        payload : date
    })
}