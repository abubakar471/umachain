"use client"

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useWalletStore } from '@/lib/store'
import { useUser } from '@clerk/nextjs'
import { Globe, MoveDownLeft, MoveUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const YourBalance = () => {
    const { walletAddress, balance, basePrice } = useWalletStore(state => state);
    const { isLoaded, isSignedIn } = useUser();

    return (
        <div className='bg-[#1C1C1C] backdrop:blur-2xl p-6 rounded-lg w-full h-max'>
            <div className='flex flex-col lg:flex-row items-center gap-2 justify-start lg:justify-between'>
                <h3 className='text-neutral-400'>TOTAL BALANCE</h3>

                {
                    (isLoaded && isSignedIn) && (
                        <div className='flex items-start gap-x-2 text-sm'>
                            <Globe className='text-cyan-500' />

                            <p className='text-neutral-400'>
                                wallet address : {walletAddress}
                            </p>
                        </div>
                    )
                }

            </div>

            <div className='flex flex-col lg:flex-row items-center justify-between gap-x-4 gap-y-4 pt-3 lg:pt-6'>
                <h4 className='text-4xl text-center lg:text-start text-neutral-300 font-semibold pt-4 space-y-2'>{(balance).toFixed(2)} UMC <sup className='text-2xl text-[#FDE300]'>${(balance * basePrice).toFixed(2)} USD</sup></h4>

                <div className='flex items-center gap-x-3'>
                    <Link href={"/account/buy"}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className={"cursor-pointer border border-neutral-400/50 bg-neutral-400/40 hover:bg-neutral-400/50 text-white hover:text-white"}>
                                    Buy
                                    <MoveUpRight /></Button>
                            </TooltipTrigger>
                            <TooltipContent className={"border border-neutral-400 text-white"}>
                                <p>Buy</p>
                            </TooltipContent>
                        </Tooltip>
                    </Link>

                    <Link href={"/account/sell"}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className={"cursor-pointer border border-neutral-400/50 bg-neutral-400/40 hover:bg-neutral-400/50 text-white hover:text-white"}>
                                    Sell
                                    <MoveDownLeft />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className={"border border-neutral-400 text-white"}>
                                <p>Sell</p>
                            </TooltipContent>
                        </Tooltip>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default YourBalance