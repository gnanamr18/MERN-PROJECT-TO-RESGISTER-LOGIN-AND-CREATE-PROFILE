import uuid from 'uuid'
import { SET_ALERT,REMOVE_ALERT } from "./types";

export const SETALERT = (msg, alerttype) => dispatch => {
    const id  = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: {msg, alerttype, id}
    })
    
}