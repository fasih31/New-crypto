
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet } from "@/hooks/use-wallet";
import WalletConnectModal from "./WalletConnectModal";
import logo from "@/assets/logo.png";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletMenuOpen, setIsWalletMenuOpen] = useState(false);
  const walletMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { address, isConnected, disconnectWallet, formatAddress, getCurrentNetwork } = useWallet();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
        setIsWalletMenuOpen(false);
      }
    };

    if (isWalletMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWalletMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto px-4 h-16 sm:h-18 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <img src={logo} alt="NexaVault Logo" className="w-8 h-8" />
          </div>
          <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            NexaVault
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            to="/gaming"
            className={`font-semibold transition-smooth ${
              location.pathname === "/gaming"
                ? "text-gaming"
                : "text-foreground hover:text-gaming"
            }`}
          >
            Gaming
          </Link>
          <Link
            to="/defi"
            className={`font-semibold transition-smooth ${
              location.pathname === "/defi"
                ? "text-defi"
                : "text-foreground hover:text-defi"
            }`}
          >
            DeFi
          </Link>
          <Link
            to="/nft-marketplace"
            className={`font-semibold transition-smooth ${
              location.pathname === "/nft-marketplace"
                ? "text-nft"
                : "text-foreground hover:text-nft"
            }`}
          >
            NFTs
          </Link>
          <Link
            to="/launchpad"
            className={`font-semibold transition-smooth ${
              location.pathname === "/launchpad"
                ? "text-primary"
                : "text-foreground hover:text-primary"
            }`}
          >
            Launchpad
          </Link>
          <Link
            to="/governance"
            className={`font-semibold transition-smooth ${
              location.pathname === "/governance"
                ? "text-accent"
                : "text-foreground hover:text-accent"
            }`}
          >
            Governance
          </Link>
        </nav>

        {/* Connect Wallet Button and Theme Toggle */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <ThemeToggle />
          {isConnected && address ? (
            <div className="relative hidden lg:block" ref={walletMenuRef}>
              <Button
                variant="wallet"
                size="lg"
                onClick={() => setIsWalletMenuOpen(!isWalletMenuOpen)}
                className="flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">{formatAddress(address)}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              {isWalletMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="p-4 border-b border-border bg-card/50">
                    <p className="text-xs text-muted-foreground font-medium">Network</p>
                    <p className="text-sm font-bold text-primary mt-1">{getCurrentNetwork()}</p>
                  </div>
                  <button
                    onClick={() => {
                      disconnectWallet()
                      setIsWalletMenuOpen(false)
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-semibold hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <WalletConnectModal>
              <Button variant="wallet" size="lg" className="hidden lg:flex">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
              </Button>
            </WalletConnectModal>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <nav className="container mx-auto px-4 py-6 space-y-4">
            <Link
              to="/gaming"
              className={`block font-semibold transition-smooth ${
                location.pathname === "/gaming"
                  ? "text-gaming"
                  : "text-foreground hover:text-gaming"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gaming
            </Link>
            <Link
              to="/defi"
              className={`block font-semibold transition-smooth ${
                location.pathname === "/defi"
                  ? "text-defi"
                  : "text-foreground hover:text-defi"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              DeFi
            </Link>
            <Link
              to="/nft-marketplace"
              className={`block font-semibold transition-smooth ${
                location.pathname === "/nft-marketplace"
                  ? "text-nft"
                  : "text-foreground hover:text-nft"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              NFTs
            </Link>
            <Link
              to="/launchpad"
              className={`block font-semibold transition-smooth ${
                location.pathname === "/launchpad"
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Launchpad
            </Link>
            <Link
              to="/governance"
              className={`block font-semibold transition-smooth ${
                location.pathname === "/governance"
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Governance
            </Link>
            {isConnected && address ? (
              <div className="space-y-3 mt-6 pt-6 border-t border-border">
                <div className="p-4 bg-card/50 rounded-xl border border-border">
                  <p className="text-xs text-muted-foreground font-medium">Connected Wallet</p>
                  <p className="text-sm font-bold mt-1">{formatAddress(address)}</p>
                  <p className="text-xs text-primary mt-2 font-medium">{getCurrentNetwork()}</p>
                </div>
                <Button
                  variant="outline"
                  className="w-full font-semibold"
                  onClick={() => {
                    disconnectWallet()
                    setIsMenuOpen(false)
                  }}
                >
                  Disconnect Wallet
                </Button>
              </div>
            ) : (
              <WalletConnectModal>
                <Button variant="wallet" size="lg" className="w-full mt-6 font-semibold">
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </Button>
              </WalletConnectModal>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
