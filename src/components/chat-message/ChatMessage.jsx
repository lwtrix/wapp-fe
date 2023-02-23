import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { format, formatDistance, sub, subDays } from 'date-fns'
import { useSelector } from 'react-redux'

const ChatMessage = ({ msg }) => {

    const selectedChat = useSelector(state => state.selectedChat.chat)
    const [msgTime, setMsgTime] = useState(null)

    const handleDateAndTime = () => {
        const today = format(new Date(), 'yyyy/dd/MM')
        const msgDate = format(new Date(msg.createdAt), 'yyyy/dd/MM')

        if(today !== msgDate) {
            const differenceInTime = new Date().getTime() - new Date(msg.createdAt).getTime()
            const differenceInDays = differenceInTime / (1000 * 3600 * 24)
            
            const formattedDate = formatDistance(subDays(new Date(msg.createdAt), Math.ceil(differenceInDays)), new Date(msg.createdAt), { addSuffix: true })
            setMsgTime(formattedDate)
        } else {
            const formattedTime = format(new Date(msg.createdAt), 'HH/mm')
            setMsgTime(formattedTime)
        }
    }

    useEffect(() => {
        handleDateAndTime()
    }, [selectedChat])

  return (
    <div className='chat-message'>
        <p>{msg.sender.username}: {msg.content.text} {msgTime && msgTime.replace('/', ':')}</p>
    </div>
  )
}

export default ChatMessage