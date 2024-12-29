export enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
}

export interface Message {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  role: MessageRole
}

export interface Chat {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}
