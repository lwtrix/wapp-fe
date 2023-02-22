import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ChatsList from '../../components/chats-list/ChatsList'

const Main = () => {
    const currentUser = useSelector(state => state.currentUser.user)
    const navigate = useNavigate()

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
        </div>
    </div>
  )
}

export default Main