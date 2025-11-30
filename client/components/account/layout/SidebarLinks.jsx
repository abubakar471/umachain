"use client"

import { SidebarGroup } from '@/components/ui/sidebar'
import { ArrowLeftRight, BadgeDollarSign, Home, Receipt, Wallet } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SidebarLinks = () => {
    const pathname = usePathname();

    const links = [
        {
            name : "Home", 
            href : "/account",
            icon : <Home />
        },
        {
            name : "Buy",
            href : "/account/buy",
            icon : <Wallet />
        },
        {
            name : "Sell", 
            href : "/account/sell",
            icon : <BadgeDollarSign />
        },
        {
            name : "Transfer", 
            href : "/account/transfer",
            icon : <ArrowLeftRight />
        },
        {
            name : "Transactions", 
            href : "/account/transactions",
            icon : <Receipt />
        }
    ]

  return (
    <SidebarGroup className={"flex flex-col gap-y-4"}>
        {
            links.map((link, idx) => (
                <Link key={idx} href={link.href} className={`${pathname === link.href ? "bg-foreground" : "bg-transparent"} hover:bg-foreground py-2 px-2 rounded-md flex items-center gap-x-2`}>
                 <div className={`${pathname === link.href ? "text-[#FDE300]" : "text-neutral-500"} text-sm`}>
                     {link.icon}
                 </div>

                    <span className={`${pathname === link.href ? "text-white" : "text-neutral-500"} text-sm`}>{link.name}</span>
                </Link>
            ))
        }
    </SidebarGroup>
  )
}

export default SidebarLinks