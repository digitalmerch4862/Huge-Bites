/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Cake, 
  Utensils, 
  Star, 
  ChevronRight, 
  Instagram, 
  Facebook,
  Mail,
  Check,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ShoppingCart
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import ChatBot from './components/ChatBot';
import { CartProvider, useCart, Product } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import PaymentPortal from './components/PaymentPortal';

function AppContent() {
  const { addToCart, totalItems, setIsCartOpen } = useCart();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const phoneNumber = "+639276623221";
  const whatsappNumber = "639276623221";
  const mapsLink = "https://maps.app.goo.gl/XtHqjL9h8c94teaL7";
  const businessName = "Huge Bites Cakes and Pastries";
  const location = "Cabuyao, Laguna";

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('flavors');
  const [selectedOptions, setSelectedOptions] = useState({
    size: '6" Round',
    flavor: 'Classic Chocolate',
    filling: 'Dark Ganache'
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  const cakeOptions = {
    sizes: ['6" Round', '8" Round', '10" Round', 'Custom Tiered'],
    flavors: ['Classic Chocolate', 'Red Velvet', 'Vanilla Bean', 'Ube Halaya'],
    fillings: ['Dark Ganache', 'Cream Cheese', 'Fresh Berries', 'Salted Caramel']
  };

  return (
    <div className="min-h-screen selection:bg-gold/30 selection:text-gold-dark">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-gold p-1.5 rounded-lg shadow-lg shadow-gold/20">
              <Cake className="w-6 h-6 text-white" />
            </div>
            <span className={`font-serif text-xl font-bold tracking-tight transition-colors duration-500 ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}>
              Huge Bites
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
            {['services', 'about', 'builder', 'location'].map((item) => (
              <a key={item} href={`#${item}`} className="hover:text-gold transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-stone-900 hover:bg-gold hover:text-white transition-all group"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-lg"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${phoneNumber}`}
              className="bg-stone-900 text-white px-7 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-xl shadow-stone-900/20 hover:bg-gold"
            >
              Order Now
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <motion.div style={{ scale }} className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1920&auto=format&fit=crop" 
            alt="Luxury Cake"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/80 to-transparent" />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gold/10 text-gold text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                <Sparkles className="w-3 h-3" />
                Laguna's Premier Cakery
              </span>
              <h1 className="text-6xl md:text-8xl font-bold text-stone-900 mb-8 leading-[0.95] tracking-tight">
                Luxury Cakes <br />
                <span className="text-gold italic font-normal">Baked to Perfection.</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed max-w-lg">
                Exquisite custom designs and artisanal pastries in Cabuyao, Laguna. We transform your vision into delicious reality.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${phoneNumber}`}
                  className="bg-gold text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl shadow-gold/30 flex items-center gap-3"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${whatsappNumber}`}
                  className="bg-white text-stone-900 border border-stone-200 px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest shadow-sm flex items-center gap-3 hover:border-gold transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-stone-300 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Interactive Cake Builder */}
      <section id="builder" className="py-32 bg-stone-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-5xl font-bold mb-8 leading-tight">Build Your <br /><span className="text-gold italic">Dream Cake</span></h2>
              <p className="text-stone-400 text-lg mb-12 max-w-md">
                Get a head start on your custom order. Select your preferences below to see your perfect combination.
              </p>
              
              <div className="flex gap-4 mb-10 border-b border-white/10 pb-4">
                {['sizes', 'flavors', 'fillings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === tab ? 'text-gold' : 'text-stone-500 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="contents"
                  >
                    {cakeOptions[activeTab as keyof typeof cakeOptions].map((option) => (
                      <button
                        key={option}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [activeTab.slice(0, -1)]: option }))}
                        className={`p-4 rounded-xl border transition-all text-left flex items-center justify-between group ${
                          selectedOptions[activeTab.slice(0, -1) as keyof typeof selectedOptions] === option 
                          ? 'border-gold bg-gold/10 text-gold' 
                          : 'border-white/10 hover:border-white/30 text-stone-400'
                        }`}
                      >
                        <span className="text-sm font-bold">{option}</span>
                        {selectedOptions[activeTab.slice(0, -1) as keyof typeof selectedOptions] === option && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div 
              {...fadeIn}
              className="relative p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/20 rounded-full blur-3xl" />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-gold">
                <Sparkles className="w-5 h-5" /> Your Custom Order
              </h3>
              <div className="space-y-6">
                {Object.entries(selectedOptions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[9px] font-black uppercase tracking-widest text-stone-500">{key}</span>
                    <span className="text-base font-serif italic text-white">{value}</span>
                  </div>
                ))}
              </div>
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${phoneNumber}`}
                className="mt-10 w-full bg-gold text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 shadow-2xl shadow-gold/20"
              >
                Get a Quote Now <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <motion.div {...fadeIn}>
              <span className="text-gold font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Expertise</span>
              <h2 className="text-5xl md:text-6xl font-bold text-stone-900 leading-tight">What We <br />Bake Best.</h2>
            </motion.div>
            <motion.p {...fadeIn} className="max-w-xs text-stone-500 leading-relaxed text-sm">
              Every creation is a blend of traditional techniques and modern artistry, ensuring your celebration is unforgettable.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                id: 'custom-cake',
                title: "Custom Celebration Cakes",
                desc: "Bespoke designs for weddings, birthdays, and corporate milestones.",
                price: 2500,
                img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 'artisanal-pastries',
                title: "Artisanal Pastries",
                desc: "Daily fresh-baked croissants, tarts, and artisanal breads.",
                price: 1200,
                img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 'gourmet-cupcakes',
                title: "Gourmet Cupcakes",
                desc: "Curated spreads featuring a variety of mini-treats for your events.",
                price: 850,
                img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop"
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer bg-stone-50 rounded-[2.5rem] p-4 border border-stone-100 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500"
              >
                <div className="relative h-[400px] overflow-hidden rounded-[2rem] mb-8">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-6 right-6">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
                      <span className="text-stone-900 font-black text-sm">₱{item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <h3 className="text-2xl font-bold text-stone-900 mb-3">{item.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed mb-8">
                    {item.desc}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToCart({
                      id: item.id,
                      title: item.title,
                      description: item.desc,
                      price: item.price,
                      image: item.img
                    })}
                    className="w-full bg-stone-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 group-hover:bg-gold transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 bg-stone-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" 
                  alt="Baker"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[2rem] shadow-2xl hidden md:block max-w-[280px] border border-stone-100">
                <Star className="text-gold w-6 h-6 mb-4 fill-gold" />
                <p className="text-stone-900 font-serif text-lg italic leading-relaxed">
                  "Every cake tells a story. We make sure yours is unforgettable."
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-black tracking-[0.3em] uppercase text-[9px] mb-6 block">Our Story</span>
              <h2 className="text-5xl md:text-6xl font-bold text-stone-900 mb-10 leading-[1.1]">Passionate About <br /><span className="text-gold italic font-normal">Perfection.</span></h2>
              <div className="space-y-6 text-lg text-stone-600 leading-relaxed">
                <p>
                  At Huge Bites Cakes and Pastries, we believe that every celebration deserves a centerpiece that is both visually stunning and incredibly delicious.
                </p>
                <p>
                  Located in the heart of Cabuyao, Laguna, we have dedicated ourselves to the art of luxury baking, using only the finest ingredients and paying meticulous attention to every detail.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-12 mt-16 border-t border-stone-200 pt-10">
                <div>
                  <h4 className="text-4xl font-bold text-stone-900 mb-1">100%</h4>
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest font-black">Custom Designs</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-stone-900 mb-1">Fresh</h4>
                  <p className="text-[9px] text-stone-400 uppercase tracking-widest font-black">Daily Baked</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -mr-48 -mt-48 blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full -ml-48 -mb-48 blur-[100px]" />
            
            <div className="relative z-10 text-center mb-20">
              <span className="text-gold font-black text-[9px] uppercase tracking-[0.3em] mb-4 block">The Difference</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Huge Bites?</h2>
              <p className="text-stone-400 max-w-md mx-auto">The local choice for premium celebrations in Laguna.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-16 relative z-10">
              {[
                {
                  title: "Premium Ingredients",
                  desc: "We never compromise on quality, using only top-tier chocolates, creams, and fresh local produce."
                },
                {
                  title: "Artistic Excellence",
                  desc: "Each cake is treated as a unique canvas, ensuring a breathtaking design for your special day."
                },
                {
                  title: "Reliable Service",
                  desc: "Timely delivery and professional handling for your absolute peace of mind."
                }
              ].map((item, idx) => (
                <div key={idx} className="text-center group">
                  <div className="w-14 h-14 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-gold transition-colors duration-500">
                    <span className="text-gold group-hover:text-white font-black text-lg transition-colors">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-stone-400 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-40 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <span className="text-gold font-black text-[9px] uppercase tracking-[0.3em] mb-4 block">Our Gallery</span>
            <h2 className="text-5xl font-bold text-stone-900">Sweet Creations</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1562773226-1b0d0a7e55f9?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1519340333755-5672c7ec9cb2?q=80&w=800&auto=format&fit=crop"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="aspect-square rounded-2xl overflow-hidden group relative"
              >
                <img 
                  src={img} 
                  alt="Gallery" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Sparkles className="text-white w-8 h-8" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section id="location" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-5xl md:text-6xl font-bold text-stone-900 mb-8 leading-tight">Visit Our <br />Bakery.</h2>
              <p className="text-lg text-stone-500 mb-12 leading-relaxed max-w-md">
                Experience the aroma of freshly baked goods. We are conveniently located in Cabuyao, Laguna, ready to serve the local community.
              </p>
              
              <div className="space-y-8 mb-16">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Address</h4>
                    <p className="text-lg font-bold text-stone-900">{location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-100">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Hours</h4>
                    <p className="text-lg font-bold text-stone-900">Pre-orders & Inquiries Daily</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-900 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-stone-900/20"
                >
                  Get Directions <ChevronRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl border-[16px] border-stone-50"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3868.123456789012!2d121.123456789012!3d14.123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd635798765432%3A0x1234567890abcdef!2sHuge%20Bites%20Cakes%20and%20Pastries!5e0!3m2!1sen!2sph!4v1711430000000!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-40 bg-stone-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeIn}>
            <span className="text-gold font-black text-[9px] uppercase tracking-[0.4em] mb-6 block">Get in Touch</span>
            <h2 className="text-6xl md:text-7xl font-bold mb-10 leading-tight">Ready for a <br /><span className="text-gold italic font-normal">Huge Bite?</span></h2>
            <p className="text-lg text-stone-400 mb-16 leading-relaxed max-w-2xl mx-auto">
              Whether it's a grand wedding or a simple celebration, we're here to make it sweet. Reach out to us today for a personalized quote.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8 mb-20">
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${phoneNumber}`}
                className="p-12 bg-white/5 rounded-[3rem] border border-white/10 transition-all group flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-gold transition-colors duration-500">
                  <Phone className="w-6 h-6 text-gold group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2">Call Us Directly</h4>
                <p className="text-2xl font-bold text-white">{phoneNumber}</p>
              </motion.a>
              
              <motion.a 
                whileHover={{ y: -5, backgroundColor: "rgba(34, 197, 94, 0.08)" }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${whatsappNumber}`}
                className="p-12 bg-white/5 rounded-[3rem] border border-white/10 transition-all group flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-500 transition-colors duration-500">
                  <MessageCircle className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-2">WhatsApp Message</h4>
                <p className="text-2xl font-bold text-white">Chat with us</p>
              </motion.a>
            </div>
            
            <div className="flex items-center justify-center gap-10">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/happyhugebites?fbclid=IwY2xjawQxx4lleHRuA2FlbQIxMABicmlkETBsWHFMOFJFSDFUcDJEQXVFc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHgWpcaZAq2mENhx3bGy4G67VrksbKtYwVxV8Ws7J5YZYC5EkzLZJnAsfJyas_aem_gwbwDcHCrLzmUlq7xvBaxw" },
                { Icon: Facebook, label: "Facebook", href: "https://www.facebook.com/happyhugebites/#" },
                { Icon: Mail, label: "Email", href: "mailto:happyhugebites@gmail.com" }
              ].map((item, idx) => (
                <motion.a 
                  key={idx}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={item.href}
                  target={item.label !== "Email" ? "_blank" : undefined}
                  rel={item.label !== "Email" ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center gap-3 group"
                >
                  <div className="p-4 bg-white/5 rounded-full group-hover:bg-gold/20 group-hover:text-gold transition-all">
                    <item.Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-stone-500 group-hover:text-white transition-colors">{item.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-stone-950 text-stone-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-gold/20 p-2 rounded-lg">
                <Cake className="w-5 h-5 text-gold" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">{businessName}</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs font-black uppercase tracking-[0.2em] mb-2">{location}</p>
              <p className="text-xs">© {new Date().getFullYear()} Huge Bites Cakes and Pastries. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      <ChatBot />
      <CartDrawer onCheckout={() => setIsPaymentOpen(true)} />
      <PaymentPortal isOpen={isPaymentOpen} onClose={() => setIsPaymentOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
