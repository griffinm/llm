import { Box, Button, List, ListItem, ListItemText, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { getMessagesForChat, sendMessage } from '../../utils/api'
import { Message } from '../../utils/types'

export function Chat({
  id,
}: {
  id: string
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')

  useEffect(() => {
    getMessagesForChat(id).then(setMessages)
  }, [id])

  const handleSend = () => {
    sendMessage(id, input).then((message) => { 
      setMessages([...messages, message])
      setInput('')
    })
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full">
        <List>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message.content} />
            </ListItem>
          ))}
        </List>
      </div>

      <div className="flex flex-1 m-5">
        <TextField
          value={input}
          fullWidth
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend()
            }
          }}
        />
      </div>
    </div>
  )
}