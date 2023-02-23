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
        
        dispatch(selectChat(chat))
    }
}
