import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/shadcn/menubar"
  
  export default function MenubarDemo() {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Welcome, Yash Aggarwal</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }
  