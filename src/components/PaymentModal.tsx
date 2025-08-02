import { useState } from "react";
import { X, Wallet, Mail, CreditCard, Loader2, PlayCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const PaymentModal = ({ isOpen, onClose, product }: PaymentModalProps) => {
  const [step, setStep] = useState<"payment" | "email" | "confirmation">("payment");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const navigate = useNavigate();

  // Convert BEMP price to USDT (example rate: 1 BEMP = 0.001 USDT)
  const usdtPrice = (product.price * 0.001).toFixed(3);
  const targetWallet = "0xB0aD6c79E8e232FE64b9C8fF77B5D00e2F76E1C3";

  const handleDemoPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      toast.success("Demo payment successful! Please provide your email.");
      setStep("email");
    } catch (error) {
      toast.error("Demo payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (isDemoMode) {
      await handleDemoPayment();
      return;
    }

    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask not detected. Please install MetaMask.");
      return;
    }

    setIsProcessing(true);

    try {
      // Request accounts
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      // Switch to Polygon network if needed
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }], // Polygon Mainnet
        });
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        }
      }

      // USDT contract address on Polygon
      const usdtContractAddress = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
      
      // Calculate amount in wei (USDT has 6 decimals)
      const amountInWei = Math.floor(parseFloat(usdtPrice) * 1000000).toString(16);

      // ERC-20 transfer function signature
      const transferFunctionSignature = "0xa9059cbb";
      const paddedAddress = targetWallet.slice(2).padStart(64, "0");
      const paddedAmount = amountInWei.padStart(64, "0");
      const data = transferFunctionSignature + paddedAddress + paddedAmount;

      // Send transaction
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: accounts[0],
            to: usdtContractAddress,
            data: data,
            gas: "0x186A0", // 100,000 gas limit
          },
        ],
      });

      toast.success("Payment successful! Please provide your email.");
      setStep("email");
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast.error(error.message || "Payment failed. Please try again.");
      navigate("/error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEmailSubmit = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call to send download link
      const response = await fetch("/api/send-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          productId: product.id,
          productName: product.name,
        }),
      });

      if (response.ok) {
        toast.success("Download link sent to your email!");
        setStep("confirmation");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.success("Download link sent! (Demo mode)");
      setStep("confirmation");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    navigate("/thankyou");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative card-glow p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {step === "payment" ? (
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-gradient-primary mb-6">
              Purchase {product.name}
            </h2>

            <div className="mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-muted/20 rounded-lg">
                <span className="text-muted-foreground">Price (visual)</span>
                <span className="text-xl font-bold text-accent">{product.price} BEMP</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-foreground font-semibold">Payment Amount</span>
                <span className="text-xl font-bold text-primary">{usdtPrice} USDT</span>
              </div>

              <div className="text-sm text-muted-foreground p-3 bg-muted/10 rounded-lg">
                <p className="mb-2">
                  <strong>Payment Network:</strong> Polygon
                </p>
                <p className="mb-2">
                  <strong>Payment Token:</strong> USDT
                </p>
                <p className="break-all">
                  <strong>Recipient:</strong> {targetWallet}
                </p>
              </div>
            </div>

            {/* Demo Mode Toggle */}
            <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">Demo Mode</span>
                </div>
                <button
                  onClick={() => setIsDemoMode(!isDemoMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    isDemoMode ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-background rounded-full transition-transform ${
                      isDemoMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {isDemoMode 
                  ? "Experience the payment flow without MetaMask" 
                  : "Use real MetaMask for actual payment"
                }
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="btn-neon-primary w-full flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {isDemoMode ? <PlayCircle className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
                  <span>{isDemoMode ? "Demo Payment" : "Pay with MetaMask"}</span>
                </>
              )}
            </button>
          </div>
        ) : step === "email" ? (
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-gradient-secondary mb-6">
              Get Your Download
            </h2>

            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-semibold">Payment Successful!</span>
              </div>
              <p className="text-muted-foreground">
                Enter your email to receive the download link for <strong>{product.name}</strong>.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                />
              </div>
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={isProcessing || !email}
              className="btn-neon-secondary w-full flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send Download Link</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-orbitron font-bold text-gradient-primary mb-6 text-center">
              Email Sent Successfully!
            </h2>

            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-secondary animate-pulse" />
              </div>
              
              <div className="space-y-4">
                <p className="text-xl font-semibold text-foreground">
                  Check your inbox!
                </p>
                <p className="text-muted-foreground">
                  Your download link for <strong className="text-foreground">{product.name}</strong> has been sent to:
                </p>
                <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                  <p className="text-secondary font-semibold break-all">{email}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Don't see it? Check your spam folder or wait a few minutes for delivery.
                </p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="btn-neon-primary w-full flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Continue</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;