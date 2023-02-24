"use client"
import { AppHeader } from '~/components/common/header'
import VisitorProfile from './components/visitor-profile'
import Chats from './components/chats'

export default function WorkSpace() {
  return (
    <div className="flex flex-col h-full pb-16 lg:overflow-hidden">
      <AppHeader />
      <div className='flex h-full'>
        <VisitorProfile />
        <Chats />
      </div>
    </div>
  )
}
