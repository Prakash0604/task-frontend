"use client";

import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

interface HeaderProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 flex items-center justify-between ">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative flex-1 max-w-3xl">
          <Input
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="h-5 w-5 text-black hover:text-blue-500 transition-colors " />
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar1.png" alt="Kai Shaw" />
          <AvatarFallback>KS</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium hidden md:block">Kai Shaw</span>
      </div>
    </header>
  );
};

export default Header;
