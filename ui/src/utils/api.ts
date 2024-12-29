import axios from 'axios'
import { Chat, Message } from './types'

export const baseClient = axios.create({
  baseURL: 'http://localhost:3000',
})

export const getChats = async (): Promise<Chat[]> => {
  const response = await baseClient.get('/chat')
  return response.data
}

export const createChat = async ({
  title='New Chat',
}: {
  title?: string
}): Promise<Chat> => {
  const response = await baseClient.post('/chat', { title })
  return response.data
}

export const getMessagesForChat = async (chatId: string): Promise<Message[]> => {
  const response = await baseClient.get(`/chats/${chatId}/messages`)
  return response.data
}

export const sendMessage = async (chatId: string, message: string): Promise<Message> => {
  const response = await baseClient.post(`/chats/${chatId}/messages`, {
    content: message,
  })
  return response.data
}