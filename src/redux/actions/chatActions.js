import { io } from "socket.io-client";
export const socket = io.connect(process.env.REACT_APP_BE_DEV, {
  transports: ["websocket"],
});

export const SELECT_CHAT = 'SELECT_CHAT'

const selectChat = (chat) => {
    return {
        type: SELECT_CHAT,
        payload: chat
    }
}

export const handleSelectChat = (chatId) => {
    const options = {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }
    return async (dispatch, getState) => {
        const baseEndpoint = process.env.REACT_APP_BE_DEV
        const res = await fetch(`${baseEndpoint}/chats/${chatId}`, options)
        const chat = await res.json()
        
        if(getState().selectedChat.chat) {
            leaveChat(getState().selectedChat.chat._id)
        }
        dispatch(selectChat(chat))
        joinChat(chatId)
    }
}

export const receiveNewMessage = (msg) => {
    return {
        type: 'RECEIVE_MESSAGE',
        payload: msg
    }
}

const joinChat = (chatId) => {
    socket.emit("join_room", chatId);
}

const leaveChat = (chatId) => {
    socket.emit('leave_room', chatId)
}

const sendMessage = (msg, chatId) => {
    return async (dispatch, getState) => {

    }
}
