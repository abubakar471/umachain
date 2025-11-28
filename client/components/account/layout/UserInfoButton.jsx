"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk, UserProfile, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'

const UserInfoButton = () => {
    const { user, isLoaded, isSignedIn } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const { signOut } = useClerk();

    const handleSignout = async () => {
        try {
            setIsLoading(true);
            if (isLoaded) {
                window.localStorage.removeItem("walletAddress");
                window.localStorage.removeItem("walletBalance");

                signOut({ redirectUrl: '/' });
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }

    return (
        (isSignedIn && isLoaded) && (
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Image src={user.imageUrl} alt={user.fullName} width={100} height={100} className='rounded-full w-10 h-10 object-cover cursor-pointer hover:border-2 border-muted' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-100 bg-[#353434] border border-[#1C1C1C] mr-10 py-4" align="start">
                        <DropdownMenuLabel className={"flex items-center gap-x-4"}>
                            <Image src={user.imageUrl} alt={user.fullName} width={100} height={100} className='rounded-full w-10 h-10 object-cover cursor-pointer hover:border-2 border-muted' />

                            <div>
                                <h2 className='text-neutral-100'>Manage Account</h2>
                                {/* <p className="text-sm text-neutral-400">
                                        Manage your umacoin account
                                    </p> */}
                                <p className='text-xs text-neutral-400 pt-2'>{user.emailAddresses[0].emailAddress}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup className="mt-4">
                            <DropdownMenuItem className={"flex items-center justify-start group hover:bg-muted"}>
                                <Settings />
                                <Link href="#" className='text-neutral-300 group-hover:text-neutral-950'>Manage your account
                                </Link>

                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <div className=''>
                            <button onClick={() => handleSignout()} disabled={isLoading} className={"hover:bg-muted px-2.5 py-1.5 rounded-md mt-2 flex items-center justify-start group gap-x-2 text-sm w-full cursor-pointer"}>
                                {
                                    isLoading ? <Spinner className={"text-neutral-950"} /> : <LogOut className='text-neutral-500 w-4 h-4' />
                                }
                                <p className='text-neutral-300 group-hover:text-neutral-950'>
                                    Sign out
                                </p>
                            </button>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        )
    )
}

export default UserInfoButton