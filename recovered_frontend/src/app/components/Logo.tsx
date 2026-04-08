import { Zap } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className="absolute inset-0 bg-gold/20 blur-lg rounded-full"></div>
        <div className="relative bg-gradient-to-br from-gold to-accent p-2 rounded-xl shadow-lg">
          <Zap className="w-6 h-6 text-primary" fill="currentColor" />
        </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-primary tracking-tight leading-none">Smart AI Plan</h1>
        <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Intelligent Architecture</p>
      </div>
    </div>
  );
}
