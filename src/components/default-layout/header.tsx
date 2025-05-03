"use client";

import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import Container from "../containers/main-container";
import useAuthStore from "@/store/user-auth/user-auth-store";
import { useEffect } from "react";
import noavatar from "@/assets/noavatar.jpg"
import Image from "next/image";

interface HeaderProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = () => {
  const { profile, fetchProfile } = useAuthStore()
  useEffect(() => {
    if (!profile) {
      fetchProfile()
    }
  }, [profile, fetchProfile])
  console.log(profile)
  return (
    <header className="bg-[#F2F5F7] shadow-sm border-b border-gray-200 py-3 px-4 flex items-center justify-between dark:bg-gray-900 dark:border-gray-700 dark:text-white">
      <Container className="flex items-center gap-4 flex-1">
        <Container className="relative flex-1 max-w-3xl">
          <Input
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-1 focus:ring-[var(--taskmandu-primary)] text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </Container>
      </Container>
      <Container className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-black hover:text-blue-500 transition-colors dark:text-white" />
        {profile?.profile ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatar1.png" alt="Kai Shaw" />
            <AvatarFallback>{profile?.name}</AvatarFallback>
          </Avatar>
        ) : (
          <Image src={noavatar} alt="Kai Shaw" height={30} width={30} className="object-cover rounded-full" />
        )}

        <span className="text-sm font-medium hidden md:block">{profile?.name}</span>
      </Container>
    </header >
  );
};

export default Header;
