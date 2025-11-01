
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, TrendingUp, Image, Rocket, Vote, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const features = [
  {
    icon: Gamepad2,
    title: "Play-to-Earn Gaming",
    description: "Immerse yourself in blockchain gaming with real rewards. Compete, collect, and earn while having fun.",
    gradient: "gradient-gaming",
    glow: "glow-gaming",
    link: "/gaming",
    stats: "10+ Games"
  },
  {
    icon: TrendingUp,
    title: "DeFi Exchange",
    description: "Trade, stake, and provide liquidity with industry-leading yields. Your gateway to decentralized finance.",
    gradient: "gradient-defi",
    glow: "glow-defi",
    link: "/defi",
    stats: "150% APY"
  },
  {
    icon: Image,
    title: "NFT Marketplace",
    description: "Discover, create, and trade unique digital assets. Join the revolution of digital ownership.",
    gradient: "gradient-nft",
    glow: "glow-nft",
    link: "/nft-marketplace",
    stats: "50K+ NFTs"
  },
  {
    icon: Rocket,
    title: "Token Launchpad",
    description: "Launch your project or invest early in groundbreaking Web3 ventures with our secure IDO platform.",
    gradient: "gradient-primary",
    glow: "glow-primary",
    link: "/launchpad",
    stats: "20+ Projects"
  },
  {
    icon: Vote,
    title: "DAO Governance",
    description: "Shape the platform's future through democratic voting. Your voice matters in our community.",
    gradient: "gradient-governance",
    glow: "glow-primary",
    link: "/governance",
    stats: "100K+ Votes"
  },
  {
    icon: Lock,
    title: "Multi-Sig Security",
    description: "Enterprise-grade security with multi-signature wallets, advanced encryption, and regular audits.",
    gradient: "gradient-accent",
    glow: "glow-primary",
    link: "/",
    stats: "Bank-Grade"
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4 animate-slide-in">
          <h2 className="text-5xl md:text-6xl font-black">
            <span className="bg-gradient-to-r from-primary via-accent to-defi bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the complete Web3 experience, all in one platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group glass-effect border-border/50 hover:border-primary/50 overflow-hidden relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardHeader className="relative">
                  <div className={`w-16 h-16 rounded-2xl ${feature.gradient} flex items-center justify-center mb-4 ${feature.glow} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mt-2">
                    {feature.stats}
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  
                  <Link to={feature.link}>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-all"
                    >
                      Explore Now →
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
