import { 
    GET_DATA_NEXT_MATCHES,
    SHOW_MODAL_FORM_QUINELA,
    DATA_FORM_QUINELA,
    SHOW_MODAL_STATISTICS_QUINELA,
    DATA_STATISTICS_FORM_QUINELA,
    SHOW_MODAL_LAST_RESULTS,
    DATA_LAST_RESULTS,
    LOADING_DATA_RESULTS
} from "../../../Constants/Home/Home"

const INIT_STATE = {
    rex_data_next_matches       : [],
    rex_show_modal_form_quinela : false,
    rex_show_modal_statistics_quinela : false,
    loading_data_results : false,
    rex_show_modal_last_results : false,
    rex_data_form_quinela       : [],
    rex_data_statistics_quinela : [],
    rex_data_last_results : [],
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case GET_DATA_NEXT_MATCHES:
            return {
                ...state,
                rex_data_next_matches: action.payload
        }
        case LOADING_DATA_RESULTS:
            return {
                ...state,
                loading_data_results: action.payload
        }
        case DATA_STATISTICS_FORM_QUINELA:
            return {
                ...state,
                rex_data_statistics_quinela: action.payload
        }
        case DATA_FORM_QUINELA:
            return {
                ...state,
                rex_data_form_quinela: action.payload
        }
        case DATA_LAST_RESULTS:
            return {
                ...state,
                rex_data_last_results: action.payload
        }
        case SHOW_MODAL_STATISTICS_QUINELA:
            return {
                ...state,
                rex_show_modal_statistics_quinela: action.payload
        }
        case SHOW_MODAL_FORM_QUINELA:
            return {
                ...state,
                rex_show_modal_form_quinela: action.payload
        }
        case SHOW_MODAL_LAST_RESULTS:
            return {
                ...state,
                rex_show_modal_last_results: action.payload
        }

        default:
            return state
    }
}