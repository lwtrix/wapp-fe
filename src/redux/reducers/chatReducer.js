import { SELECT_CHAT } from "../actions/chatActions"

const initialState = {
    chat: null
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SELECT_CHAT:
            return {
                ...action.payload
            }
        case 'RECEIVE_MESSAGE': 
        if(state.chat.newMessages) {
            const exists = state.chat.newMessages.find(msg => msg._id === action.payload._id)

            if(!exists) {
                return {
                    chat: {
                        ...state.chat,
                        newMessages: [...state.chat.newMessages, action.payload]
                    }
                }
            }   
            
        } else {
            return {
                chat: {
                    ...state.chat,
                    newMessages: [action.payload]
                }
            }
        }
            
        default: 
            return state
    } 
}

export default chatReducer