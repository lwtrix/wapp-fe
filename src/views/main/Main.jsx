import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChatsList from '../../components/chats-list/ChatsList'
import SelectedChat from '../../components/selected-chat/SelectedChat'

import './main.css'

const Main = () => {
    const currentUser = useSelector(state => state.currentUser.user)
    const navigate = useNavigate()
    const selectedChat = useSelector(state => state.selectedChat.chat)

    useEffect(() => {
        if(!currentUser) {
            navigate('/')
        }
    }, [currentUser])

  return (
    <div className='main'>
        <div className="header">
            <div className="input-container">
                <input type='text' placeholder='search users'/>
            </div>
            <div className="controls">
                <Button>Logout</Button>
            </div>
        </div>
        <div className="body">
            <ChatsList />
            {selectedChat && <SelectedChat />}
        </div>
    </div>
  )
}

export default Main