"use client"


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
import { Button } from "../ui/button";
import useLogoutStore from "@/store/user-auth/logout-store";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


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

const SidebarComponents = () => {
  const router = useRouter()

  const { logout, isLoading, error } = useLogoutStore()
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
    <Container className="max-h-screen xl:w-[22%] bg-[var(--taskmandu-background)] xl:flex hidden border-r border-gray-200 py-4  px-6 flex-col items-center relative">
      <div className="flex items-center gap-2 cursor-pointer mb-8">
        <div className="bg-[#2596be] p-2 rounded-lg cursor-pointer">
          <SquareCheckBig className="text-white h-5 w-5 cursor-pointer" />
        </div>
        <span className="font-bold text-2xl  text-black">TaskMandu</span>
      </div>
      <Container className="grid grid-cols-2 gap-4 h-[40%] w-full">
        {menu.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="rounded-md  flex items-center justify-center"
          >
            <Link
              href={item.link}
              className="flex items-center flex-col justify-center"
            >
              <item.icon className="text-black" />
              <h1 className="text-black">{item.name}</h1>
            </Link>
          </div>
        ))}
      </Container>
      <Button className="bg-[var(--taskmandu-primary)] text-black w-full rounded-md  transition-colors duration-200 ease-in-out absolute bottom-5  text-xl cursor-pointer" onClick={handleLogout}
        disabled={isLoading}>
        {isLoading ? <Loader2Icon className="animate-spin" /> : "Logout"}
      </Button>

    </Container >
  );
};

export default SidebarComponents;
