import {
  LayoutDashboard,
  ListTodo,
  FolderKanban,
  Target,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
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
      className={`flex items-center gap-2 p-2 rounded-lg w-full text-left transition-colors ${
        active ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
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
}: SidebarProps) => {
  const sidebarItems = [
    { label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "My Tasks", icon: <ListTodo className="h-5 w-5" /> },
    { label: "Projects", icon: <FolderKanban className="h-5 w-5" /> },
    { label: "Goals", icon: <Target className="h-5 w-5" /> },
    { label: "Calendar", icon: <Calendar className="h-5 w-5" /> },
    { label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { label: "Settings", icon: <Settings className="h-5 w-5" /> },
    { label: "Help", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 md:static md:flex md:flex-col md:w-64 border-r border-gray-200`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <div className="text-white font-bold">⬓</div>
          </div>
          <span className="font-bold text-gray-800">Open Task</span>
        </div>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={selectedTab === item.label}
            onClick={() => {
              setSelectedTab(item.label);
              setIsOpen(false);
            }}
          />
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
