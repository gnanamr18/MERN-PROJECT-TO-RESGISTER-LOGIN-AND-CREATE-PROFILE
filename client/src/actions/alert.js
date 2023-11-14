import { v4 as uuidv4 } from 'uuid';
import { SET_ALERT,REMOVE_ALERT } from "./types";

export const SetAlert = (msg, alerttype) => dispatch => {
    const id  = uuidv4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alerttype, id}
    })
    
}