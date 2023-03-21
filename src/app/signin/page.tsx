'use client'
import { FormEventHandler } from 'react'
import Footer from '~/components/common/footer'
import { WebHeader } from '~/components/common/header'
import { useGetUser, useSignIn } from '~/hooks/firestore/useAuth'
import { useRouter } from 'next/navigation'
import { userAuthNavigation } from '~/configs/navigation'

export default function SignIn() {
  const router = useRouter()
  const { handleGoogleSignIn, handleEmailSignIn } = useSignIn()
  const user = useGetUser()
  console.log('USER', user)
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target as HTMLFormElement)
    const email = data.get('email')
    const password = data.get('password')
    const rememberMe = data.get('remember-me')

    if (!email || !password) {
      console.error('Empty fields')
      return 'Empty!'
    }

    const res = await handleEmailSignIn(email as string, password as string)
    if (res && user.user) {

      const newOrganizationHref = userAuthNavigation[2]
      router.push(newOrganizationHref.href)

    }
    console.log(res)
  }

  return (
    <>
      <WebHeader />
      <div className='flex min-h-full'>
        <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>Sign in to your account</h2>
              <p className='mt-2 text-sm text-gray-600'>
                Or{' '}
                <a href='/signup' className='font-medium text-indigo-600 hover:text-indigo-500'>
                  start your 14-day free trial
                </a>
              </p>
            </div>

            <div className='mt-8'>
              <div>
                <div>
                  <p className='text-sm font-medium text-gray-700'>Sign in with</p>

                  <div className='mt-1 grid grid-cols-1'>
                    <div>
                      <a
                        href='#'
                        onClick={handleGoogleSignIn}
                        className='inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50'
                      >
                        <span className='sr-only'>Sign in with Google</span>
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

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                      />
                      <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm'>
                      <a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                      Sign in
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
