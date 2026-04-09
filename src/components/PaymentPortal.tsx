import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Upload, CheckCircle2, Copy, ArrowRight, Sparkles, ShieldCheck, AlertCircle, Search, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface PaymentPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'scan' | 'upload' | 'confirmation';

const PaymentPortal: React.FC<PaymentPortalProps> = ({ isOpen, onClose }) => {
  const { subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('scan');
  const [isUploading, setIsUploading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [refId] = useState(() => Math.random().toString(36).substring(2, 10).toUpperCase());

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReceipt(file);
      setPreviewUrl(URL.createObjectURL(file));
      setVerificationError(null);
      setIsScanning(true);

      // Simulate AI Scanning & OCR Verification
      setTimeout(() => {
        // Mock logic: Fail if the file is very small or just random (simulated)
        // For the demo, we'll succeed 80% of the time unless it's a "bad" file
        const isLikelyValid = Math.random() > 0.2;

        if (isLikelyValid) {
          setIsScanning(false);
          setIsUploading(true);
          setTimeout(() => {
            setIsUploading(false);
            setStep('confirmation');
            clearCart();
          }, 1500);
        } else {
          setIsScanning(false);
          setVerificationError("Reference Number Not Found. Please ensure your GCash receipt is clear and the Reference Number is visible.");
          setReceipt(null);
          setPreviewUrl(null);
        }
      }, 3000);
    }
  };

  const handleClose = () => {
    setStep('scan');
    setReceipt(null);
    setPreviewUrl(null);
    setVerificationError(null);
    setIsScanning(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Secure Payment</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">
                    Step {step === 'scan' ? '1' : step === 'upload' ? '2' : '3'} of 3
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-stone-50 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-stone-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 'scan' && (
                  <motion.div
                    key="scan"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-4">
                      <p className="text-sm text-stone-500">Scan the QR code below using your GCash app to pay the exact amount.</p>
                      <div className="text-4xl font-bold text-stone-900">₱{subtotal.toLocaleString()}</div>
                    </div>

                    <div className="relative aspect-square max-w-[240px] mx-auto bg-stone-50 rounded-3xl border-2 border-stone-100 p-6 flex items-center justify-center group">
                      <QrCode className="w-full h-full text-stone-900 group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                        <Sparkles className="text-gold w-8 h-8" />
                      </div>
                    </div>

                    <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-400 uppercase tracking-widest font-bold">Account Name</span>
                        <span className="text-stone-900 font-bold">Huge Bites Cakes</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-stone-400 uppercase tracking-widest font-bold">Account Number</span>
                        <div className="flex items-center gap-2 text-stone-900 font-bold">
                          0927 662 3221
                          <button className="p-1 hover:bg-stone-200 rounded transition-colors">
                            <Copy className="w-3 h-3 text-gold" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep('upload')}
                      className="w-full bg-gold text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-2xl shadow-gold/20 hover:bg-stone-900 transition-all group"
                    >
                      I've Made the Payment
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}

                {step === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-bold text-stone-900">Upload Receipt</h3>
                      <p className="text-sm text-stone-500">Our AI will verify the Reference Number on your receipt.</p>
                    </div>

                    <div className="relative">
                      <label className={`relative block aspect-video bg-stone-50 rounded-3xl border-2 border-dashed transition-all overflow-hidden ${
                        verificationError ? 'border-red-200 bg-red-50' : 'border-stone-200 hover:border-gold hover:bg-gold/5'
                      } ${isScanning || isUploading ? 'cursor-wait' : 'cursor-pointer'}`}>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleUpload}
                          disabled={isScanning || isUploading}
                        />
                        
                        {previewUrl ? (
                          <div className="relative w-full h-full">
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
                            {isScanning && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/40 backdrop-blur-[2px]">
                                <motion.div 
                                  initial={{ top: 0 }}
                                  animate={{ top: '100%' }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                  className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"
                                />
                                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl flex items-center gap-3 shadow-xl">
                                  <Search className="w-5 h-5 text-gold animate-pulse" />
                                  <span className="text-xs font-black uppercase tracking-widest text-stone-900">Scanning Reference...</span>
                                </div>
                              </div>
                            )}
                            {isUploading && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                                <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-xs font-black uppercase tracking-widest text-gold">Finalizing Payment...</p>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Upload className="w-6 h-6 text-gold" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold text-stone-900">Click to upload or drag and drop</p>
                              <p className="text-xs text-stone-400 mt-1">PNG, JPG up to 10MB</p>
                            </div>
                          </div>
                        )}
                      </label>

                      <AnimatePresence>
                        {verificationError && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-4 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3"
                          >
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-700 leading-relaxed font-medium">
                              {verificationError}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                      <div className="p-2 bg-white rounded-lg">
                        <FileText className="w-4 h-4 text-gold" />
                      </div>
                      <p className="text-[10px] text-stone-500 leading-relaxed">
                        Our AI system automatically detects GCash Reference Numbers to ensure your order is processed instantly.
                      </p>
                    </div>
                  </motion.div>
                )}

                {step === 'confirmation' && (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-8 py-8"
                  >
                    <div className="relative w-24 h-24 mx-auto">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                        className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/20"
                      >
                        <CheckCircle2 className="w-12 h-12 text-white" />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-green-500 rounded-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-stone-900">Payment Successful!</h3>
                      <p className="text-sm text-stone-500">Thank you for your order. We've received your payment and are starting to bake your treats!</p>
                    </div>

                    <div className="bg-stone-50 rounded-3xl p-8 border border-stone-100 space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Reference ID</p>
                        <p className="text-xl font-mono font-bold text-stone-900 tracking-wider">{refId}</p>
                      </div>
                      <div className="h-px bg-stone-200" />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-stone-500">Amount Paid</span>
                        <span className="font-bold text-stone-900">₱{subtotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="w-full bg-stone-900 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-stone-900/20 hover:bg-gold transition-all"
                    >
                      Back to Home
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentPortal;
