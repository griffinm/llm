import { CircularProgress, List, ListItem, ListItemText, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import { getMessagesForChat, getResponseForMessage, sendMessage } from '../../utils/api'
import { Message } from '../../utils/types'
import { MessageItem } from '../MessageItem'

export function Chat({
  id,
}: {
  id: string
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [userMessageSending, setUserMessageSending] = useState<boolean>(false)
  const [responseMessageLoading, setResponseMessageLoading] = useState<boolean>(false)

  useEffect(() => {
    getMessagesForChat(id).then(setMessages)
  }, [id])
  const handleSend = async () => {
    setInput('')
    setResponseMessageLoading(true)
    setUserMessageSending(true)

    const userMessage = await sendMessage({ chatId: id, message: input })
    setMessages([...messages, userMessage])
    setUserMessageSending(false)

    const responseMessage = await getResponseForMessage({ chatId: id, messageId: userMessage.id })
    setMessages([...messages, userMessage, responseMessage])
    setResponseMessageLoading(false)
  }

  const renderResponseLoading = () => {
    if (responseMessageLoading) {
      return (
        <ListItem>
          <CircularProgress />
        </ListItem>
      )
    }
  }

  return (
    <div className="flex flex-col px-10">
      <div className="flex flex-col">
        <div className="flex flex-col flex-1">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {renderResponseLoading()}
        </div>
      </div>

      <div className="flex flex-1 m-5 w-full">
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
