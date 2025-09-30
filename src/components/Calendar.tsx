import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  title: string;
  date: number;
  time: string;
  type: "meeting" | "deadline" | "reminder";
}

const events: Event[] = [
  { id: "1", title: "Sprint Planning", date: 5, time: "10:00 AM", type: "meeting" },
  { id: "2", title: "Design Review", date: 12, time: "2:00 PM", type: "meeting" },
  { id: "3", title: "Project Deadline", date: 15, time: "5:00 PM", type: "deadline" },
  { id: "4", title: "Team Standup", date: 20, time: "9:30 AM", type: "meeting" },
  { id: "5", title: "Code Review", date: 25, time: "3:00 PM", type: "reminder" },
];

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(new Date().getDate());

  const getDaysInMonth = () => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  };

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting":
        return "bg-blue-400";
      case "deadline":
        return "bg-red-400";
      case "reminder":
        return "bg-yellow-400";
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth();
    const firstDay = getFirstDayOfMonth();
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-2"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter((e) => e.date === day);
      const isToday = day === new Date().getDate() && 
                      currentMonth === new Date().getMonth() && 
                      currentYear === new Date().getFullYear();
      
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`aspect-square glass-card cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedDate === day ? "ring-2 ring-primary" : ""
          } ${isToday ? "bg-primary/20" : ""}`}
        >
          <div className="h-full flex flex-col p-2">
            <span className={`text-sm font-medium ${
              isToday ? "text-primary" : "text-glass-foreground"
            }`}>
              {day}
            </span>
            <div className="flex-1 mt-1 space-y-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`h-1.5 rounded-full ${getEventTypeColor(event.type)} animate-glow`}
                />
              ))}
              {dayEvents.length > 2 && (
                <span className="text-xs text-muted-foreground">+{dayEvents.length - 2}</span>
              )}
            </div>
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glass-foreground">Calendar</h2>
          <Button className="glass-button">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevMonth}
            className="glass-button"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h3 className="text-lg font-semibold text-glass-foreground">
            {months[currentMonth]} {currentYear}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextMonth}
            className="glass-button"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Events List */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-glass-foreground mb-4">
          Upcoming Events {selectedDate && `- ${months[currentMonth]} ${selectedDate}`}
        </h3>
        <div className="space-y-3">
          {events
            .filter((e) => !selectedDate || e.date === selectedDate)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-3 glass-card hover:scale-105 transition-transform duration-200"
              >
                <div className={`w-2 h-12 rounded-full ${getEventTypeColor(event.type)}`} />
                <div className="flex-1">
                  <p className="font-medium text-glass-foreground">{event.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {months[currentMonth]} {event.date} • {event.time}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground capitalize glass-card px-2 py-1">
                  {event.type}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}