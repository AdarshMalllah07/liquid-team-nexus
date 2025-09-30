import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  MessageSquare,
  Calendar,
  FileText,
  BarChart3,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: CheckSquare, label: "Tasks", path: "/tasks" },
  { icon: MessageSquare, label: "Chat", path: "/chat" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: FileText, label: "Notes", path: "/notes" },
  { icon: BarChart3, label: "Admin", path: "/admin" },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 glass-panel rounded-none lg:rounded-r-2xl border-l-0 border-y-0 lg:border-y p-6 z-50 transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden absolute top-4 right-4 glass-button"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <nav className="mt-12 lg:mt-24 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-gradient-accent text-white shadow-lg"
                    : "hover:bg-glass-hover text-glass-foreground"
                )
              }
              onClick={() => onClose()}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="glass-card p-4">
            <p className="text-sm text-muted-foreground mb-2">Team Activity</p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-accent border-2 border-background flex items-center justify-center text-xs text-white font-bold"
                  >
                    U{i}
                  </div>
                ))}
              </div>
              <span className="text-xs text-glass-foreground">+5 online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}