import {ACTIONs} from './dashboard.constant.jsx';



function handleUserContent(dispatch) {
    return () => {
        dispatch({type: ACTIONs.HANDLE_USER_CONTENT, payload: "user"})
    }
}

function handlePlayfieldConetnt(dispatch) {
    return (typeContent) => {
        dispatch({type: ACTIONs.HANDLE_USER_CONTENT, payload: typeContent})
    }
}

export { handleUserContent, handlePlayfieldConetnt };
