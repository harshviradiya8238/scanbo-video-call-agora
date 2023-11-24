import { combineReducers } from "redux";
import pateintReducer from "./pateint/pateintReducer";
import doctorReducer from "./doctor/doctorReducer";
import caseReducer from "./case/caseReducer";
import videoCallReducer from "./videoCall/videoCallReducer";


const RootReducers = combineReducers({
    pateintReducer,
    doctorReducer,
    caseReducer,
    videoCallReducer
});

export default RootReducers;
