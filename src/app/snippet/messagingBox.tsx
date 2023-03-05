'use client'
import { ChatBubbleBottomCenterIcon, XMarkIcon } from "@heroicons/react/20/solid";
import classNames from "~/utils/classnames";

type TProps = {
  open: boolean;
  onClose: () => void;
}

export default function MessagingBox({ open, onClose }: TProps) {
  const handleClose = () => {
    onClose()
  }

  return (
    <div
      className={classNames(
        open ? 'opacity-100 bottom-0' : 'opacity-0 bottom-[-500px]',
        'bg-white fixed right-0 mr-6 mb-6 transition-all w-96 max-h-screen shadow-xl'
      )}
    >
      <div className="bg-sky-700 p-4 flex items-center w-full justify-between">
        <ChatBubbleBottomCenterIcon className='w-5 h-5 flex-shrink-0 text-white' />
        <span className="text-white">Messaging</span>
        <button onClick={handleClose}>
          <XMarkIcon
            className="w-5 h-5 flex-shrink-0 text-white"
          />
        </button>
      </div>
      <div className="w-full h-96 max-h-full">

      </div>
      <div className="p-4 flex items-center w-full justify-between shadow-[0_-14px_7px_-15px_rgba(0,0,0,0.3)]">
        <span className="text-sky-700">ChattingBox&copy;</span>
      </div>
    </div>
  )
}