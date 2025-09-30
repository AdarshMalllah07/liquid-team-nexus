import { useState } from "react";
import { Search, File, Users, Calendar, MessageSquare, Hash } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const searchResults = [
  { id: 1, title: "Q4 Revenue Report", type: "file", icon: File },
  { id: 2, title: "Marketing Team", type: "team", icon: Users },
  { id: 3, title: "Product Launch Meeting", type: "event", icon: Calendar },
  { id: 4, title: "Design Discussion", type: "chat", icon: MessageSquare },
  { id: 5, title: "#general", type: "channel", icon: Hash },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredResults = searchResults.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-panel max-w-2xl p-0 gap-0">
        <div className="p-4 border-b border-border/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for files, teams, events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 glass-input"
              autoFocus
            />
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-glass-hover cursor-pointer transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No results found for "{query}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}