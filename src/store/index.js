import {combineReducers} from "redux";
import user from "../store/userSlice";

const rootReducer = combineReducers({
    user,
    devTools: true,
});
export default rootReducer;