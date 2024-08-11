import config from "./../../../config"
import { 
    GET_DATA_SELECTIONS
} from "./../../../Constants/Selections/Selections"


export const GetDataSelectionsReducer = () => async (dispatch, getState) =>{

    await fetch(config.apiUrl + "selections/all",
        {
            mode: "cors",
            method : "POST",
            headers : {
                "Accept": "application/json",
                "Content-type":"application/json",
                // "reqtoken" : usutoken
            },
        },
    )
    .then( res => res.json())
    .then(async data => {
        if(data.response){
            dispatch({
                type : GET_DATA_SELECTIONS,
                payload : data.data
            })

        }
    })
    .catch((error) => {
        console.log(error)
    })
}