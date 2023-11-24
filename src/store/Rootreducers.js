import { combineReducers } from "redux";
import patientReducer from "./patient/patientReducer";
import doctorReducer from "./doctor/doctorReducer";
import caseReducer from "./case/caseReducer";
import videoCallReducer from "./videoCall/videoCallReducer";
import idReducer from "./urlId/idReducer";


const RootReducers = combineReducers({
    id: idReducer,
    patientReducer,
    doctorReducer,
    caseReducer,
    videoCallReducer
});

export default RootReducers;
