import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const Error = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <AlertTriangle className="w-24 h-24 text-destructive mx-auto mb-6 animate-pulse" />
            <h1 className="text-5xl font-orbitron font-bold text-gradient-primary mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-muted-foreground">
              We encountered an issue processing your request.
            </p>
          </div>

          <div className="card-glow p-8 mb-8">
            <h2 className="text-2xl font-orbitron font-bold text-foreground mb-4">
              Possible Issues
            </h2>
            <div className="text-left space-y-3 text-muted-foreground">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <p>MetaMask wallet not connected or transaction rejected</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                <p>Insufficient USDT balance on Polygon network</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <p>Network connectivity issues</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue rounded-full mt-2 flex-shrink-0" />
                <p>Server temporarily unavailable</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Don't worry! Your funds are safe. No transaction was completed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleRetry}
                className="btn-neon-primary flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <Link
                to="/shop"
                className="btn-neon-secondary flex items-center justify-center space-x-2"
              >
                <span>Back to Shop</span>
              </Link>
              
              <Link
                to="/"
                className="btn-neon-accent flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Home</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border">
            <h3 className="font-orbitron font-bold text-lg mb-2 text-primary">
              Need Help?
            </h3>
            <p className="text-sm text-muted-foreground">
              Make sure MetaMask is installed, connected to Polygon network, 
              and has sufficient USDT for the transaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;