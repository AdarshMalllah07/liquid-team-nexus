import { Bell, Search, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavbarProps {
  onMenuClick: () => void;
}

export default function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
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
          <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center">
            <span className="text-white font-bold text-lg">ST</span>
          </div>
          <h1 className="text-xl font-bold text-glass-foreground">SmartTeam</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 glass-input px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-48"
          />
        </div>

        <Button variant="ghost" size="icon" className="glass-button relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="glass-button">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-panel mt-2" align="end">
            <DropdownMenuItem className="hover:bg-glass-hover cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-glass-hover cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-glass-hover cursor-pointer">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}