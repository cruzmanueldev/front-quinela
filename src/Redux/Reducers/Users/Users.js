import { 
    GET_DATA_POSITIONS_USERS,
    GET_DATA_HISTORICAL_QUINELA_USERS
} from "../../../Constants/Users/Users"

const INIT_STATE = {
    rex_data_positions_users    : [],
    rex_data_historical_quinela_users    : [],
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DATA_POSITIONS_USERS:
            return {
                ...state,
                rex_data_positions_users : action.payload
        }
        case GET_DATA_HISTORICAL_QUINELA_USERS:
            return {
                ...state,
                rex_data_historical_quinela_users : action.payload
        }
        default:
            return state
    }
}