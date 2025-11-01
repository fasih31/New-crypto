
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-defi/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gaming/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-slide-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-primary/30 mb-4">
            <Zap className="w-4 h-4 text-primary animate-glow" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Next-Generation Web3 Ecosystem
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-glow">
              Redefine
            </span>
            <br />
            <span className="text-foreground">Digital Finance</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of decentralized finance with cutting-edge gaming, 
            DeFi protocols, NFT marketplace, and governance—all in one revolutionary platform.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 py-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect">
              <Shield className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Bank-Grade Security</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect">
              <TrendingUp className="w-5 h-5 text-defi" />
              <span className="text-sm font-medium">High Yield DeFi</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass-effect">
              <Rocket className="w-5 h-5 text-gaming" />
              <span className="text-sm font-medium">Play-to-Earn Gaming</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/defi">
              <Button variant="hero" size="xl" className="group">
                Launch DeFi Hub
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/gaming">
              <Button variant="gaming" size="xl" className="group">
                Explore Gaming
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            {[
              { label: "Total Value Locked", value: "$2.5B+" },
              { label: "Active Users", value: "500K+" },
              { label: "Transactions", value: "10M+" },
              { label: "APY Up To", value: "150%" }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl glass-effect border border-border/50 hover:border-primary/50 transition-all">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
