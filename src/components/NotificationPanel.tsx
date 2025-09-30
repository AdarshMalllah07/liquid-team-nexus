import { Bell, MessageSquare, Users, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface NotificationPanelProps {
  isOpen: boolean;
}

const notifications = [
  {
    id: 1,
    type: "message",
    icon: MessageSquare,
    title: "New message from Sarah",
    description: "Hey, can we review the Q4 report?",
    time: "2 min ago",
    unread: true,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    id: 2,
    type: "team",
    icon: Users,
    title: "Team meeting in 30 minutes",
    description: "Marketing sync - Conference Room A",
    time: "28 min",
    unread: true,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    id: 3,
    type: "calendar",
    icon: Calendar,
    title: "Event reminder",
    description: "Product launch presentation at 3 PM",
    time: "1 hour ago",
    unread: false,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    id: 4,
    type: "trend",
    icon: TrendingUp,
    title: "Weekly report available",
    description: "Your team achieved 120% of the target",
    time: "2 hours ago",
    unread: false,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    id: 5,
    type: "alert",
    icon: AlertCircle,
    title: "System update completed",
    description: "All services are running smoothly",
    time: "3 hours ago",
    unread: false,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  }
];

export default function NotificationPanel({ isOpen }: NotificationPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-2 w-96 glass-panel shadow-xl z-50">
      <div className="p-4 border-b border-border/20">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          <button className="text-sm text-primary hover:underline">Mark all as read</button>
        </div>
      </div>
      
      <ScrollArea className="h-[400px]">
        <div className="p-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 rounded-lg mb-2 hover:bg-glass-hover cursor-pointer transition-all ${
                notification.unread ? "bg-primary/5" : ""
              }`}
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                  <notification.icon className={`h-4 w-4 ${notification.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}