import { useState } from "react";
import { Bell, Search, User, Menu, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchModal from "./SearchModal";
import NotificationPanel from "./NotificationPanel";
import ProfileModal from "./ProfileModal";
import SettingsModal from "./SettingsModal";

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <nav className="glass-panel rounded-none rounded-b-2xl border-t-0 border-x-0 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden glass-button"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">ST</span>
            </div>
            <h1 className="text-xl font-bold">SmartTeam</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center gap-2 glass-input px-4 py-2 cursor-pointer hover:bg-glass-hover transition-colors"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search...</span>
          </button>

          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="glass-button relative"
              onClick={() => setNotificationOpen(!notificationOpen)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
            </Button>
            <NotificationPanel isOpen={notificationOpen} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="glass-button">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-panel mt-2" align="end">
              <DropdownMenuItem 
                className="hover:bg-glass-hover cursor-pointer"
                onClick={() => setProfileOpen(true)}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-glass-hover cursor-pointer"
                onClick={() => setSettingsOpen(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-glass-hover cursor-pointer">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}