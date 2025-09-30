import { Plus, MessageSquare, Calendar } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-12 h-12 rounded-full backdrop-blur-xl bg-primary/20 border border-primary/30 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-float">
            <MessageSquare className="h-5 w-5 text-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="glass-panel">
          <p>New Message</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="w-12 h-12 rounded-full backdrop-blur-xl bg-accent/20 border border-accent/30 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-float" style={{ animationDelay: "0.2s" }}>
            <Calendar className="h-5 w-5 text-accent" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="glass-panel">
          <p>New Event</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button className="floating-button">
            <Plus className="h-6 w-6 text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left" className="glass-panel">
          <p>Quick Add</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}