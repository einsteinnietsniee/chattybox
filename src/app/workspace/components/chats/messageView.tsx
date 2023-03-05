import { Fragment, useState } from 'react'
import { FaceSmileIcon as FaceSmileIconOutline, PaperClipIcon } from '@heroicons/react/24/outline'
import { Listbox, Transition } from '@headlessui/react'
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import classNames from '~/utils/classnames'

const moods = [
  {
    name: 'Excited',
    value: 'excited',
    icon: FireIcon,
    iconColor: 'text-white',
    bgColor: 'bg-red-500',
  },
  {
    name: 'Loved',
    value: 'loved',
    icon: HeartIcon,
    iconColor: 'text-white',
    bgColor: 'bg-pink-400',
  },
  {
    name: 'Happy',
    value: 'happy',
    icon: FaceSmileIconMini,
    iconColor: 'text-white',
    bgColor: 'bg-green-400',
  },
  {
    name: 'Sad',
    value: 'sad',
    icon: FaceFrownIcon,
    iconColor: 'text-white',
    bgColor: 'bg-yellow-400',
  },
  {
    name: 'Thumbsy',
    value: 'thumbsy',
    icon: HandThumbUpIcon,
    iconColor: 'text-white',
    bgColor: 'bg-blue-500',
  },
  {
    name: 'I feel nothing',
    value: null,
    icon: XMarkIcon,
    iconColor: 'text-gray-400',
    bgColor: 'bg-transparent',
  },
]

const messages = [
  {
    author: 'Unknown',
    timestamp: 1677142525224,
    side: 'left',
    text: 'Hello',
  },
  {
    author: 'Ricardo Cooper',
    timestamp: 1677271150765,
    side: 'right',
    text: 'Hi, how can I help you?',
  },
  {
    author: 'Unknown',
    timestamp: 1677295615224,
    side: 'left',
    text: 'I am having trouble with my account login',
  },
  {
    author: 'Ricardo Cooper',
    timestamp: 1677302420765,
    side: 'right',
    text: 'I am sorry to hear that. Have you tried resetting your password?',
  },
  {
    author: 'Unknown',
    timestamp: 1677328925224,
    side: 'left',
    text: 'Yes, but it is still not working',
  },
  {
    author: 'Ricardo Cooper',
    timestamp: 1677334230765,
    side: 'right',
    text: 'Okay, let me look up your account information. Can you please provide your username or email address?',
  },
  {
    author: 'Unknown',
    timestamp: 1677343615224,
    side: 'left',
    text: 'My email address is example@example.com',
  },
  {
    author: 'Ricardo Cooper',
    timestamp: 1677362460765,
    side: 'right',
    text: 'Thank you. I found your account, and it looks like there was a temporary issue with the login system earlier. It should be resolved now. Can you please try logging in again?',
  },
  {
    author: 'Unknown',
    timestamp: 1677381225224,
    side: 'left',
    text: 'Great, it is working now. Thank you for your help!',
  },
  {
    author: 'Ricardo Cooper',
    timestamp: 1677399470765,
    side: 'right',
    text: 'You are welcome. Let us know if you have any further issues or questions in the future.',
  },
]

export default function MessageView() {
  const [selected, setSelected] = useState(moods[5])

  return (
    <main className='relative z-0 flex-1 focus:outline-none xl:order-last p-4'>
      <ul className='messages-view relative flex flex-col p-4 h-full overflow-y-auto'>
        {messages.map((message) => (
          <li
            key={message.timestamp}
            className={classNames(
              message.side === 'left' ? 'mr-auto rounded-bl-sm' : 'ml-auto rounded-br-sm',
              'mb-8 rounded-2xl bg-sky-600 text-white py-3 px-6 max-w-md',
            )}
          >
            {message.text}
          </li>
        ))}
      </ul>
      <form className='h-1/6 w-full min-h-[115px] pt-4 px-4 shadow-[0_-14px_7px_-15px_rgba(0,0,0,0.3)]' action='#'>
        <div className='border-b border-gray-200 focus-within:border-indigo-600'>
          <label htmlFor='comment' className='sr-only'>
            Add your comment
          </label>
          <textarea
            rows={3}
            name='comment'
            id='comment'
            className='block w-full resize-none border-0 border-b border-transparent p-0 pb-2 focus:border-indigo-600 focus:ring-0 sm:text-sm'
            placeholder='Add your comment...'
            defaultValue={''}
          />
        </div>
        <div className='flex justify-between pt-2'>
          <div className='flex items-center space-x-5'>
            <div className='flow-root'>
              <button
                type='button'
                className='-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'
              >
                <PaperClipIcon className='h-6 w-6' aria-hidden='true' />
                <span className='sr-only'>Attach a file</span>
              </button>
            </div>
            <div className='flow-root'>
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className='sr-only'> Your mood </Listbox.Label>
                    <div className='relative'>
                      <Listbox.Button className='relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500'>
                        <span className='flex items-center justify-center'>
                          {selected.value === null ? (
                            <span>
                              <FaceSmileIconOutline className='h-6 w-6 flex-shrink-0' aria-hidden='true' />
                              <span className='sr-only'> Add your mood </span>
                            </span>
                          ) : (
                            <span>
                              <span
                                className={classNames(
                                  selected.bgColor,
                                  'flex h-8 w-8 items-center justify-center rounded-full',
                                )}
                              >
                                  <selected.icon className='h-5 w-5 flex-shrink-0 text-white' aria-hidden='true' />
                              </span>
                                <span className='sr-only'>{selected.name}</span>
                            </span>
                          )}
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <Listbox.Options className='absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm'>
                          {moods.map((mood) => (
                            <Listbox.Option
                              key={mood.value}
                              className={({ active }) =>
                                classNames(
                                  active ? 'bg-gray-100' : 'bg-white',
                                  'relative cursor-default select-none py-2 px-3',
                                )
                              }
                              value={mood}
                            >
                              <div className='flex items-center'>
                                <div
                                  className={classNames(
                                    mood.bgColor,
                                    'w-8 h-8 rounded-full flex items-center justify-center',
                                  )}
                                >
                                  <mood.icon
                                    className={classNames(mood.iconColor, 'flex-shrink-0 h-5 w-5')}
                                    aria-hidden='true'
                                  />
                                </div>
                                <span className='ml-3 block truncate font-medium'>{mood.name}</span>
                              </div>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div className='flex-shrink-0'>
            <button
              type='submit'
              className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}
