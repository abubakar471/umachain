"use client"

import Logo from '@/components/layout/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useWalletStore } from '@/lib/store'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SiAmericanexpress } from "react-icons/si";
import { RiVisaFill } from "react-icons/ri";
import { BiCreditCardAlt } from "react-icons/bi";
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Globe } from 'lucide-react'


const SellDialog = () => {
    const [amount, setAmount] = useState(0);
    const [amountOnDollars, setAmountOnDollars] = useState(0.0);
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const { walletAddress, basePrice, balance, publicKey, privateKey, setWalletInfo } = useWalletStore(state => state);
    const { user, isSignedIn, isLoaded } = useUser();
    const router = useRouter();

    const handleAmountChange = (e, flag = "") => {
        try {
            setErrMessage("");
            // if (amount > balance) {
            //     setErrMessage("Insufficient Funds");
            // }

            if (!flag) {
                setAmount(e.target.value);
                setAmountOnDollars(e.target.value / basePrice);
            } else {
                setAmount(e.target.value * basePrice);
                setAmountOnDollars(e.target.value);
            }


        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            const form = new FormData();
            form.append("wallet", walletAddress);
            form.append("uma", String(amount));
            form.append("bankAccount", "4242-4242-4242-4242"); // mock

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/sell`, form);
            const data = res.data;

            if (!data?.success) {
                throw new Error(data?.message);
                setIsLoading(false);
            }

            setWalletInfo({
                basePrice,
                walletAddress,
                balance: data?.new_balance
            })
            router.push("/account/transactions");
        } catch (err) {
            console.log(err);
            toast.error("Failed to sell UMC");
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className='w-fit flex items-center gap-x-2 p-4 rounded-full bg-[#1F1F1F] text-white'>
                    <Logo />
                    Sell UMC
                </div>
            </div>
            <div className='bg-[#1C1C1C] backdrop:blur-2xl p-6 rounded-lg max-w-2xl mx-auto mt-4 min-h-[600px] max-h-max'>
                <div>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-neutral-400'>TOTAL BALANCE</h3>
                        {/* 
                        {
                            (isLoaded && isSignedIn) && (
                                <div className='flex items-start gap-x-2 text-sm'>
                                    <Globe className='text-cyan-500' />

                                    <p className='text-neutral-400'>
                                        wallet address : {walletAddress}
                                    </p>
                                </div>
                            )
                        } */}

                    </div>


                    <h4 className='text-4xl text-center lg:text-start text-neutral-300 font-semibold pt-4 space-y-2'>{(balance).toFixed(2)} UMC <sup className='text-2xl text-[#FDE300]'>${(balance / basePrice).toFixed(2)} USD</sup></h4>
                </div>


                <form onSubmit={handleSubmit} className='space-y-8 mt-10'>
                    <div className='flex flex-col gap-y-2 w-full space-y-4'>
                        <Label className="text-neutral-500" htmlFor="umacoin-amount">Umacoin Amount</Label>

                        <div className="flex items-center gap-x-2">
                            {/* <Logo /> */}
                            <Input type="number" name="umacoin-amount" placeholder="0.00" className="outline-none ring-0! focus:ring-0! border-0 border-b-2 p-5 indent-0 rounded-b-none border-neutral-500 text-neutral-400"
                                value={amount}
                                onChange={e => handleAmountChange(e)}
                            />
                        </div>
                    </div>


                    <div className='flex flex-col gap-y-2 w-full space-y-4'>
                        <Label className="text-neutral-500">Amount in Dollars</Label>

                        <div className="flex items-center gap-x-2">
                            {/* <div className='w-9 h-9 flex items-center justify-center p-2 rounded-md bg-linear-to-br text-white from-white/50 via-[#555] to-white/50 '>
                            $
                        </div> */}

                            <Input type="number" placeholder="0.00" className="outline-none ring-0! focus:ring-0! p-5 indent-0 rounded-b-none border-0 border-b-2 border-neutral-500 text-neutral-400"
                                value={amountOnDollars}
                                onChange={e => handleAmountChange(e, "DOLLAR")}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={isLoading} className={"bg-[#FDE300] hover:bg-[#FDE300]/80 cursor-pointer text-black text-xl mt-4 w-full py-6"}>
                        {
                            !isLoading ? "Sell" : <Spinner />
                        }
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SellDialog