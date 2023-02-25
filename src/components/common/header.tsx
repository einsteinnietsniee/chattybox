'use client'
import Link from 'next/link'
import { Fragment } from 'react'
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {
  Bars3Icon,
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftRightIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import classNames from '~/utils/classnames'
import { headerNavigation, userNavigation } from '~/configs/navigation'

const solutions = [
  {
    name: 'Inbox',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: InboxIcon,
  },
  {
    name: 'Messaging',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    name: 'Live Chat',
    description: "Your customers' data will be safe and secure.",
    href: '#',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Knowledge Base',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: QuestionMarkCircleIcon,
  },
]

const user = {
  name: 'Debbie Lewis',
  handle: 'deblewis',
  email: 'debbielewis@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80',
}

type TProps = {
  pageName?: string
}

export function AppHeader({ pageName }: TProps) {
  return (
    <header className='z-50'>
      <Disclosure as='div' className={classNames(pageName && 'pb-32', 'relative overflow-hidden bg-sky-700')}>
        {({ open }: { open: boolean }) => (
          <>
            <nav
              className={classNames(
                open ? 'bg-sky-900' : 'bg-transparent',
                'relative z-10 border-b border-teal-500 border-opacity-25 lg:border-none lg:bg-transparent',
              )}
            >
              <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
                <div className='relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800'>
                  <div className='flex items-center px-2 lg:px-0'>
                    <div className='flex-shrink-0'>
                      <img
                        className='block h-8 w-auto'
                        src='https://tailwindui.com/img/logos/mark.svg?color=teal&shade=400'
                        alt='Your Company'
                      />
                    </div>
                    <div className='hidden lg:ml-6 lg:block lg:space-x-4'>
                      <div className='flex'>
                        {headerNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                              'rounded-md py-2 px-3 text-sm font-medium text-white',
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end'>
                    <div className='w-full max-w-lg lg:max-w-xs'>
                      <label htmlFor='search' className='sr-only'>
                        Search
                      </label>
                      <div className='relative text-sky-100 focus-within:text-gray-400'>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <MagnifyingGlassIcon className='h-5 w-5 flex-shrink-0' aria-hidden='true' />
                        </div>
                        <input
                          id='search'
                          name='search'
                          className='block w-full rounded-md border border-transparent bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-sky-100 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm'
                          placeholder='Search'
                          type='search'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='flex lg:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon className='block h-6 w-6 flex-shrink-0' aria-hidden='true' />
                      ) : (
                          <Bars3Icon className='block h-6 w-6 flex-shrink-0' aria-hidden='true' />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className='hidden lg:ml-4 lg:block'>
                    <div className='flex items-center'>
                      <button
                        type='button'
                        className='flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900'
                      >
                        <span className='sr-only'>View notifications</span>
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as='div' className='relative ml-4 flex-shrink-0 z-50'>
                        <div>
                          <Menu.Button className='flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900'>
                            <span className='sr-only'>Open user menu</span>
                            <img className='h-8 w-8 rounded-full' src={user.imageUrl} alt='' />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }: { active: boolean }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block py-2 px-4 text-sm text-gray-700',
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='bg-sky-900 lg:hidden'>
                <div className='space-y-1 px-2 pt-2 pb-3'>
                  {headerNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-black bg-opacity-25' : 'hover:bg-sky-800',
                        'block rounded-md py-2 px-3 text-base font-medium text-white',
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className='border-t border-sky-800 pt-4 pb-3'>
                  <div className='flex items-center px-4'>
                    <div className='flex-shrink-0'>
                      <img className='h-10 w-10 rounded-full' src={user.imageUrl} alt='' />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium text-white'>{user.name}</div>
                      <div className='text-sm font-medium text-sky-200'>{user.email}</div>
                    </div>
                    <button
                      type='button'
                      className='ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900'
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='mt-3 px-2'>
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
                        className='block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white'
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </nav>
            <div
              aria-hidden='true'
              className={classNames(
                open ? 'bottom-0' : 'inset-y-0',
                'absolute inset-x-0 left-1/2 w-full -translate-x-1/2 transform overflow-hidden lg:inset-y-0',
              )}
            >
              <div className='absolute inset-0 flex'>
                <div className='h-full w-1/2' style={{ backgroundColor: '#0a527b' }} />
                <div className='h-full w-1/2' style={{ backgroundColor: '#065d8c' }} />
              </div>
              <div className='relative flex justify-center'>
                <svg
                  className='flex-shrink-0'
                  width={1750}
                  height={308}
                  viewBox='0 0 1750 308'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M284.161 308H1465.84L875.001 182.413 284.161 308z' fill='#0369a1' />
                  <path d='M1465.84 308L16.816 0H1750v308h-284.16z' fill='#065d8c' />
                  <path d='M1733.19 0L284.161 308H0V0h1733.19z' fill='#0a527b' />
                  <path d='M875.001 182.413L1733.19 0H16.816l858.185 182.413z' fill='#0a4f76' />
                </svg>
              </div>
            </div>
            {pageName ? (
              <div className='relative py-10'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                  <h1 className='text-3xl font-bold tracking-tight text-white'>{pageName}</h1>
                </div>
              </div>
            ) : null}
          </>
        )}
      </Disclosure>
    </header>
  )
}

export function WebHeader() {
  return (
    <header>
      <Popover className='relative bg-white'>
        <div className='mx-auto flex max-w-7xl items-center justify-between p-6 md:justify-start md:space-x-10 lg:px-8'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <Link href='/'>
              <span className='sr-only'>Pro Messaging</span>
              <img
                className='h-8 w-auto sm:h-10'
                src='https://tailwindui.com/img/logos/mark.svg?from-color=purple&from-shade=600&to-color=indigo&to-shade=600&toShade=600'
                alt=''
              />
            </Link>
          </div>
          <div className='-my-2 -mr-2 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <Popover.Group as='nav' className='hidden space-x-10 md:flex'>
            <Popover className='relative'>
              {({ open }) => (
                <>
                  <Popover.Button
                    className={classNames(
                      open ? 'text-gray-900' : 'text-gray-500',
                      'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                    )}
                  >
                    <span>Solutions</span>
                    <ChevronDownIcon
                      className={classNames(
                        open ? 'text-gray-600' : 'text-gray-400',
                        'ml-2 h-5 w-5 group-hover:text-gray-500',
                      )}
                      aria-hidden='true'
                    />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0 translate-y-1'
                    enterTo='opacity-100 translate-y-0'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100 translate-y-0'
                    leaveTo='opacity-0 translate-y-1'
                  >
                    <Popover.Panel className='absolute z-10 -ml-4 mt-3 w-screen max-w-md transform lg:left-1/2 lg:ml-0 lg:max-w-2xl lg:-translate-x-1/2'>
                      <div className='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                        <div className='relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2'>
                          {solutions.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className='-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50'
                            >
                              <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white sm:h-12 sm:w-12'>
                                <item.icon className='h-6 w-6' aria-hidden='true' />
                              </div>
                              <div className='ml-4'>
                                <p className='text-base font-medium text-gray-900'>{item.name}</p>
                                <p className='mt-1 text-sm text-gray-500'>{item.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>

            <Link href='/pricing' className='text-base font-medium text-gray-500 hover:text-gray-900'>
              Pricing
            </Link>
            <Link href='/contact' className='text-base font-medium text-gray-500 hover:text-gray-900'>
              Contacts
            </Link>
          </Popover.Group>
          <div className='hidden items-center justify-end md:flex md:flex-1 lg:w-0'>
            <Link href='/signin' className='whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900'>
              Sign in
            </Link>
            <a
              href='#'
              className='ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
            >
              Sign up
            </a>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter='duration-200 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden'
          >
            <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
              <div className='px-5 pt-5 pb-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <img
                      className='h-8 w-auto'
                      src='https://tailwindui.com/img/logos/mark.svg?from-color=purple&from-shade=600&to-color=indigo&to-shade=600&toShade=600'
                      alt='Your Company'
                    />
                  </div>
                  <div className='-mr-2'>
                    <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                    </Popover.Button>
                  </div>
                </div>
                <div className='mt-6'>
                  <nav className='grid grid-cols-1 gap-7'>
                    {solutions.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50'
                      >
                        <div className='flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white'>
                          <item.icon className='h-6 w-6' aria-hidden='true' />
                        </div>
                        <div className='ml-4 text-base font-medium text-gray-900'>{item.name}</div>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className='py-6 px-5'>
                <div className='grid grid-cols-2 gap-4'>
                  <Link href='/pricing' className='text-base font-medium text-gray-500 hover:text-gray-900'>
                    Pricing
                  </Link>
                  <Link href='/contact' className='text-base font-medium text-gray-500 hover:text-gray-900'>
                    Contacts
                  </Link>
                </div>
                <div className='mt-6'>
                  <a
                    href='#'
                    className='flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
                  >
                    Sign up
                  </a>
                  <p className='mt-6 text-center text-base font-medium text-gray-500'>
                    Existing customer?
                    <a href='#' className='text-gray-900'>
                      Sign in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  )
}
