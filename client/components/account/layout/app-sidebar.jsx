import Logo from "@/components/layout/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import SidebarLinks from "./SidebarLinks"

export function AppSidebar() {
  return (
    <Sidebar className={"bg-[#1C1C1C]! border-r border-[#1C1C1C] px-2 py-2"}>
      <SidebarHeader className="flex! flex-row! font-semibold tex -lg items-center gap-x-2 bg-[#1C1C1C]!">
        <Logo />
        <span className="text-white">Umacoin.com</span>
      </SidebarHeader>
      <SidebarContent className={"bg-[#1C1C1C]! pt-4"}>
        <SidebarLinks />
      </SidebarContent>
      <SidebarFooter className={"bg-[#1C1C1C]!"} />
    </Sidebar>
  )
}