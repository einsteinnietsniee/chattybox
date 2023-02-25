'use client'
import { footerNavigation } from '~/configs/navigation'

export default function Footer() {
  return (
    <footer className='bg-gray-50' aria-labelledby='footer-heading'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className='mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8 lg:pt-24'>
        <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='grid grid-cols-2 gap-8 xl:col-span-2'>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-base font-medium text-gray-900'>Solutions</h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {footerNavigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-12 md:mt-0'>
                <h3 className='text-base font-medium text-gray-900'>Support</h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='md:grid md:grid-cols-2 md:gap-8'>
              <div>
                <h3 className='text-base font-medium text-gray-900'>Company</h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='mt-12 md:mt-0'>
                <h3 className='text-base font-medium text-gray-900'>Legal</h3>
                <ul role='list' className='mt-4 space-y-4'>
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className='text-base text-gray-500 hover:text-gray-900'>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='mt-12 xl:mt-0'>
            <h3 className='text-base font-medium text-gray-900'>Subscribe to our newsletter</h3>
            <p className='mt-4 text-base text-gray-500'>
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form className='mt-4 sm:flex sm:max-w-md'>
              <label htmlFor='email-address' className='sr-only'>
                Email address
              </label>
              <input
                type='email'
                name='email-address'
                id='email-address'
                autoComplete='email'
                required
                className='w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-indigo-500'
                placeholder='Enter your email'
              />
              <div className='mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0'>
                <button
                  type='submit'
                  className='flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700'
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className='mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16'>
          <div className='flex space-x-6 md:order-2'>
            {footerNavigation.social.map((item) => (
              <a key={item.name} href={item.href} className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>{item.name}</span>
                <item.icon className='h-6 w-6' aria-hidden='true' />
              </a>
            ))}
          </div>
          <p className='mt-8 text-base text-gray-400 md:order-1 md:mt-0'>
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
