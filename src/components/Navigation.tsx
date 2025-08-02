import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Wallet, Menu, X, Zap } from "lucide-react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Navigation = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsWalletConnected(true);
        setWalletAddress(accounts[0]);
        setIsMobileMenuOpen(false);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      window.open("https://metamask.io/download/", "_blank");
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Zap className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
            <span className="text-2xl font-orbitron font-bold text-gradient-primary">
              BEMPOLO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors duration-300 font-rajdhani font-semibold"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-foreground hover:text-primary transition-colors duration-300 font-rajdhani font-semibold"
            >
              Shop
            </Link>
            
            {/* Wallet Button */}
            <button
              onClick={connectWallet}
              className={`btn-neon-primary flex items-center space-x-2 ${
                isWalletConnected ? "btn-neon-secondary" : ""
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>
                {isWalletConnected ? formatAddress(walletAddress) : "Connect MetaMask"}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-foreground hover:text-primary transition-colors duration-300 font-rajdhani font-semibold"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-foreground hover:text-primary transition-colors duration-300 font-rajdhani font-semibold"
            >
              Shop
            </Link>
            <button
              onClick={connectWallet}
              className={`btn-neon-primary w-full flex items-center justify-center space-x-2 ${
                isWalletConnected ? "btn-neon-secondary" : ""
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>
                {isWalletConnected ? formatAddress(walletAddress) : "Connect MetaMask"}
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;