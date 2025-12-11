import { useUser } from "@clerk/nextjs";
import { useState } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios";



export const useWalletStore = create()(persist(
    (set => ({
        basePrice : 0,
        walletAddress: "",
        balance: 0.00,
        publicKey : "", 
        privateKey : "", 
        setWalletInfo : (payload) => set({
            basePrice : payload.basePrice, 
            walletAddress : payload.walletAddress,
            balance : payload.balance
        }),
        setPemKeys : (payload) => set({
            publicKey : payload.pubPem,
            privateKey : payload.privPem
        }),
    })),{
        name : "wallet-storage",
        skipHydration : true
    }
))