import { ListItemText, Button, MenuList, MenuItem } from '@mui/material'
import { getChats, createChat } from '../../utils/api'
import { useState, useEffect } from 'react'
import { Chat } from '../../utils/types'
import { Add } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { urls } from '../../utils/urls'
import { useNavigate } from 'react-router-dom'

export function AllChats() {
  const [chats, setChats] = useState<Chat[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getChats().then(setChats)
  }, [])

  const handleCreateChat = () => {
    createChat({ title: 'New Chat' }).then((chat) => {
      setChats([...chats, chat])
      navigate(urls.chat(chat.id))
    })
  }

  return (
    <div>
      <div className="p-5">
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={handleCreateChat}
          fullWidth
        >
          New
        </Button>
      </div>

      <MenuList>
        {chats.map((chat) => (
          <Link to={urls.chat(chat.id)}>
            <MenuItem key={chat.id}>
              <ListItemText primary={chat.title} />
            </MenuItem>
          </Link>
        ))}
      </MenuList>
    </div>
  )
}
