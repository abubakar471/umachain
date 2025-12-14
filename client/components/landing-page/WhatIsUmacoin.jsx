import Image from 'next/image'
import React from 'react'
import Logo from '../layout/Logo'
import Link from 'next/link'
import { ArrowUp } from 'lucide-react'

const WhatIsUmacoin = () => {
    return (
        <div className='pb-40'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-5xl text-neutral-200 font-semibold text-center'>What is Umacoin?</h2>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mt-12'>
                    <div className='bg-[#272727] shadow-2xl shadow-neutral-800 rounded-2xl p-8 flex flex-col justify-between'>
                        <h3 className='text-3xl lg:text-5xl font-semibold text-neutral-300 leading-tight'>Umacoin is a digital currency designed for the future.</h3>

                        <p className='mt-20 text-neutral-400'>
                            As its adoption continues to grow globally, it becomes an essential addition to any investment portfolio seeking future-proof assets.
                        </p>
                    </div>

                    <div className='flex flex-col gap-10'>
                        <div className='bg-[#272727] shadow-2xl shadow-neutral-800 rounded-2xl p-8'>
                            <h3 className='text-neutral-500 text-xl xl:text-2xl'>Current Price</h3>
                            <h3 className='text-neutral-400 text-2xl xl:text-4xl font-semibold mt-4'>$10.00/umacoin </h3>
                        </div>

                        <div className='bg-[#272727] shadow-2xl shadow-neutral-800 rounded-2xl p-8 h-full'>
                            <p className='text-md pb-4 text-neutral-400'>
                                Umacoin&apos;s scarcity offers higher growth prospects than Gold or the S&P 500
                            </p>
                            <Image src="/assets/images/graph.jpg" width={400} height={400} alt='graph' className='rounded-2xl w-full' />
                        </div>
                    </div>

                    <div className='bg-[#272727] shadow-2xl shadow-neutral-800 rounded-2xl p-8 flex flex-col col-span-1 md:col-span-2 xl:col-span-1 gap-y-10 justify-between'>
                        <div>
                            <div className='flex items-center gap-x-2'>
                                <Logo />
                                <span className='text-2xl font-semibold text-neutral-200'>Umacoin</span>
                            </div>

                            <p className='text-neutral-400 pt-4'>
                                bought at the beginning with $1, today, would be worth
                            </p>

                            <div className='flex items-center gap-2'>
                                <h3 className='text-neutral-400 text-4xl font-semibold mt-4'>$10.00 </h3>
                                <div className='flex bg-green-500/70 text-white rounded-full px-2 text-sm'>
                                    <ArrowUp /> 100% Growth

                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-6'>
                            <Link href={"/account/buy"} className='w-full text-center text-2xl font-semibold p-4 bg-[#FDE300] rounded-full'>Get Umacoin</Link>

                                  <Link href={"/account/buy"} className='w-full text-center text-2xl font-semibold p-4 bg-[#1c1c1c] text-white rounded-full'>
                                  Learn More</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatIsUmacoin