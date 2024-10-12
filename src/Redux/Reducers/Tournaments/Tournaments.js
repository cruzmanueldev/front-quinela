import { 
    GET_DATA_TOURNAMENTS,
    GET_DATA_POSITIONS_TOURNAMENT,
    GET_DATA_POSITIONS_PREDICTION_TOURNAMENT
} from "../../../Constants/Tournaments/Tournaments"

const INIT_STATE = {
    rex_data_tournaments                        : [],
    rex_data_positions_tournament               : [],
    rex_data_positions_prediction_tournament    : [],
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DATA_TOURNAMENTS:
            return {
                ...state,
                rex_data_tournaments: action.payload
        }
        case GET_DATA_POSITIONS_TOURNAMENT:
            return {
                ...state,
                rex_data_positions_tournament: action.payload
        }
        case GET_DATA_POSITIONS_PREDICTION_TOURNAMENT:
            return {
                ...state,
                rex_data_positions_prediction_tournament: action.payload
        }
        default:
            return state
    }
}