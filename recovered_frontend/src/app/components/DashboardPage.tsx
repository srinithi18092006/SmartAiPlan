import { useState } from "react";
import { useNavigate } from "react-router";
import { Logo } from "./Logo";
import {
  LayoutDashboard,
  PlusCircle,
  Save,
  Sparkles,
  User,
  LogOut,
  Home,
  Layers,
  Ruler,
  DoorOpen,
  Droplets,
  Car,
  Trees,
  ChevronRight,
} from "lucide-react";

export function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "create", label: "Create Plan", icon: PlusCircle },
    { id: "saved", label: "Saved Designs", icon: Save },
    { id: "suggestions", label: "AI Suggestions", icon: Sparkles },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white p-6 flex flex-col">
        <div className="mb-8">
          <Logo />
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-gold text-gold-foreground"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground">
            Let's create your next architectural masterpiece
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Plans", value: "12", icon: Layers, color: "accent" },
            { label: "In Progress", value: "3", icon: PlusCircle, color: "gold" },
            { label: "Completed", value: "9", icon: Save, color: "accent" },
            { label: "AI Suggestions", value: "24", icon: Sparkles, color: "gold" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    stat.color === "gold" ? "bg-gold/10" : "bg-accent/10"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === "gold" ? "text-gold" : "text-accent"
                    }`}
                  />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Generate New Plan Card */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-sm text-gold">AI-Powered Generation</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">Generate New Plan</h2>
              <p className="text-white/80">
                Create your perfect architectural design in seconds
              </p>
            </div>
            <button className="px-8 py-4 rounded-xl bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg transition-all flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Start Now
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm mb-8">
          <h3 className="text-xl font-bold text-foreground mb-6">
            Project Requirements
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Land Dimensions */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Ruler className="w-5 h-5 text-accent" />
                Land Dimensions
              </h4>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Length (feet)
                </label>
                <input
                  type="number"
                  placeholder="60"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Breadth (feet)
                </label>
                <input
                  type="number"
                  placeholder="40"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Total Area (sq ft)
                </label>
                <input
                  type="number"
                  placeholder="2400"
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all bg-muted/30"
                  disabled
                />
              </div>
            </div>

            {/* Building Details */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Layers className="w-5 h-5 text-gold" />
                Building Details
              </h4>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Number of Floors
                </label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all">
                  <option>1 Floor</option>
                  <option>2 Floors</option>
                  <option>3 Floors</option>
                  <option>4+ Floors</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Bedrooms per Floor
                </label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all">
                  <option>2 Bedrooms</option>
                  <option>3 Bedrooms</option>
                  <option>4 Bedrooms</option>
                  <option>5+ Bedrooms</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2">
                  Bathrooms
                </label>
                <select className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all">
                  <option>1 Bathroom</option>
                  <option>2 Bathrooms</option>
                  <option>3 Bathrooms</option>
                  <option>4+ Bathrooms</option>
                </select>
              </div>
            </div>

            {/* Additional Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <Home className="w-5 h-5 text-accent" />
                Additional Features
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Parking Space", icon: Car },
                  { label: "Garden / Open Space", icon: Trees },
                  { label: "Water Facilities", icon: Droplets },
                  { label: "Balcony", icon: DoorOpen },
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <label
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 border-border hover:border-accent cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 rounded border-2 border-border text-accent focus:ring-2 focus:ring-accent/20"
                      />
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {feature.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button className="px-8 py-4 rounded-xl bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Generate AI Plan
            </button>
            <button className="px-8 py-4 rounded-xl border-2 border-border text-foreground hover:bg-muted transition-all">
              Save as Draft
            </button>
          </div>
        </div>

        {/* Recent Plans */}
        <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Recent Plans</h3>
            <button className="text-accent hover:text-accent/80 font-medium flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Modern Villa",
                date: "March 15, 2026",
                floors: "2 Floors",
                area: "3500 sq ft",
              },
              {
                name: "Urban Apartment",
                date: "March 10, 2026",
                floors: "1 Floor",
                area: "1800 sq ft",
              },
              {
                name: "Family House",
                date: "March 5, 2026",
                floors: "3 Floors",
                area: "4200 sq ft",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className="group rounded-2xl border-2 border-border hover:border-gold overflow-hidden cursor-pointer transition-all"
              >
                <div className="h-48 bg-gradient-to-br from-accent/10 to-gold/10 flex items-center justify-center">
                  <Home className="w-16 h-16 text-muted-foreground group-hover:text-gold transition-colors" />
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    {plan.name}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">{plan.date}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {plan.floors}
                    </span>
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      {plan.area}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
