import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/account/layout/app-sidebar'
import SidebarTopHeader from '@/components/account/layout/SidebarTopHeader'
import WalletSync from '@/components/account/layout/WalletSync'

const AccountLayout = ({children}) => {
  return (
  <div className="">
    <WalletSync>
      <SidebarProvider>
        <AppSidebar />
        <main className='py-6 px-6 container mx-auto'>
          <SidebarTopHeader />
          {children}
        </main>
      </SidebarProvider>
    </WalletSync>
  </div>
  )
}

export default AccountLayout