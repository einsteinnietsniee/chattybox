'use client'
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/solid";
import classNames from "~/utils/classnames";

type TProps = {
  open: boolean;
  onClick: () => void;
}

export default function ChatBtn({ open, onClick }: TProps) {
  const handleClick = () => {
    onClick()
  }

  return (
    <button
      className={classNames(
        open ? 'opacity-100 bottom-0' : 'opacity-0 bottom-[-500px]',
        'bg-sky-500 p-4 rounded-full fixed right-0 mr-6 mb-6 transition-all animate-bounce'
      )}
      onClick={handleClick}
    >
      <ChatBubbleBottomCenterIcon className='w-8 h-8 flex-shrink-0 text-white' />
    </button>
  )
}