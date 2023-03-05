'use client'
import { FormEventHandler } from 'react'
import { useGetUser, useSignUp } from '~/hooks/firestore/useAuth'
import { WebHeader } from '~/components/common/header'
import Footer from '~/components/common/footer'
import Link from 'next/link'

export default function Sign() {
  const { handleEmailSignUp, handleGoogleSignUp } = useSignUp()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const organizationName = data.get('organization') as string
    const firstName = data.get('first-name') as string
    const lastName = data.get('last-name') as string
    const email = data.get('email') as string
    const password = data.get('password') as string
    const confirmPassword = data.get('confirm-password') as string

    if (password !== confirmPassword) {
      alert('Password and confirm password are not matching!')
      return 'Mismatch!'
    }

    handleEmailSignUp({ email, password, firstName, lastName, organizationName })
  }

  return (
    <>
      <WebHeader />
      <div className='flex min-h-full'>
        <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>Sign up</h2>
              <p className='mt-2 text-sm text-gray-600'>
                Or{' '}
                <Link href='/signin' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  go to sign in page
                </Link>
              </p>
            </div>

            <div className='mt-8'>
              <div>
                <div>
                  <p className='text-sm font-medium text-gray-700'>Sign up with</p>

                  <div className='mt-1 grid grid-cols-1'>
                    <div>
                      <a
                        href='#'
                        onClick={handleGoogleSignUp}
                        className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                      >
                        <span className='sr-only'>Sign up with Google</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 210 210">
                          <path d="M0 105C0 47.103 47.103 0 105 0c23.383 0 45.515 7.523 64.004 21.756l-24.4 31.696C133.172 44.652 119.477 40 105 40c-35.841 0-65 29.159-65 65s29.159 65 65 65c28.867 0 53.398-18.913 61.852-45H105V85h105v20c0 57.897-47.103 105-105 105S0 162.897 0 105z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                <div className='relative mt-6'>
                  <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                    <div className='w-full border-t border-gray-300' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='bg-white px-2 text-gray-500'>Or continue with</span>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <form action='#' onSubmit={handleSubmit} method='POST' className='space-y-6'>
                  <div>
                    <label htmlFor='first-name' className='block text-sm font-medium text-gray-700'>
                      First name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='first-name'
                        name='first-name'
                        type='text'
                        autoComplete='first-name'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='last-name' className='block text-sm font-medium text-gray-700'>
                      Last name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='last-name'
                        name='last-name'
                        type='text'
                        autoComplete='last-name'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='organization' className='block text-sm font-medium text-gray-700'>
                      Organization name
                    </label>
                    <div className='mt-1'>
                      <input
                        id='organization'
                        name='organization'
                        type='text'
                        autoComplete='organization'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                      Email address
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                      Password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
                      Confirm password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='confirm-password'
                        name='confirm-password'
                        type='password'
                        autoComplete='current-password'
                        required
                        className='block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='relative hidden w-0 flex-1 lg:block'>
          <img
            className='absolute inset-0 h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80'
            alt=''
          />
        </div>
      </div>
      <Footer />
    </>
  )
}
