"use client"

import Logo from '@/components/layout/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { useWalletStore } from '@/lib/store'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { Globe, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const TransferFundBox = () => {
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState(0.00);
    const [amountOnDollars, setAmountOnDollars] = useState(0.00);
    const [errMessage, setErrMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const { walletAddress, basePrice, balance } = useWalletStore(state => state);
    const { user, isSignedIn, isLoaded } = useUser();

    const handleAmountChange = (e, flag = "") => {
        try {
            setErrMessage("");
            if (amount > balance) {
                setErrMessage("Insufficient Funds");
            }

            if (!flag) {
                setAmount(e.target.value);
                setAmountOnDollars(e.target.value * basePrice);
            } else {
                setAmount(e.target.value / basePrice);
                setAmountOnDollars(e.target.value);
            }


        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSending(true);

            if (!walletAddress || !isSignedIn || !isLoaded) {
                setErrMessage("wallet not synced");
            }

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/add-transaction?sender=${walletAddress}&receiver=${receiver}&amount=${amount}`);

            const data = res?.data;

            if (!data?.success) {
                setErrMessage(data?.message);
            } else {
                setReceiver("");
                setAmount(0.0);
                setAmountOnDollars(0.0);

                toast.success("Transaction is in progress")
            }

            setIsSending(false);
        } catch (err) {
            console.log(err);
            setErrMessage("Failed to transfer funds");
            setIsSending(false);
        }
    }


    useEffect(() => {
        if (errMessage) {
            toast.error("Insufficient Fund");
        }
    }, [errMessage])
    return (
        (isLoaded && isSignedIn) && (
            <div>
                <form onSubmit={handleSubmit} className='bg-[#1C1C1C] w-full p-6 rounded-lg'>
                    {/* <p className='text-red-500 mb-2'>
                        {errMessage}
                    </p> */}
                    <div className="flex items-center gap-x-2">
                        <div className='w-9 h-9 flex items-center justify-center p-2 rounded-md bg-linear-to-br text-white from-white/20 via-[#555] to-white/20 '>
                             <Globe className='text-cyan-500' />
                        </div>
                     
                        <Input type="text" placeholder="Reciever wallet address" className="outline-none ring-0! focus:ring-0! border-0 border-b-2 border-neutral-500 p-5 indent-2 rounded-b-none text-neutral-400"
                            value={receiver}
                            onChange={e => setReceiver(e.target.value)}
                        />
                    </div>

                    <div className='w-full flex flex-col lg:flex-row items-center gap-4 mt-6'>
                        <div className='flex flex-col gap-y-2 w-full lg:w-1/2 space-y-4'>
                            <Label className="text-neutral-500" htmlFor="umacoin-amount">Umacoin Amount</Label>

                            <div className="flex items-center gap-x-2">
                                <Logo />
                                <Input type="number" name="umacoin-amount" placeholder="0.00" className="outline-none ring-0! focus:ring-0! border-0 border-b-2 p-5 indent-2 rounded-b-none border-neutral-500 text-neutral-400"
                                    value={amount}
                                    onChange={e => {
                                        if ((e.target.value <= balance) && (e.target.value > 0)) {
                                            handleAmountChange(e);
                                        } else {
                                            setErrMessage("Insufficient Funds");
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-y-2 w-full lg:w-1/2 space-y-4'>
                            <Label className="text-neutral-500">Amount in Dollars</Label>

                            <div className="flex items-center gap-x-2">
                                <div className='w-9 h-9 flex items-center justify-center p-2 rounded-md bg-linear-to-br text-white from-white/50 via-[#555] to-white/50 '>
                                    $
                                </div>

                                <Input type="number" placeholder="0.00" className="outline-none ring-0! focus:ring-0! p-5 indent-2 rounded-b-none border-0 border-b-2 border-neutral-500 text-neutral-400"
                                    value={amountOnDollars}
                                    onChange={e => {
                                        if (amount <= balance) {
                                            if ((e.target.value <= (balance * 10)) && e.target.value > 0) {
                                                handleAmountChange(e, "DOLLAR");
                                            } else {
                                                setErrMessage("Insufficient Funds");
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>


                    </div>

                    <Button disabled={isSending} className={"bg-[#FDE300] hover:bg-[#FDE300]/80 cursor-pointer text-black text-xl mt-4 w-full py-6"}>
                        Send
                        {
                            !isSending ? <Send /> : <Spinner />
                        }
                    </Button>
                </form>
            </div>
        )
    )
}

export default TransferFundBox