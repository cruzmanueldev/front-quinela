import { notifyAlert, notifySuccess } from "../../../Functions/notifications";
import config from "./../../../config"
import { 
    DATA_FORM_QUINELA,
    DATA_STATISTICS_FORM_QUINELA,
    GET_DATA_NEXT_MATCHES,
    SHOW_MODAL_FORM_QUINELA,
    SHOW_MODAL_STATISTICS_QUINELA
} from "./../../../Constants/Home/Home"

export const ShowModalFormQuinelaReducer = ( state ) => async (dispatch, getState) => {

    const { rex_data_next_matches } = getState().home;

    dispatch({
        type    : SHOW_MODAL_FORM_QUINELA,
        payload : state
    })

    const dataQuinela = [].concat(rex_data_next_matches)
    
    dispatch({
        type    : DATA_FORM_QUINELA,
        payload : dataQuinela
    })
}

export const ShowModalStatisticsQuinelaReducer = ( state ) => async (dispatch, getState) => {

    dispatch({
        type    : SHOW_MODAL_STATISTICS_QUINELA,
        payload : state
    })
}

export const EditDataFormQuinelaReducer = ( goals, id, name ) => async (dispatch, getState) => {

    const { rex_data_form_quinela } = getState().home;

    rex_data_form_quinela.map(mat => {
        if(mat.partid == id){
            mat[name] = goals
            mat['edit'] = true
        }
    })

    dispatch({
        type    : DATA_FORM_QUINELA,
        payload : rex_data_form_quinela
    })
}


export const GetDataNextMatchesReducer = (changeTor = false) => async (dispatch, getState) => {

    const currentTornid = localStorage.getItem('tornid')

    const tornid = changeTor 
                    ? currentTornid == 1
                        ? 2
                        : 1
                    : currentTornid
    
    await fetch(config.apiUrl + "matches/next-matches",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                "usutoken" : localStorage.getItem('usutoken'),

            },
            body : JSON.stringify({
                tornid : tornid
            })
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_NEXT_MATCHES,
                payload : data.data
            })
            dispatch({
                type : DATA_FORM_QUINELA,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const GetDataStatisticsQuinelaReducer = ( ) => async (dispatch, getState) => {

    let response = false

    const { rex_data_form_quinela } = getState().home;

    const dataEdited = rex_data_form_quinela.filter(dat => dat.edit == true)


    await fetch(config.apiUrl + "quinela/statistics-quinela",
    {
        mode: "cors",
        method : "POST",
        headers : {
            "Accept": "application/json",
            "Content-type":"application/json",
            "usutoken" : localStorage.getItem('usutoken'),

        },
    },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            dispatch({
                type : DATA_STATISTICS_FORM_QUINELA,
                payload : data.data
            })
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}

export const SendFormQuinelaReducer = ( ) => async (dispatch, getState) => {

    let response = false
    let errorForm = false

    const { rex_data_form_quinela } = getState().home;

    const dataEdited = rex_data_form_quinela.filter(dat => dat.edit == true)

    console.log(dataEdited)
    for (let dat of dataEdited) {
        if (("goalhome" in dat && (isNaN(dat.goalhome) || dat.goalhome == "")) 
            || ("goalaway" in dat && (isNaN(dat.goalaway) || dat.goalaway == "") )) {
            errorForm = true
            console.log(dat)
            break;
        }
    }

    if(errorForm){
        console.log(errorForm)
        notifyAlert("Solo se admiten valores numericos para los goles")
        return false
    }

    await fetch(config.apiUrl + "quinela/edit-quinela",
    {
        mode: "cors",
        method : "POST",
        headers : {
            "Accept": "application/json",
            "Content-type":"application/json",
            "usutoken" : localStorage.getItem('usutoken'),

        },
        body : JSON.stringify({
            formQuinela : dataEdited
        })
    },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            response = true
            notifySuccess(data.message)
        }else{
            notifyAlert(data.message)
        }
    })
    .catch((error) => {
        console.log(error)
    })

    return response
}