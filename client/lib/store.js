import { useUser } from "@clerk/nextjs";
import { useState } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import axios from "axios";



export const useWalletStore = create()(persist(
    (set => ({
        walletAddress: "",
        balance: 0.00,
        setWalletInfo : (payload) => set({
            walletAddress : payload.walletAddress,
            balance : payload.walletBalance
        })
    })),{
        name : "wallet-storage",
        skipHydration : true
    }
))