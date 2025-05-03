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
} from "@/components/ui/dropdown-menu"; // ✅ make sure this import is correct for your setup
import { Button } from "../ui/button";

interface MenuItem {
  name: string;
  link: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const menu: MenuItem[] = [
  { name: "Dashboard", link: "/", icon: LayoutDashboard },
  { name: "My Tasks", link: "/tasks", icon: ListTodo },
  { name: "Projects", link: "/projects", icon: FolderKanban },
  { name: "Goals", link: "/goals", icon: Target },
  { name: "Calendra", link: "/calendra", icon: Calendar },
  { name: "Notifications", link: "/notification", icon: Bell },
  { name: "Client", link: "/client", icon: SquareUserRound },
  { name: "Users", link: "/user", icon: User },
  { name: "Settings", link: "/setting", icon: Settings },
  { name: "Help", link: "/help", icon: HelpCircle },
];

const Tabs: React.FC = () => {


  return (
    <Container
      className={cn(
        "flex absolute bottom-0 left-0 w-full md:py-4 py-2 md:px-8 px-4 z-50"
      )}
    >
      <Container
        className={cn(
          "w-full p-4 rounded-full relative border border-gray-300 dark:border-gray-700  flex items-center xl:hidden",
        )}
      >
        {/* For small devices (sm and below) */}
        <div className="flex w-full md:hidden justify-between items-center">
          {menu.slice(0, 3).map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              href={item.link}
              className="flex flex-col w-full items-center justify-center"
            >
              <item.icon
                className={cn(
                  "w-6 h-6 text-gray-700 dark:text-[#F2F5F7]",
                )}
              />
            </Link>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={'trans'} className="flex flex-col  items-center justify-center">
                <MoreHorizontal
                  className={cn(
                    "w-6 h-6 text-gray-700 dark:text-[#F2F5F7]",

                  )}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className={`grid  mb-8 mr-8 border-gray-300  dark:border-gray-700   grid-cols-1 gap-2 p-2 border rounded-lg `} >
              {menu.slice(3).map((item, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.link} className="flex items-center gap-2">
                    <item.icon
                      className={cn(
                        "w-6 h-6 text-gray-700 dark:text-[#F2F5F7]",
                      )}
                    />
                    <span className={cn(
                      "text-sm text-gray-700 dark:text-[#F2F5F7]",
                    )}>{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* For medium devices and above */}
        <div className="hidden md:flex w-full justify-around xl:hidden">
          {menu.map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              href={item.link}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon
                className={cn(
                  "w-6 h-6 text-gray-700 dark:text-[#F2F5F7]",
                )}
              />
            </Link>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default Tabs;
