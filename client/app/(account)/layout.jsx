import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/account/layout/app-sidebar'
import SidebarTopHeader from '@/components/account/layout/SidebarTopHeader'

const AccountLayout = ({children}) => {
  return (
  <div class="">
    <SidebarProvider>
      <AppSidebar />
      <main className='py-6 px-6 container mx-auto'>
        <SidebarTopHeader />
        {children}
      </main>
    </SidebarProvider>
  </div>
  )
}

export default AccountLayout