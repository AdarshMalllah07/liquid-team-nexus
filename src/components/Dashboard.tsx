import { Activity, Users, Target, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { label: "Active Tasks", value: "24", icon: Activity, trend: "+12%" },
  { label: "Team Members", value: "8", icon: Users, trend: "+2" },
  { label: "Goals Met", value: "92%", icon: Target, trend: "+5%" },
  { label: "Productivity", value: "87%", icon: TrendingUp, trend: "+8%" },
];

const chartData = [
  { name: "Mon", tasks: 12, completed: 10 },
  { name: "Tue", tasks: 15, completed: 14 },
  { name: "Wed", tasks: 18, completed: 15 },
  { name: "Thu", tasks: 20, completed: 18 },
  { name: "Fri", tasks: 16, completed: 16 },
];

const lineData = [
  { name: "Week 1", productivity: 65 },
  { name: "Week 2", productivity: 72 },
  { name: "Week 3", productivity: 78 },
  { name: "Week 4", productivity: 87 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel p-6">
        <h2 className="text-2xl font-bold text-glass-foreground mb-6">Welcome back, Team!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="flex items-start justify-between mb-2">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-accent">{stat.trend}</span>
              </div>
              <p className="text-2xl font-bold text-glass-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-glass-foreground mb-4">Weekly Tasks</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--glass-background))",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(var(--glass-border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="tasks" fill="hsl(var(--primary) / 0.5)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-glass-foreground mb-4">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--glass-background))",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(var(--glass-border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="productivity"
                stroke="hsl(var(--accent))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-glass-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { user: "Alice", action: "completed", item: "UI Design Review", time: "2 min ago" },
            { user: "Bob", action: "created", item: "Backend API Task", time: "15 min ago" },
            { user: "Charlie", action: "commented on", item: "Sprint Planning", time: "1 hour ago" },
            { user: "Diana", action: "updated", item: "Project Roadmap", time: "2 hours ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-glass-hover transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                {activity.user[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm text-glass-foreground">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                  <span className="text-primary">{activity.item}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}