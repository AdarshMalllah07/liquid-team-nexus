import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopNavbar from "./components/TopNavbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TaskBoard from "./components/TaskBoard";
import Chat from "./components/Chat";
import Calendar from "./components/Calendar";
import Notes from "./components/Notes";
import Admin from "./components/Admin";
import FloatingActions from "./components/FloatingActions";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex">
              <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              <main className="flex-1 p-6 overflow-x-hidden">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/tasks" element={<TaskBoard />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<Dashboard />} />
                </Routes>
              </main>
            </div>
            <FloatingActions />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
