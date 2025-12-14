import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='max-w-7xl mx-auto pt-20 pb-20 flex flex-col md:flex-col items-center justify-between gap-x-10 gap-y-2'>
                <p className='text-neutral-400'>
                    &copy; Copyright 2025, Umacoin.com
                </p>

                <div className='flex items-center gap-x-3'>
                    <div className='w-3 h-3 rounded-full bg-gradient-to-b from-green-400 to-green-500 rounded-full transition-all animate-pulse'></div>
                   
                   <p className='text-neutral-300'>
                     Network online
                   </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer