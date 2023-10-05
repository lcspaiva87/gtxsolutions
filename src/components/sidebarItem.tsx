import Link from "@/components/ui/link";
import { getIcon } from "@/utils/get-icon";
import * as sidebarIcons from "@/components/icons/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/utils";
import { Tooltip } from "@radix-ui/themes";

export const SidebarItem = ({ href, icon, label }: any) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-2 font-mono font-medium text-gray-400 hover:text-white",
          isActive && "text-gray-50  text-center items-center"
        )}
      >
        {getIcon({
          iconList: sidebarIcons,
          iconName: icon,
          className: "w-6 h-6",
        })}
      </Link>

  );
};
