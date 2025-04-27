import React, { useState } from "react";
import { cn } from "@/lib/utils"; // Shadcn/UI utility for classNames
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
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "../ui/drawer";
import Container from "../containers/main-container";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Container
      className={cn(
        "flex absolute bottom-0 left-0 w-full md:py-4 py-2 md:px-8 px-4 z-50"
      )}
    >
      <Container
        className={cn(
          "w-full p-4 rounded-full flex items-center border border-gray-200 bg-white xl:hidden"
        )}
      >
        {/* For small devices (sm and below), show limited tabs and drawer */}
        <div className="flex w-full md:hidden">
          {menu.slice(0, 3).map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              href={item.link}
              className="flex flex-col w-full items-center justify-center"
            >
              <item.icon className="text-black w-6 h-6" />
            </Link>
          ))}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <button className="flex flex-col w-full items-center justify-center">
                <MoreHorizontal className="text-black w-6 h-6" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="h-[50vh] p-4">
              <DrawerTitle className="sr-only">Menu Options</DrawerTitle>
              <div className="grid grid-cols-2 gap-4">
                {menu.map((item, index) => (
                  <Link
                    key={`${item.name}-${index}`}
                    href={item.link}
                    className="flex items-center p-4 rounded-lg hover:bg-gray-100"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    <item.icon className="text-black w-6 h-6 mr-2" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* For medium devices and above (md and up), show full tabs */}
        <div className="hidden md:flex w-full justify-around xl:hidden">
          {menu.map((item, index) => (
            <Link
              key={`${item.name}-${index}`}
              href={item.link}
              className="flex items-center p-2 rounded-lg hover:bg-gray-100"
            >
              <item.icon className="text-black w-6 h-6 mr-2" />
              {/* <span className="text-sm font-medium">{item.name}</span> */}
            </Link>
          ))}
        </div>
      </Container>
    </Container>
  );
};

export default Tabs;
