"use client";

import React from "react";
import Container from "../containers/main-container";
import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Target,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  SquareCheckBig,
  SquareUserRound,
  User,
  Loader2Icon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useLogoutStore from "@/store/user-auth/logout-store";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

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

const SidebarComponents = () => {
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  const { logout, isLoading, error } = useLogoutStore();
  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status) {
        toast.success("Logout successful", {
          description: response.message,
          style: { backgroundColor: "#ffffff", color: "#4CAF50" },
        });
        router.push("/login");
      } else {
        toast.error(error || "Logout failed", {
          description: response.message,
          style: { backgroundColor: "#ffffff", color: "red" },
        });
      }
    } catch (error) {
      toast.error("Error!", {
        description: String(error),
        style: { backgroundColor: "#ffffff", color: "red" },
      });
    }
  };

  return (
    <Container className="max-h-screen xl:w-[22%] bg-[var(--taskmandu-background)] xl:flex hidden border-r border-gray-200 py-4 px-6 flex-col items-center relative dark:bg-gray-900 dark:border-gray-700 ">
      <div className="flex items-center gap-2 cursor-pointer mb-8">
        <div className="bg-[#2596be] p-2 rounded-lg cursor-pointer">
          <SquareCheckBig className="text-white h-5 w-5 cursor-pointer" />
        </div>
        <span className="font-bold text-2xl text-black dark:text-white">
          TaskMandu
        </span>
      </div>
      <Container className="grid grid-cols-2 gap-4 h-[40%] w-full mt-4">
        {menu.map((item, index) => {
          const isActive = pathname === item.link; // Check if the current route matches the link
          return (
            <div
              key={`${item.name}-${index}`}
              className={`rounded-md flex items-center justify-center dark:text-white cursor-pointer transition-colors duration-200 ease-in-out ${isActive
                ? "bg-gray-200 dark:bg-gray-700"
                : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
            >
              <Link
                href={item.link}
                className="flex items-center flex-col justify-center"
              >
                <item.icon
                  className={`${isActive ? "text-blue-500" : "text-black dark:text-white"
                    }`}
                />
                <h1
                  className={`${isActive ? "text-blue-500" : "text-black dark:text-white"
                    }`}
                >
                  {item.name}
                </h1>
              </Link>
            </div>
          );
        })}
      </Container>
      <Button
        className="bg-[var(--taskmandu-primary)] text-black w-full rounded-md transition-colors duration-200 ease-in-out absolute bottom-5 text-xl cursor-pointer"
        onClick={handleLogout}
        disabled={isLoading}
      >
        {isLoading ? <Loader2Icon className="animate-spin" /> : "Logout"}
      </Button>
    </Container>
  );
};

export default SidebarComponents;
