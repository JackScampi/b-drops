import { useState } from "react";
import { ShoppingCart, Zap } from "lucide-react";
import PaymentModal from "@/components/PaymentModal";
import Navigation from "@/components/Navigation";
import bempoloCyber from "@/assets/bempolo-cyber.jpg";
import bempoloWizard from "@/assets/bempolo-wizard.jpg";
import bempoloSpace from "@/assets/bempolo-space.jpg";
import bempoloZen from "@/assets/bempolo-zen.jpg";
import bempoloNeon from "@/assets/bempolo-neon.jpg";
import bempoloRetro from "@/assets/bempolo-retro.jpg";

const products = [
  {
    id: 1,
    name: "Cyber Bempolo",
    description: "Digital gnome hacking the blockchain",
    price: 300,
    image: bempoloCyber,
  },
  {
    id: 2,
    name: "Wizard Bempolo",
    description: "Magical gnome casting meme spells",
    price: 250,
    image: bempoloWizard,
  },
  {
    id: 3,
    name: "Space Bempolo",
    description: "Astronaut gnome in crypto cosmos",
    price: 350,
    image: bempoloSpace,
  },
  {
    id: 4,
    name: "Zen Bempolo",
    description: "Peaceful gnome achieving digital enlightenment",
    price: 200,
    image: bempoloZen,
  },
  {
    id: 5,
    name: "Neon Bempolo",
    description: "Gnome glowing with vaporwave energy",
    price: 275,
    image: bempoloNeon,
  },
  {
    id: 6,
    name: "Quantum Bempolo",
    description: "Gnome existing in multiple dimensions",
    price: 400,
    image: bempoloWizard,
  },
  {
    id: 7,
    name: "Retro Bempolo",
    description: "80s synth gnome with nostalgic vibes",
    price: 225,
    image: bempoloRetro,
  },
  {
    id: 8,
    name: "Crystal Bempolo",
    description: "Mystical gnome with healing powers",
    price: 300,
    image: bempoloZen,
  },
  {
    id: 9,
    name: "Holo Bempolo",
    description: "Holographic gnome from the future",
    price: 450,
    image: bempoloSpace,
  },
  {
    id: 10,
    name: "Genesis Bempolo",
    description: "The original legendary gnome",
    price: 500,
    image: bempoloCyber,
  },
];

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleBuyNow = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-orbitron font-bold text-gradient-primary mb-4">
            BEMPOLO SHOP
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Exclusive digital drops from the legendary garden gnome. 
            Prices shown in BEMP, paid with USDT on Polygon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="card-glow hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-xl font-orbitron font-bold text-primary mb-2">
                {product.name}
              </h3>
              
              <p className="text-muted-foreground mb-4 text-sm">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent">
                    {product.price} BEMP
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleBuyNow(product)}
                className="btn-neon-primary w-full mt-4 flex items-center justify-center"
              >
                <span>Buy Now</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Shop;