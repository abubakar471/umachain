import { ArrowRight, Star, StarHalf } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <div className='max-w-7xl mx-auto py-20'>
            <div className='hidden lg:flex text-center bg-black/5 backdrop:blur-xs rounded-full shadow w-fit px-6 mx-auto items-center gap-x-2'>
                <div className='text-[#b6ab4e] text-2xl'>
                    ***
                </div>
                Start Trading Umacoin Today. Instant. Secure. Open
                           <div className='text-[#b6ab4e] text-2xl'>
                    ***
                </div>
            </div>

            <h1 className='text-6xl font-stretch-semi-condensed font-semibold text-center max-w-4xl mx-auto pt-8'>Umacoin - The Future of Seamless <span className='text-[#FDE300]'>Digital Transactions</span> </h1>

            <p className='max-w-4xl mx-auto text-center pt-8'>
                Umacoin is engineered for speed and scalability, providing a robust, decentralized foundation for the next generation of global commerce. Experience rapid, low-cost payments and unlock new possibilities in the digital economy.
            </p>

            <div className='flex items-center gap-x-6 max-w-5xl mx-auto justify-center pt-10'>
                <div className='flex flex-col gap-y-2'>
                    <div className='flex items-center gap-x-2'>
                        <span >4.7</span>
                        <div className="flex items-center- gap-x-2">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <StarHalf />
                        </div>
                    </div>

                    <p>
                        <span className='font-semibold'>10k+ wallets created</span> since 2025
                    </p>
                </div>

                <Link href={"/sign-up"} className='bg-[#FDE300] text-xl rounded-md px-4 py-4 flex items-center gap-x-2'>
                    Get UmaCoin
                    <ArrowRight />
                </Link>
            </div>
        </div>
    )
}

export default Hero