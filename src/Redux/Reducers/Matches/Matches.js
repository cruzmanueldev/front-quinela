import { 
    GET_DATA_MATCHES,
    SHOW_DATE_MATCHES_EM,
    SHOW_DATE_MATCHES_CA,
    GET_DATA_LAST_MATCHES,
    DATA_PREDICTIONS_MATCHES,
    DATA_ALL_PREDICTIONS_MATCHES,
    DATA_SELECTIONS_MATCHES,
    CURRENT_DATE_MATCH,
    GET_DATA_NEXT_MATCHES_TEAM
} from "../../../Constants/Matches/Matches"

const INIT_STATE = {
    rex_data_matches        : [],
    rex_date_matches_em     : "Jornada 1",
    rex_date_matches_ca     : "Jornada 1",
    rex_data_last_matches   : [],
    rex_data_next_matches_team  : [],
    rex_current_date_match  : null,
    rex_data_selections_matches : [],
    rex_data_all_predictions_matches : [],
    rex_data_predictions_matches : {
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
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case CURRENT_DATE_MATCH:
            return {
                ...state,
                rex_current_date_match: action.payload
        }
        case GET_DATA_NEXT_MATCHES_TEAM:
            return {
                ...state,
                rex_data_next_matches_team: action.payload
        }

        case DATA_SELECTIONS_MATCHES:
            return {
                ...state,
                rex_data_selections_matches: action.payload
        }
        case GET_DATA_LAST_MATCHES:
            return {
                ...state,
                rex_data_last_matches: action.payload
        }
        case DATA_ALL_PREDICTIONS_MATCHES:
            return {
                ...state,
                rex_data_all_predictions_matches: action.payload
        }
        case DATA_PREDICTIONS_MATCHES:
            return {
                ...state,
                rex_data_predictions_matches: action.payload
        }
        case GET_DATA_MATCHES:
            return {
                ...state,
                rex_data_matches: action.payload
        }
        case SHOW_DATE_MATCHES_EM:
            return {
                ...state,
                rex_date_matches_em: action.payload
        }

        default:
            return state
    }
}