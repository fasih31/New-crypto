
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
  Zap,
  TrendingUp,
  Award,
  Target
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const gamingData = [
  {
    id: 1,
    title: "CyberRealm Chronicles",
    genre: "RPG",
    players: "1.2K",
    baseReward: 250,
    bonusMultiplier: 1.5,
    image: "🏰",
    status: "Live",
    difficulty: "Medium",
    avgPlayTime: "45 min"
  },
  {
    id: 2,
    title: "Quantum Racers",
    genre: "Racing",
    players: "856",
    baseReward: 180,
    bonusMultiplier: 2.0,
    image: "🏎️",
    status: "Live",
    difficulty: "Easy",
    avgPlayTime: "15 min"
  },
  {
    id: 3,
    title: "DeFi Defenders",
    genre: "Strategy",
    players: "2.1K",
    baseReward: 320,
    bonusMultiplier: 1.8,
    image: "🛡️",
    status: "Live",
    difficulty: "Hard",
    avgPlayTime: "60 min"
  },
  {
    id: 4,
    title: "MetaVerse Miners",
    genre: "Simulation",
    players: "Coming Soon",
    baseReward: 200,
    bonusMultiplier: 1.5,
    image: "⛏️",
    status: "Coming Soon",
    difficulty: "Easy",
    avgPlayTime: "30 min"
  }
];

const Gaming = () => {
  const { toast } = useToast();
  const [playerStats, setPlayerStats] = useState({
    gamesPlayed: 0,
    totalEarned: 0,
    winStreak: 0
  });

  const handlePlayGame = (game: typeof gamingData[0]) => {
    // Simulate game session
    const performanceScore = Math.random() * 100; // 0-100 score
    const timeBonus = Math.random() > 0.5 ? 1.2 : 1.0;
    const streakBonus = 1 + (playerStats.winStreak * 0.1);
    
    const earnedAmount = Math.floor(
      game.baseReward * 
      (performanceScore / 100) * 
      game.bonusMultiplier * 
      timeBonus * 
      streakBonus
    );

    const isWin = performanceScore > 50;
    
    setPlayerStats(prev => ({
      gamesPlayed: prev.gamesPlayed + 1,
      totalEarned: prev.totalEarned + earnedAmount,
      winStreak: isWin ? prev.winStreak + 1 : 0
    }));

    toast({
      title: isWin ? "🎉 Victory!" : "💪 Good Try!",
      description: (
        <div className="space-y-2 mt-2">
          <p className="font-semibold text-gaming">+{earnedAmount} CVERSE earned!</p>
          <div className="text-xs space-y-1">
            <p>⭐ Performance: {performanceScore.toFixed(1)}%</p>
            <p>⚡ Bonuses Applied: {(game.bonusMultiplier * timeBonus * streakBonus).toFixed(2)}x</p>
            {isWin && <p>🔥 Win Streak: {playerStats.winStreak + 1}</p>}
          </div>
        </div>
      ),
    });
  };

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
                  Play & Earn Hub
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every game session rewards you with CVERSE tokens. Higher performance = bigger rewards!
              </p>

              {/* Player Stats Dashboard */}
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                <div className="p-4 rounded-xl glass-effect border border-gaming/30">
                  <div className="text-2xl font-bold text-gaming">{playerStats.gamesPlayed}</div>
                  <div className="text-xs text-muted-foreground mt-1">Games Played</div>
                </div>
                <div className="p-4 rounded-xl glass-effect border border-primary/30">
                  <div className="text-2xl font-bold text-primary">{playerStats.totalEarned}</div>
                  <div className="text-xs text-muted-foreground mt-1">CVERSE Earned</div>
                </div>
                <div className="p-4 rounded-xl glass-effect border border-accent/30">
                  <div className="text-2xl font-bold text-accent">{playerStats.winStreak}</div>
                  <div className="text-xs text-muted-foreground mt-1">Win Streak</div>
                </div>
              </div>

              {/* Global Gaming Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                {[
                  { label: "Active Players", value: "250K+" },
                  { label: "Rewards Paid", value: "$50M" },
                  { label: "Games Live", value: "4" },
                  { label: "Avg. Daily Earnings", value: "450 CVERSE" }
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

        {/* How Earning Works */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">💰 How You Earn CVERSE Tokens</h2>
            <div className="space-y-6">
              <Card className="glass-effect border-primary/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-6 h-6 text-primary" />
                    1. Play Games & Complete Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Each game has a <strong>base reward</strong> (180-320 CVERSE). Your actual earnings depend on:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
                    <li><strong>Performance Score</strong>: 0-100% based on how well you play</li>
                    <li><strong>Game Multiplier</strong>: Each game has different bonus rates (1.5x - 2.0x)</li>
                    <li><strong>Time Bonus</strong>: Complete objectives faster for +20% bonus</li>
                    <li><strong>Win Streak</strong>: Each consecutive win adds +10% to earnings</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-effect border-gaming/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-gaming" />
                    2. Level Up for Multipliers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    As you play more, your account levels up:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
                    <li><strong>Level 1-10</strong>: Standard earnings (1.0x)</li>
                    <li><strong>Level 11-25</strong>: +25% earnings boost (1.25x)</li>
                    <li><strong>Level 26-50</strong>: +50% earnings boost (1.5x)</li>
                    <li><strong>Level 51+</strong>: +100% earnings boost (2.0x)</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="glass-effect border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-accent" />
                    3. Tournament & Special Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Participate in weekly tournaments and events for massive rewards:
                  </p>
                  <ul className="list-disc list-inside mt-3 space-y-2 text-sm">
                    <li><strong>Weekly Tournaments</strong>: Top 100 players share 50,000 CVERSE</li>
                    <li><strong>Daily Challenges</strong>: Complete 5 games daily for 500 CVERSE bonus</li>
                    <li><strong>Seasonal Events</strong>: Special limited-time modes with 5x rewards</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Games */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">🎮 Available Games</h2>
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
                        <span>Base Reward:</span>
                        <span className="text-gaming font-bold">{game.baseReward} CVERSE</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Multiplier:</span>
                        <span className="text-accent font-bold">{game.bonusMultiplier}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difficulty:</span>
                        <span className="text-primary">{game.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Time:</span>
                        <span className="text-muted-foreground">{game.avgPlayTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Players:</span>
                        <span className="text-gaming">{game.players}</span>
                      </div>
                      <div className="p-2 mt-2 rounded bg-primary/10 text-center">
                        <p className="text-xs text-muted-foreground">Potential Earnings</p>
                        <p className="text-lg font-bold text-primary">
                          {game.baseReward} - {Math.floor(game.baseReward * game.bonusMultiplier * 2)} CVERSE
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={game.status === "Live" ? "gaming" : "secondary"} 
                      className="w-full mt-4"
                      disabled={game.status !== "Live"}
                      onClick={() => game.status === "Live" && handlePlayGame(game)}
                    >
                      {game.status === "Live" ? "Play Now & Earn" : "Coming Soon"}
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
            <h2 className="text-3xl font-bold text-center mb-12">🌟 Why CryptoVerse Gaming?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Instant Payouts</h3>
                <p className="text-muted-foreground">
                  Earnings credited immediately after each game. Withdraw to your wallet anytime!
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Provably Fair</h3>
                <p className="text-muted-foreground">
                  All game outcomes verified on-chain. No manipulation, fully transparent rewards.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 gradient-gaming rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
                <p className="text-muted-foreground">
                  Play on web, mobile, or desktop. Your progress and earnings sync everywhere.
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
