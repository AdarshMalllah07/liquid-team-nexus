import { useState } from "react";
import { Send, Paperclip, Smile, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isOwn: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hey team! How's the progress on the new feature?",
    sender: "Alice",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    text: "Going great! Just finished the API integration.",
    sender: "You",
    timestamp: "10:32 AM",
    isOwn: true,
  },
  {
    id: "3",
    text: "Awesome! I'll review the PR this afternoon.",
    sender: "Bob",
    timestamp: "10:35 AM",
    isOwn: false,
  },
  {
    id: "4",
    text: "Thanks Bob! Let me know if you need any clarification.",
    sender: "You",
    timestamp: "10:36 AM",
    isOwn: true,
  },
];

const teamMembers = [
  { id: "1", name: "Alice", status: "online", avatar: "A" },
  { id: "2", name: "Bob", status: "online", avatar: "B" },
  { id: "3", name: "Charlie", status: "away", avatar: "C" },
  { id: "4", name: "Diana", status: "offline", avatar: "D" },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState(teamMembers[0]);

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "You",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400";
      case "away":
        return "bg-yellow-400";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)] animate-fade-in">
      {/* Team Members Sidebar */}
      <div className="glass-panel p-4 hidden lg:block">
        <h3 className="font-semibold text-glass-foreground mb-4">Team Members</h3>
        <div className="space-y-2">
          {teamMembers.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedMember.id === member.id
                  ? "bg-gradient-accent text-white"
                  : "hover:bg-glass-hover"
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                  {member.avatar}
                </div>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(
                    member.status
                  )}`}
                />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs opacity-70">{member.status}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3 glass-panel p-4 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-4 border-b border-glass-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                {selectedMember.avatar}
              </div>
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(
                  selectedMember.status
                )}`}
              />
            </div>
            <div>
              <p className="font-semibold text-glass-foreground">{selectedMember.name}</p>
              <p className="text-xs text-muted-foreground">{selectedMember.status}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="glass-button">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-xs ${message.isOwn ? "order-2" : ""}`}>
                  {!message.isOwn && (
                    <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>
                  )}
                  <div
                    className={
                      message.isOwn ? "chat-bubble-sender" : "chat-bubble-receiver"
                    }
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="pt-4 border-t border-glass-border">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="glass-button">
              <Paperclip className="h-5 w-5" />
            </Button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 glass-input"
            />
            <Button variant="ghost" size="icon" className="glass-button">
              <Smile className="h-5 w-5" />
            </Button>
            <Button onClick={handleSend} className="glass-button bg-gradient-accent">
              <Send className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}