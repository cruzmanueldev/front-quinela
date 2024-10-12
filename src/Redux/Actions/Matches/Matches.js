import config from "./../../../config"
import { 
    DATA_PREDICTIONS_MATCHES,
    GET_DATA_LAST_MATCHES,
    GET_DATA_MATCHES,
    SHOW_DATE_MATCHES_EM,
    DATA_ALL_PREDICTIONS_MATCHES,
    DATA_SELECTIONS_MATCHES,
    CURRENT_DATE_MATCH,
    GET_DATA_NEXT_MATCHES_TEAM
} from "./../../../Constants/Matches/Matches"
import { notifyAlert, notifySuccess } from '../../../Functions/notifications';
import { GetDataNextMatchesReducer } from "../Home/Home";

export const GetDataPredictionReducer = () => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "matches/data-prediction",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_tornid : parseInt(localStorage.getItem('tornid'))
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch(SaveDataPredictionReducer(data.data))
            dispatch({
                type : CURRENT_DATE_MATCH,
                payload : data.data.fec.fecid
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const GetDataNextMatchesTeamReducer = (selid) => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "matches/next-matches-team",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
            },
            body : JSON.stringify({
                req_tornid  : parseInt(localStorage.getItem('tornid')),
                req_selid   : selid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_NEXT_MATCHES_TEAM,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const CleanDataJourneyPredictionReducer = (fecid) => async (dispatch, getState) =>{

    let { rex_data_all_predictions_matches } = getState().matches;

    rex_data_all_predictions_matches.forEach(mat => {
        if(mat.fecid == fecid && (mat.paractivo == true)){
            mat.pargolesvisita = null
            mat.pargoleslocal = null
            mat.parganador = null
            mat.parfinalizado = false
        }
    })

    dispatch({
        type : DATA_ALL_PREDICTIONS_MATCHES,
        payload : rex_data_all_predictions_matches
    })

    dispatch(CalculateDataPredictionReducer())
}


export const UpdateDataPredictionReducer = (partid, ghome, gaway) => async (dispatch, getState) =>{

    let { rex_data_all_predictions_matches } = getState().matches;

    rex_data_all_predictions_matches.forEach(mat => {
        if(mat.partid === partid){
            mat.pargoleslocal = ghome
            mat.pargolesvisita = gaway

            if(!isNaN(mat.pargoleslocal) && !isNaN(mat.pargolesvisita)){
                mat.parganador = mat.pargoleslocal > mat.pargolesvisita 
                                ? mat.parlocalsel.selid
                                : mat.pargoleslocal < mat.pargolesvisita
                                    ? mat.parvisitasel.selid
                                    : null
                mat.parfinalizado = true
            }
        }
    })

    dispatch({
        type : DATA_ALL_PREDICTIONS_MATCHES,
        payload : rex_data_all_predictions_matches
    })
}

export const CalculateDataPredictionReducer = () => async (dispatch, getState) =>{


    let { rex_data_all_predictions_matches, rex_data_selections_matches } = getState().matches;

    rex_data_selections_matches.forEach(team => {
        const mats = rex_data_all_predictions_matches.filter(mat => mat.parlocalsel.selid == team.selid || mat.parvisitasel.selid == team.selid)
        team['pj'] = mats.filter(mat => mat.parfinalizado == true).length
        team['pg'] = mats.filter(mat => mat.parganador == team.selid).length
        team['pp'] = mats.filter(mat => mat.parganador != team.selid && mat.parganador != null && mat.parfinalizado == true).length

        team['pe'] = team['pj'] - team['pg'] - team['pp']

        const ptsWin = (mats.filter(mat  => mat.parganador == team.selid && mat.parfinalizado == true).length)*3
        const ptsDraw   = (mats.filter(mat  => mat.parganador == null && mat.parfinalizado == true).length)
        team['ptos'] = ptsWin + ptsDraw

        if(team.selid == 6){
            team['ptos'] = team['ptos'] - 3
        }

        const gf = mats.reduce((acc, match) => {
            if (match.parlocalsel.selid === team.selid && match.parfinalizado) {
                console.log(parseInt(match.pargoleslocal))
              return acc + parseInt(match.pargoleslocal);
            } else if (match.parvisitasel.selid === team.selid && match.parfinalizado) {
                return acc + parseInt(match.pargolesvisita);
            }else{
                return acc;
            }
        }, 0);

        const gc = mats.reduce((acc, match) => {
            if (match.parlocalsel.selid === team.selid && match.parfinalizado) {
              return acc + parseInt(match.pargolesvisita);
            } else if (match.parvisitasel.selid === team.selid && match.parfinalizado) {
                return acc + parseInt(match.pargoleslocal);
            }else{
                return acc;
            }
        }, 0);

        team['dg']   = gf+':'+gc
        team['dfg']  = gf - gc
        team['gf']   = gf
        team['gc']   = gc
    })

    rex_data_selections_matches.sort((a, b) => {
        if (a.ptos !== b.ptos) {
            return b.ptos - a.ptos;
        } else {
            if (a.dfg !== b.dfg) {
                return b.dfg - a.dfg;
            } else {
                return b.gf - a.gf;
            }
        }
    })


    dispatch({
        type : DATA_SELECTIONS_MATCHES,
        payload : rex_data_selections_matches
    })
}

export const SaveDataPredictionReducer = (data) => async (dispatch, getState) =>{

    let teams = data.teams    
    
    teams.forEach(team => {
        const mats = data.mats.filter(mat => mat.parlocalsel.selid == team.selid || mat.parvisitasel.selid == team.selid)
        team['pj'] = mats.filter(mat => mat.parfinalizado == true).length
        team['pg'] = mats.filter(mat => mat.parganador == team.selid).length
        team['pp'] = mats.filter(mat => mat.parganador != team.selid && mat.parganador != null && mat.parfinalizado == true).length

        team['pe'] = team['pj'] - team['pg'] - team['pp']

        const ptsWin = (mats.filter(mat  => mat.parganador == team.selid && mat.parfinalizado == true).length)*3
        const ptsDraw   = (mats.filter(mat  => mat.parganador == null && mat.parfinalizado == true).length)
        team['ptos'] = ptsWin + ptsDraw

        if(team.selid == 6){
            team['ptos'] = team['ptos'] - 3
        }

        const gf = mats.reduce((acc, match) => {
            if (match.parlocalsel.selid === team.selid && match.parfinalizado) {
              return acc + match.pargoleslocal;
            } else if (match.parvisitasel.selid === team.selid && match.parfinalizado) {
                return acc + match.pargolesvisita;
            }else{
                return acc;
            }
        }, 0);



        const gc = mats.reduce((acc, match) => {
            if (match.parlocalsel.selid === team.selid && match.parfinalizado) {
              return acc + match.pargolesvisita;
            } else if (match.parvisitasel.selid === team.selid && match.parfinalizado) {
                return acc + match.pargoleslocal;
            }else{
                return acc;
            }
        }, 0);

        team['dg']   = gf+':'+gc
        team['dfg']  = gf - gc
        team['gf']   = gf
        team['gc']   = gc
    })

    teams.sort((a, b) => {
        if (a.ptos !== b.ptos) {
            return b.ptos - a.ptos;
        } else {
            if (a.dfg !== b.dfg) {
                return b.dfg - a.dfg;
            } else {
                return b.gf - a.gf;
            }
        }
    })

    dispatch({
        type : DATA_ALL_PREDICTIONS_MATCHES,
        payload : data.mats
    })

    dispatch({
        type : DATA_SELECTIONS_MATCHES,
        payload: teams
    })

}

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
                req_pargoalaway : matchUpdate.req_pargoalaway,
                req_tornid : parseInt(localStorage.getItem('tornid'))
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