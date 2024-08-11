import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import Selections from "./Selections/Selections"
import Top from "./Top/Top"
import Matches from "./Matches/Matches"
import Tournaments from "./Tournaments/Tournaments"
import Home from "./Home/Home"
import Users from "./Users/Users"


const createRootReducer = (history) => combineReducers({
    router      : connectRouter(history),
    selections  : Selections,
    top         : Top,
    matches     : Matches,
    tournaments : Tournaments,
    home        : Home,
    users       : Users
})

export default createRootReducer