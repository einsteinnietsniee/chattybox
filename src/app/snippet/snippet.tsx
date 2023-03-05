'use client'
import { useState } from 'react'
import ChatBtn from './chatButton'
import MessagingBox from './messagingBox'

export default function Snippet() {
  const [open, setOpen] = useState(false)

  const handleCloseChangeClick = () => {
    setOpen(false)
  }

  const handleChatBtnClick = () => {
    setOpen(true)
  }

  return (
    <>
      <MessagingBox open={open} onClose={handleCloseChangeClick} />
      <ChatBtn open={!open} onClick={handleChatBtnClick} />
    </>
  )
}
