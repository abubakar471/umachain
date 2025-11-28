"use client"

import Logo from '@/components/layout/Logo';
import { Spinner } from '@/components/ui/spinner';
import { useWalletStore } from '@/lib/store';
// import { useWalletStore } from '@/lib/store'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const WalletSync = ({children}) => {
    // const [wallet, setWallet] = 
    // const {wallet, balance, isSyncing} = useWalletStore(state => state);
    // const [wallet, setWallet] = useState("");
    // const [walletBalance, setWalletBalance] = useState(0.00);
    const [isSyncing, setIsSyncing] = useState(true);
    const {user, isLoaded, isSignedIn} = useUser();
    const {walletAddress, balance, setWalletInfo} = useWalletStore(state => state);

const walletInit = async () => {
    try {
        console.log('wallet init')
        setIsSyncing(true);

        if (true) {
            // if (window.localStorage.getItem("walletAddress")) {
            //     setWalletAddress(window.localStorage.getItem("walletAddress"));
            //     setWalletBalance(window.localStorage.getItem("walletBalance"));
            // } 
            console.log("wallet Address : ", walletAddress)
            if(!walletAddress.length) {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/wallet/init?user_id=${user.id}`);

                const data = res?.data;

                if (data?.success) {
                    window.localStorage.setItem("walletAddress", JSON.stringify(data?.wallet));

                    window.localStorage.setItem("walletBalance", data?.balance);

                  setWalletInfo({
                    walletAddress : data.wallet,
                    walletBalance : data.balance
                  })

                  setIsSyncing(false);
                }
            }
        }
    } catch (err) {
        console.log("error syncing wallet", err);
        setIsSyncing(false);
        return;
    } finally{
        setIsSyncing(false);
    }
}

useEffect(() => {
    walletInit();
},[isSignedIn, isLoaded])

    return (
    <div>
        {
        (isSyncing && !walletAddress) ? (
            <div className='flex flex-col gap-y-4 items-center justify-center min-h-screen'>
            {/* <Logo /> */}
                <div className='flex items-center gap-x-2 gap-y-2'>
                <h1 className='text-4xl text-white'>Please wait, Your Wallet is syncing</h1>
                <Spinner className={"text-[#D4C13E] text-2xl w-10 h-10"} />
                </div>
            </div>
    ) : (
        <div>
            {children}
        </div>
    )
   }
    </div>
  )
}

export default WalletSync