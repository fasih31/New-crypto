import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Play, 
  Trophy, 
  Coins, 
  Users, 
  Star,
  Gamepad2,
  Sword,
  Shield,
  Zap
} from "lucide-react";

const gamingData = [
  {
    id: 1,
    title: "CyberRealm Chronicles",
    genre: "RPG",
    players: "1.2K",
    rewards: "250 NEXA/day",
    image: "🏰",
    status: "Live"
  },
  {
    id: 2,
    title: "Quantum Racers",
    genre: "Racing",
    players: "856",
    rewards: "180 NEXA/day",
    image: "🏎️",
    status: "Live"
  },
  {
    id: 3,
    title: "DeFi Defenders",
    genre: "Strategy",
    players: "2.1K",
    rewards: "320 NEXA/day",
    image: "🛡️",
    status: "Live"
  },
  {
    id: 4,
    title: "MetaVerse Miners",
    genre: "Simulation",
    players: "Coming Soon",
    rewards: "TBA",
    image: "⛏️",
    status: "Coming Soon"
  }
];

const Gaming = () => {
  return (
    <div className="min-h-screen relative z-10">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4 animated-bg">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-12 text-center space-y-4">
              <h1 className="text-5xl md:text-6xl font-black">
                <span className="bg-gradient-to-r from-gaming via-gaming-glow to-primary bg-clip-text text-transparent animate-glow">
                  Gaming Hub
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Play-to-earn games with real rewards. Compete globally and earn while you play
              </p>

              {/* Gaming Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                {[
                  { label: "Active Players", value: "250K+" },
                  { label: "Total Rewards", value: "$50M" },
                  { label: "Games Live", value: "15" },
                  { label: "Tournaments", value: "Daily" }
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl glass-effect border border-gaming/30 hover:border-gaming/60 transition-all">
                    <div className="text-2xl font-bold text-gaming">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gamingData.map((game) => (
                <Card key={game.id} className="gradient-card border-border/50 hover:shadow-gaming transition-smooth">
                  <CardHeader>
                    <div className="text-4xl mb-2">{game.image}</div>
                    <CardTitle className="text-lg">{game.title}</CardTitle>
                    <CardDescription>{game.genre}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Players:</span>
                        <span className="text-gaming">{game.players}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rewards:</span>
                        <span className="text-accent">{game.rewards}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className={game.status === "Live" ? "text-accent" : "text-muted-foreground"}>
                          {game.status}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant={game.status === "Live" ? "gaming" : "secondary"} 
                      className="w-full mt-4"
                      disabled={game.status !== "Live"}
                    >
                      {game.status === "Live" ? "Play Now" : "Coming Soon"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Gaming Features */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Gaming Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Play-to-Earn</h3>
                <p className="text-muted-foreground">
                  Earn real cryptocurrency rewards while playing your favorite games
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">True Ownership</h3>
                <p className="text-muted-foreground">
                  Own your in-game assets as NFTs that you can trade or use across games
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cross-Game Items</h3>
                <p className="text-muted-foreground">
                  Use your assets across multiple games in our ecosystem
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gaming;