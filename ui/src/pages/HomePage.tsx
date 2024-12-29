import { Chat } from '../components/Chat'
import { AllChats } from '../components/AllChats'
import { useParams } from 'react-router-dom'

export default function HomePage() {
  const { id } = useParams()

  return (
    <div className="w-full h-full">
      <div className="flex gap-4">
        <div className="min-w-[300px]">
          <AllChats />
        </div>
        <div className="flex-1">
          {id && <Chat id={id} />}
        </div>
      </div>
    </div>
  )
}
