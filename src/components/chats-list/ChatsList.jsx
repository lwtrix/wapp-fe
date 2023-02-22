import React, { useEffect, useState } from 'react'
import ChatPreview from '../chat-preview/ChatPreview'

const ChatsList = () => {
    const [chats, setChats] = useState([])

    const getUserChats = async () => {
        const options = {
            headers: {
                'Authorization': `Bearer ${localStorage.accessToken}`
            }
        }

        const baseEndpoint = process.env.REACT_APP_BE_DEV
        const res = await fetch(`${baseEndpoint}/chats`, options)

        const chats = await res.json()
        setChats(chats)
    }

    useEffect(() => {
        getUserChats()
    }, [])

  return (
    <div className='chats-list'>
        <h2 className='title'>Chats</h2>
        <div className="content">
            {console.log(chats)}
            {chats.length && chats.map(chat => (
                <ChatPreview chat={chat} />
            ))}
        </div>
    </div>
  )
}

export default ChatsList