
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-[15%] right-[20%] w-[400px] h-[400px] bg-defi/12 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[50%] left-[50%] w-[350px] h-[350px] bg-gaming/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-6xl mx-auto text-center space-y-10 animate-slide-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-effect border border-primary/40 mb-6 hover:border-primary/60 transition-all">
            <Zap className="w-4 h-4 text-primary animate-glow" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Trusted by 500K+ Users Worldwide
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[1.1] tracking-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-defi bg-clip-text text-transparent animate-glow">
              NexaVault
            </span>
            <br />
            <span className="text-foreground">Decentralized Future</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
            Experience seamless blockchain innovation with our all-in-one platform. 
            Trade, earn, play, and govern - all secured by cutting-edge technology.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 py-8">
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl glass-effect hover:border-primary/50 transition-all">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Military-Grade Security</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl glass-effect hover:border-defi/50 transition-all">
              <TrendingUp className="w-5 h-5 text-defi" />
              <span className="text-sm font-semibold">Premium Yields</span>
            </div>
            <div className="flex items-center gap-2.5 px-5 py-3 rounded-xl glass-effect hover:border-gaming/50 transition-all">
              <Lock className="w-5 h-5 text-gaming" />
              <span className="text-sm font-semibold">Non-Custodial</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <Link to="/defi" className="w-full sm:w-auto">
              <Button variant="hero" size="xl" className="group w-full sm:w-auto">
                Start Trading
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/gaming" className="w-full sm:w-auto">
              <Button variant="gaming" size="xl" className="group w-full sm:w-auto">
                Play & Earn
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-16 max-w-5xl mx-auto">
            {[
              { label: "Total Value Locked", value: "$3.2B+" },
              { label: "Active Traders", value: "500K+" },
              { label: "Daily Transactions", value: "2M+" },
              { label: "Maximum APY", value: "180%" }
            ].map((stat, i) => (
              <div key={i} className="p-6 sm:p-8 rounded-2xl glass-effect border border-border/50 hover:border-primary/40 transition-all group">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-3 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
