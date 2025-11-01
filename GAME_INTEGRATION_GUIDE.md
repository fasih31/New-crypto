
# 🎮 NexaVault Game Integration Guide

## Overview

This guide explains how to add new games to the NexaVault gaming platform, configure rewards, and integrate blockchain functionality.

---

## 🚀 Quick Start: Adding a New Game

### Step 1: Update the Gaming Data

Edit `src/pages/Gaming.tsx` and add your game to the `gamingData` array:

```typescript
{
  id: 5, // Increment from last game
  title: "Your Game Title",
  genre: "Action/RPG/Strategy/etc",
  players: "Coming Soon", // or "1.5K" for active games
  rewards: "400 NEXA/day", // Daily reward amount
  image: "🎯", // Emoji or path to image
  status: "Coming Soon" // or "Live"
}
```

### Step 2: Create Game Component (Optional)

For interactive games, create a new component in `src/components/games/`:

```typescript
// src/components/games/YourGame.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useWallet } from "@/hooks/use-wallet";

const YourGame = () => {
  const { address, isConnected } = useWallet();
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => {
    if (!isConnected) {
      alert('Please connect your wallet to play!');
      return;
    }
    setGameActive(true);
    // Your game logic here
  };

  const endGame = async () => {
    setGameActive(false);
    // Award rewards based on score
    await awardRewards(score);
  };

  const awardRewards = async (finalScore: number) => {
    // Calculate rewards based on score
    const rewards = calculateRewards(finalScore);
    
    // TODO: Call smart contract to mint/transfer NEXA tokens
    console.log(`Awarding ${rewards} NEXA to ${address}`);
  };

  return (
    <div className="game-container">
      <h2>Your Game Title</h2>
      {!gameActive ? (
        <Button onClick={startGame}>Start Game</Button>
      ) : (
        <div>
          {/* Your game UI here */}
          <p>Score: {score}</p>
          <Button onClick={endGame}>End Game</Button>
        </div>
      )}
    </div>
  );
};

export default YourGame;
```

### Step 3: Link Game to Platform

Update `src/pages/Gaming.tsx` to link to your game:

```typescript
<Button 
  variant={game.status === "Live" ? "gaming" : "secondary"} 
  className="w-full mt-4"
  disabled={game.status !== "Live"}
  onClick={() => {
    if (game.id === 5) {
      // Navigate to your game or open modal
      navigate('/game/your-game');
    }
  }}
>
  {game.status === "Live" ? "Play Now" : "Coming Soon"}
</Button>
```

---

## 🎯 Game Types You Can Add

### 1. **Simple Click Games**
- Clicker games (Cookie Clicker style)
- Reaction time challenges
- Memory games

### 2. **Strategy Games**
- Card games (Poker, Blackjack)
- Board games (Chess, Checkers)
- Tower defense

### 3. **Skill-Based Games**
- Puzzle games
- Platformers
- Racing games

### 4. **P2E (Play-to-Earn) Integration**
- Match score to rewards
- Daily challenges
- Competitive leaderboards

---

## 💰 Reward System Integration

### Basic Reward Structure

```typescript
// src/utils/gameRewards.ts
export const calculateGameRewards = (
  gameType: string,
  score: number,
  timePlayed: number
) => {
  const baseReward = 10; // NEXA tokens
  
  switch(gameType) {
    case 'skill':
      return (score / 100) * baseReward;
    case 'time':
      return (timePlayed / 3600) * baseReward; // per hour
    case 'achievement':
      return score >= 1000 ? baseReward * 5 : baseReward;
    default:
      return baseReward;
  }
};
```

### Smart Contract Integration (Future)

```typescript
// When you deploy a reward contract
import { ethers } from 'ethers';

const awardGameRewards = async (
  playerAddress: string,
  amount: number
) => {
  const contract = new ethers.Contract(
    REWARD_CONTRACT_ADDRESS,
    REWARD_ABI,
    signer
  );
  
  const tx = await contract.awardRewards(
    playerAddress,
    ethers.utils.parseEther(amount.toString())
  );
  
  await tx.wait();
  return tx.hash;
};
```

---

## 🎨 Game UI Best Practices

### Use NexaVault Design System

