import { SELECT_CHAT } from "../actions/chatActions"

const initialState = {
    members: [],
    messages: []
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CHAT:
            return {
                ...action.payload
            }
        default: 
            return state
    } 
}

export default chatReducer