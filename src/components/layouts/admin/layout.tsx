"use client";
import { Header } from "@/components/pages/dashboard/header";
import { SidebarItem } from "@/components/sidebarItem";
import { siteSettings } from "@/settings/site.settings";
import { Avatar } from "@radix-ui/themes";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const SidebarItemMap = () => (
    <>
      {siteSettings.sidebarLinks.admin.map(({ href, label, icon }) => (
        <SidebarItem href={href} label={label} icon={icon} key={href} />
      ))}
    </>
  );
  return (
    <div className="flex">
      <div className=" bg-gray-900 w-[5rem] h-screen flex flex-col items-center ">
        <div className="w-12  mt-[2rem] rounded-lg justify-center flex flex-col gap-5">
          <Avatar
            style={{ borderRadius: "5rem", width: 50 }}
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
          />
        </div>
        <div className="justify-center items-center w-12 mt-[10rem] flex flex-col gap-5">
          <SidebarItemMap />
        </div>
      </div>
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
