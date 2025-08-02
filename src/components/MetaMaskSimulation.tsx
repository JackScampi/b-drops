import React, { useState, useEffect } from "react";
import { X, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface MetaMaskSimulationProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  product: {
    name: string;
    price: number;
  };
}

type SimulationStep = 
  | "connect"
  | "network-switch" 
  | "transaction-confirm"
  | "processing"
  | "success";

export const MetaMaskSimulation: React.FC<MetaMaskSimulationProps> = ({
  isOpen,
  onClose,
  onComplete,
  product
}) => {
  const [step, setStep] = useState<SimulationStep>("connect");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  useEffect(() => {
    if (isOpen) {
      setStep("connect");
      setIsProcessing(false);
      setTransactionHash("");
    }
  }, [isOpen]);

  const generateFakeHash = () => {
    return "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
  };

  const handleConnect = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("network-switch");
    }, 1500);
  };

  const handleNetworkSwitch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("transaction-confirm");
    }, 2000);
  };

  const handleConfirmTransaction = () => {
    setIsProcessing(true);
    setStep("processing");
    const hash = generateFakeHash();
    setTransactionHash(hash);
    
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 3000);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-end p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      
      {/* MetaMask Popup */}
      <div className="relative mt-16 mr-8 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
            </div>
            <span className="font-medium text-sm">MetaMask</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6 text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          {step === "connect" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Connect to Bempolo Collection</h3>
              <p className="text-sm text-gray-600">
                This site would like to connect to your wallet
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    A1
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Account 1</div>
                    <div className="text-xs text-gray-500">0x742d...5A0e</div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  Balance: 1,250.45 USDT
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleConnect} 
                  disabled={isProcessing}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  {isProcessing ? "Connecting..." : "Connect"}
                </Button>
              </div>
            </div>
          )}

          {step === "network-switch" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                <h3 className="font-semibold">Allow network switch?</h3>
              </div>
              
              <p className="text-sm text-gray-600">
                This will switch your network to Polygon Mainnet to complete the transaction.
              </p>

              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <div className="font-medium text-sm text-purple-900">Polygon Mainnet</div>
                <div className="text-xs text-purple-700">Chain ID: 137</div>
                <div className="text-xs text-purple-700">RPC: https://polygon-rpc.com</div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleNetworkSwitch}
                  disabled={isProcessing}
                  className="flex-1 bg-purple-500 hover:bg-purple-600"
                >
                  {isProcessing ? "Switching..." : "Switch Network"}
                </Button>
              </div>
            </div>
          )}

          {step === "transaction-confirm" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Confirm Transaction</h3>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Sending to:</div>
                  <div className="font-mono text-xs text-gray-900 break-all">
                    0x8ba1f109551bD432803012645Hac136c0a42A2c4
                  </div>
                </div>

                <div className="border rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Amount:</span>
                    <span className="font-semibold">{product.price} USDT</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Gas fee:</span>
                    <span className="text-sm">~0.05 MATIC ($0.04)</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold">${(product.price + 0.04).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded border border-yellow-200">
                  ⚠️ Only send USDT to this address. Sending other tokens may result in permanent loss.
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Reject
                </Button>
                <Button 
                  onClick={handleConfirmTransaction}
                  disabled={isProcessing}
                  className="flex-1 bg-blue-500 hover:bg-blue-600"
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <h3 className="font-semibold text-gray-900">Processing Transaction</h3>
              <p className="text-sm text-gray-600">
                Your transaction is being processed on the Polygon network...
              </p>
              
              {transactionHash && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Transaction Hash:</div>
                  <div className="font-mono text-xs text-blue-600 break-all">
                    {transactionHash}
                  </div>
                </div>
              )}
            </div>
          )}

          {step === "success" && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <div className="w-6 h-6 text-white">✓</div>
              </div>
              <h3 className="font-semibold text-green-700">Transaction Successful!</h3>
              <p className="text-sm text-gray-600">
                Your payment of {product.price} USDT has been confirmed.
              </p>
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-700">View on Explorer</span>
                  <ExternalLink className="h-4 w-4 text-green-600" />
                </div>
                <div className="font-mono text-xs text-green-600 break-all mt-1">
                  {transactionHash}
                </div>
              </div>

              <Button 
                onClick={handleComplete}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};