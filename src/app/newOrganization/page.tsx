'use client'
import Footer from '~/components/common/footer'
import { WebHeader } from '~/components/common/header'
import Link from 'next/link'

export default function NewOrganization() {
   return (
      <>
         <WebHeader />
         <div className='flex min-h-full'>
            <div className='flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
               <div className='mx-auto w-full max-w-sm lg:w-96'>
                  <div>
                     <h2 className='mt-6 text-3xl font-bold tracking-tight text-gray-900'>Add a new Organization</h2>
                     <p className='mt-2 text-sm text-gray-600'>
                        Or{' '}
                        <Link href='/signin' className='font-medium text-indigo-600 hover:text-indigo-500'>
                           go to sign in page
                        </Link>
                     </p>
                  </div>

                  <div className='mt-8'>


                     <div className='mt-6'>
                        <form action='#' /*onSubmit={handleSubmit}*/ method='POST' className='space-y-6'>

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
                              <button
                                 type='submit'
                                 className='flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                              >
                                 Add organizations
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
