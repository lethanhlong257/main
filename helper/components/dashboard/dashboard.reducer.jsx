import { ACTIONs, ERRs } from './Dashboard.constant.jsx';

const INITAL_STATE = {
    contentType: "dashboard"
};

function dashboardReducer(state = INITAL_STATE, action) {
    switch (action.type) {
    case ACTIONs.HANDLE_USER_CONTENT:
        return Object.assign(state, {contentType: action.payload})
    
    default:
        return Object.assign(state);
    }
}

export default dashboardReducer;
