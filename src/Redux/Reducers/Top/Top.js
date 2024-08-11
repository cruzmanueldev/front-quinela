import { 
    SHOW_MODAL_MENU,
    GET_DATA_USER
} from "../../../Constants/Top/Top"

const INIT_STATE = {
    rex_show_modal_menu : false,
    rex_data_user       : {},
}

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case SHOW_MODAL_MENU:
            return {
                ...state,
                rex_show_modal_menu: action.payload
        }
        case GET_DATA_USER:
            return {
                ...state,
                rex_data_user: action.payload
        }
        default:
            return state
    }
}