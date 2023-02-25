import { ChatsList } from './chatsList'
import MessageView from './messageView'

export default function Chats() {
  return (
    <>
      <div className='flex min-w-0 flex-1 flex-col overflow-hidden'>
        <div className='relative z-0 flex flex-1 overflow-hidden'>
          <ChatsList />
          <MessageView />
        </div>
      </div>
    </>
  )
}
