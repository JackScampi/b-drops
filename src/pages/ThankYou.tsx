import { CheckCircle, ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const ThankYou = () => {
  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-secondary mx-auto mb-6 animate-bounce" />
            <h1 className="text-5xl font-orbitron font-bold text-gradient-primary mb-4">
              Purchase Complete!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your BEMPOLO drop is on its way to your inbox!
            </p>
          </div>

          <div className="card-glow p-8 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Mail className="w-6 h-6 text-accent" />
              <h2 className="text-2xl font-orbitron font-bold text-foreground">
                Check Your Email
              </h2>
            </div>
            <p className="text-muted-foreground">
              We've sent your download link to the email address you provided. 
              If you don't see it in your inbox, check your spam folder.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Want to collect more legendary Bempolo drops?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="btn-neon-secondary flex items-center justify-center space-x-2"
              >
                <span>Browse More Drops</span>
              </Link>
              
              <Link
                to="/"
                className="btn-neon-accent flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>

          <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border">
            <h3 className="font-orbitron font-bold text-lg mb-2 text-primary">
              About Your Purchase
            </h3>
            <p className="text-sm text-muted-foreground">
              Your digital drop is a unique file-based creation by Andrea Bempensante. 
              No NFTs were minted - this is pure digital art for your collection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;