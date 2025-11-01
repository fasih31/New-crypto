
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, TrendingUp, Image, Rocket, Vote, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const features = [
  {
    icon: Gamepad2,
    title: "GameFi Universe",
    description: "Dive into immersive blockchain games where skill meets rewards. Compete globally and monetize your gameplay.",
    gradient: "gradient-gaming",
    glow: "glow-gaming",
    link: "/gaming",
    stats: "15+ Games"
  },
  {
    icon: TrendingUp,
    title: "DeFi Trading Hub",
    description: "Access premium liquidity pools and staking options. Maximize returns with our intelligent yield optimization.",
    gradient: "gradient-defi",
    glow: "glow-defi",
    link: "/defi",
    stats: "180% APY"
  },
  {
    icon: Image,
    title: "NFT Marketplace",
    description: "Mint, collect, and trade exclusive digital assets. Join a vibrant community of creators and collectors.",
    gradient: "gradient-nft",
    glow: "glow-nft",
    link: "/nft-marketplace",
    stats: "75K+ Assets"
  },
  {
    icon: Rocket,
    title: "Launch Platform",
    description: "Discover promising Web3 projects early. Participate in vetted token launches with exclusive access.",
    gradient: "gradient-primary",
    glow: "glow-primary",
    link: "/launchpad",
    stats: "30+ Launches"
  },
  {
    icon: Vote,
    title: "Community Governance",
    description: "Shape NexaVault's evolution through decentralized voting. Your stake determines your influence.",
    gradient: "gradient-governance",
    glow: "glow-primary",
    link: "/governance",
    stats: "250K+ Voters"
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Multi-layer protection with regular audits, insurance coverage, and emergency protocols.",
    gradient: "gradient-accent",
    glow: "glow-primary",
    link: "/",
    stats: "Audited"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 sm:py-28 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 sm:mb-20 space-y-5 animate-slide-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-defi bg-clip-text text-transparent">
              Complete Web3 Ecosystem
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Everything you need for decentralized finance, gaming, and digital ownership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group glass-effect border-border/60 hover:border-primary/50 overflow-hidden relative transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <CardHeader className="relative pb-4">
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl ${feature.gradient} flex items-center justify-center mb-5 ${feature.glow} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <div className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mt-3">
                    {feature.stats}
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-5 pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed font-medium">
                    {feature.description}
                  </CardDescription>
                  
                  <Link to={feature.link}>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all font-semibold"
                    >
                      Explore Feature →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