```typescript
// Colors
className="gradient-gaming" // Purple gradient
className="text-gaming"     // Gaming purple color
className="glow-gaming"     // Purple glow effect

// Buttons
<Button variant="gaming">Play Now</Button>

// Cards
<Card className="glass-effect border-gaming/30">
  {/* Game content */}
</Card>
```

### Responsive Design

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Game grid that works on all devices */}
</div>
```

---

## 🔐 Security Considerations

### 1. **Validate All Game Inputs**
```typescript
const validateScore = (score: number): boolean => {
  return score >= 0 && score <= MAX_SCORE;
};
```

### 2. **Prevent Cheating**
- Use server-side validation (when backend is added)
- Rate limit game plays
- Track suspicious patterns

### 3. **Wallet Connection Required**
```typescript
if (!isConnected) {
  return <WalletConnectPrompt />;
}
```

---

## 📊 Leaderboard Integration

```typescript
// src/components/GameLeaderboard.tsx
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  address: string;
  score: number;
  rewards: number;
}

const GameLeaderboard = ({ gameId }: { gameId: number }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  // TODO: Fetch from backend/blockchain
  useEffect(() => {
    // Load leaderboard data
  }, [gameId]);

  return (
    <div className="leaderboard">
      <h3>Top Players</h3>
      {entries.map((entry, i) => (
        <div key={i}>
          <span>#{i + 1}</span>
          <span>{entry.address.slice(0, 6)}...</span>
          <span>{entry.score} pts</span>
          <span>{entry.rewards} NEXA</span>
        </div>
      ))}
    </div>
  );
};
```

---

## 🎮 Example: Complete Simple Game

Here's a complete example of a simple number guessing game:

```typescript
// src/pages/games/NumberGuesser.tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useWallet } from "@/hooks/use-wallet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NumberGuesser = () => {
  const { isConnected } = useWallet();
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('Guess a number between 1-100');
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    setAttempts(prev => prev + 1);

    if (numGuess === targetNumber) {
      const reward = Math.max(10 - attempts, 1);
      setMessage(`🎉 You won! Earned ${reward} NEXA!`);
      setGameWon(true);
    } else if (numGuess < targetNumber) {
      setMessage('📈 Higher!');
    } else {
      setMessage('📉 Lower!');
    }
    setGuess('');
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <Card className="max-w-md mx-auto p-8 glass-effect">
          <h1 className="text-3xl font-bold mb-4 text-gaming">
            Number Guesser
          </h1>
          <p className="mb-4">{message}</p>
          <p className="text-sm text-muted-foreground mb-4">
            Attempts: {attempts}
          </p>
          
          {!gameWon && isConnected && (
            <div className="space-y-4">
              <Input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
                onKeyPress={(e) => e.key === 'Enter' && handleGuess()}
              />
              <Button 
                variant="gaming" 
                className="w-full"
                onClick={handleGuess}
              >
                Guess
              </Button>
            </div>
          )}
          
          {!isConnected && (
            <p className="text-center text-muted-foreground">
              Connect your wallet to play!
            </p>
          )}
          
          {gameWon && (
            <Button 
              variant="gaming" 
              className="w-full"
              onClick={() => window.location.reload()}
            >
              Play Again
            </Button>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default NumberGuesser;
```

Then add route in `src/App.tsx`:
```typescript
<Route path="/game/number-guesser" element={<NumberGuesser />} />
```

---

## 📝 Checklist for Adding New Game

- [ ] Add game data to `gamingData` array
- [ ] Create game component (if interactive)
- [ ] Add game route (if standalone page)
- [ ] Implement reward calculation
- [ ] Test wallet connection requirement
- [ ] Add responsive design
- [ ] Create leaderboard (optional)
- [ ] Add game instructions
- [ ] Test on mobile devices
- [ ] Implement anti-cheat measures

---

## 🚀 Next Steps

1. **Deploy Smart Contract**: Create a reward distribution contract
2. **Backend API**: Add server for score validation
3. **Database**: Store leaderboards and player stats
4. **NFT Rewards**: Give NFT badges for achievements
5. **Tournament System**: Add competitive events

---

## 💡 Need Help?

- Check existing games in `src/pages/Gaming.tsx`
- Review the design system in `src/index.css`
- Study the wallet hooks in `src/hooks/use-wallet.ts`

Happy Gaming! 🎮
