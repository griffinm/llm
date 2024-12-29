export interface Message {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface Chat {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  messages: Message[]
}