"use client"

import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useWalletStore } from '@/lib/store';
import { useUser } from '@clerk/nextjs';
import { Spinner } from '@/components/ui/spinner';

const TransactionHistroyTable = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const { walletAddress, basePrice, balance, publicKey, privateKey, setWalletInfo } = useWalletStore(state => state);
    const { isLoaded, isSignedIn } = useUser();

    const getTransactions = async () => {
        try {
            setIsLoading(true);

            const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/wallet/${walletAddress}/history`);
            const data = res?.data;

            if (!data?.success) {
                throw new Error("Failed to load transations history");
                setIsLoading(false);
            }

            setTransactions(data?.transactions);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            toast.error("Failed to load transactions history");
        }
    }

    useEffect(() => {
        getTransactions();
    }, [])
    return (
        <div>
            {
                (isLoaded && isSignedIn) && (
                    (transactions?.length > 0 && !isLoading) ? (
                        <Table>
                            <TableCaption>A list of your recent transactions.</TableCaption>
                            <TableHeader>
                                <TableRow className="border-b-neutral-500 hover:bg-neutral-400/20! py-6!">
                                    <TableHead className="w-[300px] text-neutral-300">Transaction Id</TableHead>
                                    <TableHead className="text-neutral-300">Sender</TableHead>
                                    <TableHead className="text-neutral-300">Receiver</TableHead>
                                    <TableHead className="text-left text-neutral-300">Amount</TableHead>
                                    <TableHead className="text-left text-neutral-300">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((tx) => (
                                    <TableRow key={tx.id} className="hover:bg-neutral-400/20! border-b-neutral-600!">
                                        <TableCell className="font-medium text-neutral-400 py-6">{tx.id?.slice(0, 20)}</TableCell>
                                        <TableCell className="font-medium text-neutral-400 py-6">{tx.sender}</TableCell>
                                        <TableCell className="text-neutral-400 py-6">{tx.receiver}</TableCell>
                                        <TableCell className="text-left text-neutral-400 py-6">{tx.amount}</TableCell>
                                        <TableCell className="text-left text-black py-6">{tx.status === 0 ? <div className='bg-orange-400 font-semibold rounded-full w-fit px-2'>Pending</div> : <div className='bg-green-600 font-semibold rounded-full w-fit px-2'>Confirmed</div>}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        (transactions?.length === 0 && isLoading) ? (
                            <div className='w-full flex items-center justify-center'>
                                <Spinner className="w-10 h-10 text-neutral-400" />
                            </div>
                        ) : (
                            <div className='text-neutral-300 text-2xl'>
                                No transaction done yet.
                            </div>
                        )
                    )
                )
            }
        </div>
    )
}

export default TransactionHistroyTable