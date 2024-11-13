import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Book, ChartColumnStacked, CircleDollarSign, CreativeCommons, LogOut, UserRoundCog, Users } from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "Peminjaman",
    url: "/peminjaman",
    icon: <CreativeCommons />,
  },
  {
    title: "Buku",
    url: "/buku",
    icon: <Book />,
  },
  {
    title: "Kategori Buku",
    url: "/kategori-buku",
    icon: <ChartColumnStacked />,
  },
  {
    title: "Anggota",
    url: "/anggota",
    icon: <Users />,
  },

  {
    title: "Users",
    url: "/users",
    icon: <UserRoundCog />,
  },
  {
    title: "Denda",
    url: "/denda",
    icon: <CircleDollarSign />,
  },
];
export function AppSidebar({ name }: { name: string }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild type="submit">
              <h3 className="font-bold text-[16px]">Halo, {name} 👋</h3>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild type="submit">
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/auth/login" });
                }}>
                <Button type="submit" className="w-full font-bold">
                  Logout
                  <LogOut />
                </Button>
              </form>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
