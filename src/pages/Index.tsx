import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Download, Twitter, Send } from "lucide-react";
import Navigation from "@/components/Navigation";
import bempoloCyber from "@/assets/bempolo-cyber.jpg";
import bempoloWizard from "@/assets/bempolo-wizard.jpg";
const Index = () => {
  return <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-orbitron font-black text-gradient-primary mb-6 animate-float">
                BEMPOLO
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-gradient-secondary mb-4">
                The Meme Coin That Sends Files
              </p>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Buy exclusive digital drops using USDT. Powered by BEMP.
              </p>
            </div>

            <div className="mb-12">
              <img src={bempoloCyber} alt="Bempolo Cyber Gnome" className="w-64 h-64 mx-auto rounded-full border-4 border-primary glow-primary" />
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/shop" className="btn-neon-primary text-lg px-8 py-4 flex items-center justify-center">
                <span>Explore Drops</span>
              </Link>
              
              <button className="btn-neon-secondary text-lg px-8 py-4 flex items-center justify-center">
                <span>Connect MetaMask</span>
              </button>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-secondary/30 rounded-full animate-bounce" />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-accent/30 rounded-full animate-ping" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/5">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-orbitron font-bold text-center text-gradient-primary mb-16">
              Why Choose BEMPOLO?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-glow text-center group">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-3">
                  Secure Payments
                </h3>
                <p className="text-muted-foreground">
                  All transactions secured by Polygon blockchain with MetaMask integration.
                </p>
              </div>

              <div className="card-glow text-center group">
                <Download className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-3">
                  Instant Delivery
                </h3>
                <p className="text-muted-foreground">
                  Get your digital drops immediately via email after payment confirmation.
                </p>
              </div>

              <div className="card-glow text-center group">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-3">
                  Meme Power
                </h3>
                <p className="text-muted-foreground">Collect unique Bempolo creations from the legendary gnome himself.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Bempolo Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-orbitron font-bold text-gradient-secondary mb-8">
              Meet Bempolo
            </h2>
            
            <div className="mb-8">
              <img src={bempoloWizard} alt="Bempolo Wizard" className="w-48 h-48 mx-auto rounded-full border-4 border-secondary glow-secondary mb-8" />
            </div>

            <div className="card-glow p-8 mb-8">
              <p className="text-xl text-muted-foreground leading-relaxed mb-4">
                Once upon a time in the gardens of the blockchain,
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                there lived the smallest token with the biggest dreams.
              </p>
            </div>

            <Link to="/shop" className="btn-neon-accent text-lg px-8 py-4 inline-flex items-center justify-center">
              <span>Start Collecting</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/10 border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-primary" />
                <span className="text-2xl font-orbitron font-bold text-gradient-primary">
                  BEMPOLO
                </span>
              </div>

              <div className="flex items-center space-x-6">
                <a href="https://polygonscan.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" />
                  </svg>
                </a>
                
                
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors duration-300">
                  <Twitter className="w-6 h-6" />
                </a>
                
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue transition-colors duration-300">
                  <Send className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div className="mt-8 text-center text-muted-foreground">
              <p>© 2025 BEMPOLO. Powered by memes, secured by blockchain.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;