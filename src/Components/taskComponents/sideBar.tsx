"use client";

import { useRouter } from "next/navigation";
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
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-lg w-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-500 ${
        active ? "text-[#2596be]" : "text-gray-600 dark:text-white"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span
        className={`text-xs font-medium mt-1 ${
          active ? "text-[#2596be]" : "text-gray-600 dark:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  selectedTab,
  setSelectedTab,
}) => {
  const router = useRouter();

  const sidebarItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard className="h-6 w-6 cursor-pointer" />,
      route: "/dashboard",
    },
    {
      label: "My Tasks",
      icon: <ListTodo className="h-6 w-6 cursor-pointer" />,
      route: "/tasks",
    },
    {
      label: "Projects",
      icon: <FolderKanban className="h-6 w-6 cursor-pointer" />,
      route: "/projects",
    },
    {
      label: "Goals",
      icon: <Target className="h-6 w-6 cursor-pointer" />,
      route: "/goals",
    },
    {
      label: "Calendar",
      icon: <Calendar className="h-6 w-6 cursor-pointer" />,
      route: "/calendar",
    },
    {
      label: "Notifications",
      icon: <Bell className="h-6 w-6 cursor-pointer" />,
      route: "/notifications",
    },
    {
      label: "Settings",
      icon: <Settings className="h-6 w-6 cursor-pointer" />,
      route: "/settings",
    },
    {
      label: "Help",
      icon: <HelpCircle className="h-6 w-6 cursor-pointer" />,
      route: "/help",
    },
  ];

  const handleItemClick = (label: string, route: string) => {
    setSelectedTab(label);
    router.push(route);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform dark:bg-gray-900 dark:text-white ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 md:static md:flex md:flex-col md:w-64 border-r border-gray-200`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-[#2596be] p-2 rounded-lg cursor-pointer">
            <SquareCheckBig className="text-white h-5 w-5 cursor-pointer" />
          </div>
          <span className="font-bold text-gray-800 dark:text-white">
            TaskMandu
          </span>
        </div>
        <button
          className="md:hidden text-gray-600 hover:text-gray-800 dark:text-white dark:hover:text-gray-200 cursor-pointer"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 dark:bg-gray-900 dark:text-white">
        <div className="grid grid-cols-2 gap-2 cursor-pointer dark:text-white">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={selectedTab === item.label}
              onClick={() => handleItemClick(item.label, item.route)}
            />
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
