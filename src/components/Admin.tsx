import { Users, DollarSign, TrendingUp, Activity, Download, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const pieData = [
  { name: "Development", value: 35, color: "hsl(199 89% 48%)" },
  { name: "Design", value: 25, color: "hsl(267 66% 60%)" },
  { name: "Marketing", value: 20, color: "hsl(147 50% 47%)" },
  { name: "Operations", value: 20, color: "hsl(39 90% 55%)" },
];

const areaData = [
  { month: "Jan", revenue: 45000, costs: 30000 },
  { month: "Feb", revenue: 52000, costs: 32000 },
  { month: "Mar", revenue: 48000, costs: 28000 },
  { month: "Apr", revenue: 61000, costs: 35000 },
  { month: "May", revenue: 55000, costs: 31000 },
  { month: "Jun", revenue: 67000, costs: 38000 },
];

const metrics = [
  { label: "Total Users", value: "2,543", icon: Users, change: "+12.5%", progress: 75 },
  { label: "Revenue", value: "$67,000", icon: DollarSign, change: "+22.3%", progress: 85 },
  { label: "Growth Rate", value: "18.2%", icon: TrendingUp, change: "+5.4%", progress: 68 },
  { label: "Server Uptime", value: "99.9%", icon: Activity, change: "+0.1%", progress: 99 },
];

export default function Admin() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-glass-foreground">Admin Dashboard</h2>
          <div className="flex items-center gap-2">
            <Button className="glass-button">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="glass-button">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div key={index} className="glass-card group hover:scale-105 transition-transform duration-300">
              <div className="flex items-start justify-between mb-3">
                <metric.icon className="h-5 w-5 text-primary" />
                <span className="text-xs text-accent font-semibold">{metric.change}</span>
              </div>
              <p className="text-2xl font-bold text-glass-foreground mb-1">{metric.value}</p>
              <p className="text-sm text-muted-foreground mb-3">{metric.label}</p>
              <Progress value={metric.progress} className="h-1.5" />
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Distribution */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-glass-foreground mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--glass-background))",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(var(--glass-border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-glass-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue vs Costs */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-glass-foreground mb-4">Revenue vs Costs</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={areaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--glass-border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--glass-background))",
                  backdropFilter: "blur(12px)",
                  border: "1px solid hsl(var(--glass-border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.3)"
              />
              <Area
                type="monotone"
                dataKey="costs"
                stackId="2"
                stroke="hsl(var(--accent))"
                fill="hsl(var(--accent) / 0.3)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold text-glass-foreground mb-4">Team Performance</h3>
        <div className="space-y-4">
          {[
            { name: "Alice Johnson", role: "Lead Developer", performance: 92, tasks: 45 },
            { name: "Bob Smith", role: "UI/UX Designer", performance: 88, tasks: 38 },
            { name: "Charlie Davis", role: "Project Manager", performance: 95, tasks: 52 },
            { name: "Diana Wilson", role: "QA Engineer", performance: 90, tasks: 41 },
          ].map((member, index) => (
            <div key={index} className="flex items-center gap-4 p-3 glass-card hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-white font-bold">
                {member.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="font-medium text-glass-foreground">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{member.performance}%</p>
                    <p className="text-xs text-muted-foreground">{member.tasks} tasks</p>
                  </div>
                </div>
                <Progress value={member.performance} className="h-1.5 mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-glass-foreground">Security Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Two-Factor Auth</p>
            <p className="text-lg font-semibold text-green-400">Enabled</p>
          </div>
          <div className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Last Backup</p>
            <p className="text-lg font-semibold text-glass-foreground">2 hours ago</p>
          </div>
          <div className="glass-card">
            <p className="text-sm text-muted-foreground mb-1">Active Sessions</p>
            <p className="text-lg font-semibold text-glass-foreground">3 devices</p>
          </div>
        </div>
      </div>
    </div>
  );
}