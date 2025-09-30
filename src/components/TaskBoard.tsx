import { useState } from "react";
import { Plus, MoreVertical, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "review" | "done";
}

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design System Update",
    description: "Update color palette and components",
    assignee: "Alice",
    priority: "high",
    status: "todo",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connect frontend with backend services",
    assignee: "Bob",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: "3",
    title: "User Testing",
    description: "Conduct usability testing sessions",
    assignee: "Charlie",
    priority: "low",
    status: "review",
  },
  {
    id: "4",
    title: "Documentation",
    description: "Write technical documentation",
    assignee: "Diana",
    priority: "medium",
    status: "done",
  },
];

const columns = [
  { id: "todo", title: "To Do", icon: AlertCircle, color: "text-yellow-400" },
  { id: "in-progress", title: "In Progress", icon: Clock, color: "text-blue-400" },
  { id: "review", title: "Review", icon: MoreVertical, color: "text-purple-400" },
  { id: "done", title: "Done", icon: CheckCircle, color: "text-green-400" },
];

export default function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.currentTarget.classList.add("opacity-50");
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Task["status"]) => {
    e.preventDefault();
    if (draggedTask) {
      setTasks(tasks.map((task) =>
        task.id === draggedTask.id ? { ...task, status } : task
      ));
      setDraggedTask(null);
    }
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "border-red-400/50 bg-red-400/10";
      case "medium":
        return "border-yellow-400/50 bg-yellow-400/10";
      case "low":
        return "border-green-400/50 bg-green-400/10";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glass-foreground">Task Board</h2>
          <Button className="glass-button">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className="glass-card h-fit min-h-[400px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task["status"])}
            >
              <div className="flex items-center gap-2 mb-4">
                <column.icon className={`h-5 w-5 ${column.color}`} />
                <h3 className="font-semibold text-glass-foreground">{column.title}</h3>
                <span className="ml-auto text-xs text-muted-foreground">
                  {tasks.filter((t) => t.status === column.id).length}
                </span>
              </div>

              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column.id)
                  .map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      onDragEnd={handleDragEnd}
                      className={`glass-card cursor-move hover:scale-105 transition-transform duration-200 ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-glass-foreground">
                          {task.title}
                        </h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-panel">
                            <DropdownMenuItem className="hover:bg-glass-hover cursor-pointer">
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-glass-hover cursor-pointer">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center text-white text-xs font-bold">
                          {task.assignee[0]}
                        </div>
                        <span className="text-xs text-muted-foreground capitalize">
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}