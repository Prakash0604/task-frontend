"use client";

import { useState, useEffect } from "react";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sideBar";
import Header from "./header";
import { TaskProvider } from "./taskContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function DashboardWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Map routes to sidebar labels
  const routeToTab = useMemo(
    () => ({
      "/dashboard": "Dashboard",
      "/tasks": "My Tasks",
      "/projects": "Projects",
      "/goals": "Goals",
      "/calendar": "Calendar",
      "/notifications": "Notifications",
      "/settings": "Settings",
      "/help": "Help",
    }),
    []
  );

  // Sync selectedTab with current route
  useEffect(() => {
    const tab = routeToTab[pathname as keyof typeof routeToTab] || "Dashboard";
    setSelectedTab(tab);
  }, [pathname, routeToTab]);

  return (
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="flex min-h-screen dark:bg-gray-900">
          {/* Sidebar */}
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />

          {/* Main content area */}
          <div className="flex-1 flex flex-col">
            <Header
              setIsSidebarOpen={setIsOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {/* <Header setIsSidebarOpen={setIsOpen} /> */}

            {/* Page content */}
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
      </DndProvider>
    </TaskProvider>
  );
}
