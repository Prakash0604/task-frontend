"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Target,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  SquareUserRound,
  User,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import Container from "../containers/main-container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

interface MenuItem {
  name: string;
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const menu: MenuItem[] = [
  { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
  { name: "My Tasks", link: "/tasks", icon: ListTodo },
  { name: "Projects", link: "/projects", icon: FolderKanban },
  { name: "Goals", link: "/goals", icon: Target },
  { name: "Calendar", link: "/calendars", icon: Calendar },
  { name: "Notifications", link: "/notifications", icon: Bell },
  { name: "Client", link: "/clients", icon: SquareUserRound },
  { name: "Users", link: "/users", icon: User },
  { name: "Settings", link: "/settings", icon: Settings },
  { name: "Help", link: "/help", icon: HelpCircle },
];

const Tabs: React.FC = () => {
  const pathname = usePathname();

  return (
    <Container className="flex absolute bottom-0 left-0 w-full md:py-4 py-2 md:px-8 px-4 z-50">
      <Container className="w-full p-4 rounded-full relative border border-gray-300 dark:border-gray-700 shadow-md dark:shadow-blue-400 shadow-blue-300 flex items-center xl:hidden">

        {/* Mobile view (small devices) */}
        <div className="flex w-full md:hidden justify-between items-center">
          {menu.slice(0, 3).map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={`${item.name}-${index}`}
                href={item.link}
                className="flex flex-col w-full items-center justify-center"
              >
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    isActive
                      ? "text-[var(--taskmandu-primary)]"
                      : "text-gray-500 dark:text-white"
                  )}
                />
              </Link>
            );
          })}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="trans" className="flex flex-col items-center justify-center">
                <MoreHorizontal className="w-6 h-6 text-gray-500 dark:text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="grid mb-8 mr-8 border-gray-300 dark:border-gray-700 grid-cols-1 gap-2 p-2 border rounded-lg"
            >
              {menu.slice(3).map((item, index) => {
                const isActive = pathname === item.link;
                return (
                  <DropdownMenuItem key={index} asChild>
                    <Link href={item.link} className="flex items-center gap-2">
                      <item.icon
                        className={cn(
                          "w-6 h-6",
                          isActive
                            ? "text-[var(--taskmandu-primary)]"
                            : "text-gray-500 dark:text-white"
                        )}
                      />
                      <span
                        className={cn(
                          "text-sm",
                          isActive
                            ? "text-[var(--taskmandu-primary)]"
                            : "text-gray-500 dark:text-white"
                        )}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Medium and above */}
        <div className="hidden md:flex w-full justify-around xl:hidden">
          {menu.map((item, index) => {
            const isActive = pathname === item.link;
            return (
              <Link
                key={`${item.name}-${index}`}
                href={item.link}
                className="flex items-center p-2 rounded-lg "
              >
                <item.icon
                  className={cn(
                    "w-6 h-6",
                    isActive
                      ? "text-[var(--taskmandu-primary)]"
                      : "text-gray-500 dark:text-white"
                  )}
                />
              </Link>
            );
          })}
        </div>
      </Container>
    </Container>
  );
};

export default Tabs;
