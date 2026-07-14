import React, { useState, useEffect } from 'react';
import {
  Utensils,
  ShoppingBag,
  Pill,
  Package,
  Inbox,
  ArrowLeftRight,
  Calendar,
  BadgePercent,
  Home as HomeIcon,
  Store,
  Lightbulb,
  Users,
  MapPin,
  Cpu,
  TrendingUp,
  GraduationCap,
  UserCheck,
  Briefcase,
  Sparkles,
  Truck,
  ShieldAlert,
  HardDrive,
  Handshake,
  Phone,
  MessageCircle,
  Instagram,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Lock,
  Check,
  CheckCircle2,
  Calculator,
  ArrowRight,
  User,
  Heart,
  Globe,
  Award,
  ChevronRight,
  HelpCircle,
  Info
} from 'lucide-react';

import Logo from './components/Logo';
import InteractiveCalculator from './components/InteractiveCalculator';
import InquiryForm from './components/InquiryForm';
import LeadCenter from './components/LeadCenter';
import LanguageGateway from './components/LanguageGateway';
import AdminPanel from './components/AdminPanel';
import {
  HERO_SERVICES,
  STATISTICS_ITEMS,
  WHY_CHOOSE_GRABITO,
  WHO_CAN_START,
  SERVICES_LIST,
  FRANCHISE_INCLUDES,
  MONTHLY_SUPPORT_INCLUDES,
  TOWN_FEATURES,
  HOW_IT_WORKS_STEPS,
  WHY_THIS_BUSINESS_ITEMS,
  FAQS,
  CONTACT_INFO
} from './data';
import {
  TRANSLATIONS,
  getLocalizedWhyChoose,
  getLocalizedWhoCanStart,
  getLocalizedServicesList,
  getLocalizedFranchiseIncludes,
  getLocalizedMonthlySupport,
  getLocalizedTownFeatures,
  getLocalizedHowItWorks,
  getLocalizedWhyThisBusiness,
  getLocalizedFaqs
} from './translations';
import { FranchiseInquiry } from './types';

export default function App() {
  // Localization state (synced with localStorage)
  const [lang, setLang] = useState<'en' | 'kn'>(() => {
    const saved = localStorage.getItem('grabito_lang');
    return (saved === 'kn' || saved === 'en') ? saved : 'en';
  });

  // State to track if the full-screen Language Gateway should be shown
  const [showGateway, setShowGateway] = useState(() => {
    const saved = localStorage.getItem('grabito_lang');
    return !(saved === 'kn' || saved === 'en');
  });

  // Small dropdown status for localized navigation language switcher
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleLangChange = (newLang: 'en' | 'kn') => {
    setLang(newLang);
    localStorage.setItem('grabito_lang', newLang);
  };

  const t = TRANSLATIONS[lang];

  // Dynamic state for prices loaded from localStorage
  const [franchisePrice, setFranchisePrice] = useState(() => {
    return localStorage.getItem('grabito_franchise_price') || '₹5,999';
  });

  const [supportPrice, setSupportPrice] = useState(() => {
    return localStorage.getItem('grabito_support_price') || '₹199';
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamically localized list getters
  const heroServicesArray = lang === 'kn' ? [
    "ಊಟದ ಡೆಲಿವರಿ",
    "ಪಾರ್ಸಲ್ ಡೆಲಿವರಿ",
    "ಔಷಧಿ ಡೆಲಿವರಿ",
    "ದಿನಸಿ ಡೆಲಿವರಿ",
    "ರೆಂಟಲ್ಸ್ ಸೇವೆಗಳು",
    "ಶಾಪಿಂಗ್ ಡೆಲಿವರಿ",
    "ಕೊರಿಯರ್ ಸೇವೆಗಳು",
    "ವೈಯಕ್ತಿಕ ಡೆಲಿವರಿ"
  ] : HERO_SERVICES;

  const statisticsItems = [
    {
      value: franchisePrice,
      label: t.statsFeeLabel,
      subtext: t.statsFeeSub
    },
    {
      value: `${supportPrice.startsWith('₹') ? '' : '₹'}${supportPrice}/mo`,
      label: t.statsSupportLabel,
      subtext: t.statsSupportSub
    },
    {
      value: "100%",
      label: t.statsShopLabel,
      subtext: t.statsShopSub
    },
    {
      value: "31 Districts",
      label: t.statsTownsLabel,
      subtext: t.statsTownsSub
    }
  ];

  const whyChooseArray = getLocalizedWhyChoose(lang) || WHY_CHOOSE_GRABITO;
  const whoCanStartArray = getLocalizedWhoCanStart(lang) || WHO_CAN_START;
  const servicesListArray = getLocalizedServicesList(lang) || SERVICES_LIST;
  const franchiseIncludesArray = getLocalizedFranchiseIncludes(lang) || FRANCHISE_INCLUDES;
  const monthlySupportArray = getLocalizedMonthlySupport(lang) || MONTHLY_SUPPORT_INCLUDES;
  const townFeaturesArray = getLocalizedTownFeatures(lang) || TOWN_FEATURES;
  const howItWorksArray = getLocalizedHowItWorks(lang) || HOW_IT_WORKS_STEPS;
  const whyThisBusinessArray = getLocalizedWhyThisBusiness(lang) || WHY_THIS_BUSINESS_ITEMS;
  const faqsArray = getLocalizedFaqs(lang) || FAQS;

  // Navigation states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Active FAQ index
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-shop');

  // Lead Center triggers
  const [inquiryTrigger, setInquiryTrigger] = useState<number>(0);
  const [showAdminConsole, setShowAdminConsole] = useState(false);

  // Stats Counters state simulation
  const [onboardingCount, setOnboardingCount] = useState(14);
  const [activeRiders, setActiveRiders] = useState(128);

  // Trigger scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section tracker
      const sections = ['home', 'services', 'benefits', 'pricing', 'faq', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate passive growth of riders/partners for a live SaaS vibe
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveRiders(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleInquirySubmit = (newInquiry: FranchiseInquiry) => {
    setInquiryTrigger(prev => prev + 1);
    // Auto-expand admin console so they see their new card in the dashboard registry
    setTimeout(() => {
      setShowAdminConsole(true);
      const adminEl = document.getElementById('leads-registry-panel');
      if (adminEl) {
        adminEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1500);
  };

  // Helper to resolve icon name to Lucide Component
  const renderIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case "Utensils": return <Utensils className={className} />;
      case "ShoppingBag": return <ShoppingBag className={className} />;
      case "Pill": return <Pill className={className} />;
      case "Package": return <Package className={className} />;
      case "Inbox": return <Inbox className={className} />;
      case "ArrowLeftRight": return <ArrowLeftRight className={className} />;
      case "Calendar": return <Calendar className={className} />;
      case "BadgePercent": return <BadgePercent className={className} />;
      case "Home": return <HomeIcon className={className} />;
      case "Store": return <Store className={className} />;
      case "Lightbulb": return <Lightbulb className={className} />;
      case "Users": return <Users className={className} />;
      case "MapPin": return <MapPin className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "GraduationCap": return <GraduationCap className={className} />;
      case "UserCheck": return <UserCheck className={className} />;
      case "Briefcase": return <Briefcase className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "Truck": return <Truck className={className} />;
      case "ShieldAlert": return <ShieldAlert className={className} />;
      case "HardDrive": return <HardDrive className={className} />;
      case "Handshake": return <Handshake className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  if (showGateway) {
    return (
      <LanguageGateway
        onSelect={(selectedLang) => {
          handleLangChange(selectedLang);
          setShowGateway(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#FF6B00] selection:text-white relative animate-[fadeIn_0.5s_ease-out]">
      
      {/* 1. STICKY GLASSMORPHIC HEADER */}
      <header
        id="navbar-sticky"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav shadow-md py-3 md:py-4'
            : 'bg-white/90 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <a href="#home" className="hover:opacity-90 transition-opacity">
              <Logo theme="light" showSlogan={true} lang={lang} />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <a
                href="#home"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'home'
                    ? 'text-[#FF6B00] bg-[#FFF8F3]'
                    : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50'
                }`}
              >
                {t.navHome}
              </a>
              <a
                href="#services"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'services'
                    ? 'text-[#FF6B00] bg-[#FFF8F3]'
                    : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50'
                }`}
              >
                {t.navServices}
              </a>
              <a
                href="#benefits"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'benefits'
                    ? 'text-[#FF6B00] bg-[#FFF8F3]'
                    : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50'
                }`}
              >
                {t.navBenefits}
              </a>
              <a
                href="#pricing"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'pricing'
                    ? 'text-[#FF6B00] bg-[#FFF8F3]'
                    : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50'
                }`}
              >
                {t.navPricing}
              </a>
              <a
                href="#faq"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'faq'
                    ? 'text-[#FF6B00] bg-[#FFF8F3]'
                    : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50'
                }`}
              >
                {t.navFAQ}
              </a>
              <a
                href="#contact"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === 'contact'
                    ? 'text-[#FF6B00] bg-[#FFF8F3]'
                    : 'text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50'
                }`}
              >
                {t.navContact}
              </a>
            </nav>

            {/* Header Right Action Group */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Elegant Dropdown Language Switcher with Globe Icon */}
              <div className="relative">
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-xl text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50 border border-gray-200/60 transition-all text-xs font-semibold cursor-pointer bg-white shadow-xs"
                  title="Switch Language / ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ"
                >
                  <Globe className="w-4 h-4 text-[#FF6B00]" />
                  <span>{lang === 'en' ? '🇬🇧 EN' : '🇮🇳 ಕನ್ನಡ'}</span>
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLangDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsLangDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-20 animate-[fadeIn_0.15s_ease-out] overflow-hidden">
                      <button
                        onClick={() => {
                          handleLangChange('en');
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                          lang === 'en'
                            ? 'bg-orange-50 text-[#FF6B00]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🇬🇧</span> English
                        </span>
                        {lang === 'en' && <Check className="w-3.5 h-3.5 text-[#FF6B00]" />}
                      </button>
                      <button
                        onClick={() => {
                          handleLangChange('kn');
                          setIsLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                          lang === 'kn'
                            ? 'bg-orange-50 text-[#FF6B00]'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>🇮🇳</span> ಕನ್ನಡ
                        </span>
                        {lang === 'kn' && <Check className="w-3.5 h-3.5 text-[#FF6B00]" />}
                      </button>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => {
                  setShowAdminConsole(!showAdminConsole);
                  setTimeout(() => {
                    const registryEl = document.getElementById('leads-registry-panel');
                    if (registryEl) registryEl.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className={`text-xs font-mono font-bold px-3 py-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  showAdminConsole 
                    ? 'bg-[#111111] text-white border-black' 
                    : 'bg-gray-50 text-gray-700 hover:text-[#FF6B00] border-gray-200 hover:border-orange-200'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${showAdminConsole ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`} />
                {showAdminConsole ? t.adminConsoleBtnClose : (lang === 'kn' ? 'ಲೈವ್ ಹಬ್' : 'Live District Hub')}
              </button>

              <a
                href="#franchise-inquiry-form"
                className="bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-[1.02] transform active:scale-95"
              >
                {lang === 'kn' ? 'ಫ್ರಾಂಚೈಸ್ ಪಡೆಯಿರಿ' : 'Get Franchise'}
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setShowAdminConsole(!showAdminConsole)}
                className="p-1.5 text-xs font-mono font-bold text-gray-500 hover:text-[#FF6B00] bg-gray-50 border border-gray-200 rounded-lg"
                title="District Live Console"
              >
                {lang === 'kn' ? 'ಹಬ್' : 'Hub'}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-[#FF6B00] hover:bg-gray-50 rounded-lg transition-colors focus:outline-none"
                id="mobile-menu-toggle"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[72px] bg-white border-b border-gray-200 shadow-xl z-40 p-5 space-y-4 animate-[fadeIn_0.2s_ease-out]">
            {/* Mobile Language Selector */}
            <div className="bg-[#FFF8F3] border border-orange-100/50 p-4 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-[#FF6B00]" />
                {lang === 'kn' ? 'ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ' : 'Change Language / ಭಾಷೆ'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    handleLangChange('en');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    lang === 'en'
                      ? 'bg-[#FF6B00] text-white border-transparent shadow-xs font-semibold'
                      : 'bg-white text-gray-600 border-gray-200/80 hover:border-orange-200'
                  }`}
                >
                  <span>🇬🇧</span> English
                </button>
                <button
                  onClick={() => {
                    handleLangChange('kn');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    lang === 'kn'
                      ? 'bg-[#FF6B00] text-white border-transparent shadow-xs font-semibold'
                      : 'bg-white text-gray-600 border-gray-200/80 hover:border-orange-200'
                  }`}
                >
                  <span>🇮🇳</span> ಕನ್ನಡ
                </button>
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              <a
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#FF6B00] hover:bg-[#FFF8F3] rounded-xl transition-colors"
              >
                {t.navHome}
              </a>
              <a
                href="#services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#FF6B00] hover:bg-[#FFF8F3] rounded-xl transition-colors"
              >
                {t.navServices}
              </a>
              <a
                href="#benefits"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#FF6B00] hover:bg-[#FFF8F3] rounded-xl transition-colors"
              >
                {t.navBenefits}
              </a>
              <a
                href="#pricing"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#FF6B00] hover:bg-[#FFF8F3] rounded-xl transition-colors"
              >
                {t.navPricing}
              </a>
              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#FF6B00] hover:bg-[#FFF8F3] rounded-xl transition-colors"
              >
                {t.navFAQ}
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-semibold text-gray-700 hover:text-[#FF6B00] hover:bg-[#FFF8F3] rounded-xl transition-colors"
              >
                {t.navContact}
              </a>
            </nav>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
              <a
                href="#franchise-inquiry-form"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold py-3.5 rounded-xl transition-all shadow"
              >
                {lang === 'kn' ? 'ಫ್ರಾಂಚೈಸ್ ಪಡೆಯಿರಿ' : 'Get Franchise Now'}
              </a>
              <a
                href={CONTACT_INFO.whatsappLink}
                className="w-full text-center bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                {lang === 'kn' ? 'ಸುಜಿತ್ ಅವರಿಗೆ ವಾಟ್ಸಾಪ್ ಮಾಡಿ' : 'WhatsApp Sujith'}
              </a>
            </div>
          </div>
        )}
      </header>


      {/* 2. HERO SECTION */}
      <section
        id="home"
        className="pt-24 md:pt-36 pb-16 md:pb-24 grid-pattern relative overflow-hidden"
      >
        {/* Soft floating decoration shapes */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-gradient-to-tr from-orange-500/10 to-red-500/5 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/10 w-80 h-80 bg-gradient-to-br from-orange-300/10 to-[#FFF8F3] rounded-full filter blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8">
              
              {/* Karnataka Badge Tag */}
              <div className="inline-flex items-center gap-2 bg-[#FFF8F3] border border-orange-200 px-3 py-1.5 rounded-full text-xs font-semibold text-[#FF6B00] animate-[bounce_3s_infinite]">
                <MapPin className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ನಮ್ಮ ಮಾರುಕಟ್ಟೆ ವಿಸ್ತರಿಸಲಾಗುತ್ತಿದೆ' : 'Now Expanding Across Karnataka Towns'}</span>
              </div>

              {/* Mega Headline */}
              <div className="space-y-4">
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl text-gray-900 tracking-tight leading-[1.1]">
                  {lang === 'kn' ? (
                    <>
                      ಆರಂಭಿಸಿ ನಿಮ್ಮದೇ ಸ್ವಂತ <br />
                      <span className="text-[#FF6B00] relative">
                        ಡೆಲಿವರಿ ವ್ಯವಹಾರವನ್ನು
                        <span className="absolute left-0 bottom-0.5 w-full h-1.5 bg-[#FF6B00]/10 rounded" />
                      </span> <br />
                      ಗ್ರಾಬಿಟೊ ಜೊತೆಗೆ
                    </>
                  ) : (
                    <>
                      Start Your Own <br />
                      <span className="text-[#FF6B00] relative">
                        Delivery Business
                        <span className="absolute left-0 bottom-0.5 w-full h-1.5 bg-[#FF6B00]/10 rounded" />
                      </span> <br />
                      With Grabito
                    </>
                  )}
                </h1>
                <p className="font-sans text-gray-600 text-base md:text-lg max-w-xl leading-relaxed">
                  {t.heroSubheadline}
                </p>
              </div>

              {/* Tag Carousel list representing multi-category */}
              <div className="space-y-3">
                <span className="text-xs font-bold font-mono text-gray-400 uppercase tracking-widest block">
                  {lang === 'kn' ? 'ಒಂದೇ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿ ಎಲ್ಲಾ ಡೆಲಿವರಿ ವಿಭಾಗಗಳು:' : 'All-in-One Category Coverage:'}
                </span>
                <div className="flex flex-wrap gap-2 max-w-2xl">
                  {heroServicesArray.map((serv, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-white border border-[#ECECEC] px-3.5 py-1.5 rounded-xl text-xs font-medium text-gray-800 shadow-sm hover:border-orange-200 hover:bg-[#FFF8F3] transition-all cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                      {serv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Slogan Badge */}
              <div className="font-display font-bold text-gray-900 text-sm italic flex items-center gap-2">
                <span className="w-8 h-[1px] bg-gray-300" />
                &ldquo;{lang === 'kn' ? 'ಎಲ್ಲವೂ, ಒಂದೇ ಗ್ರಾಬ್‌ನಲ್ಲಿ.' : 'Everything in One Grab.'}&rdquo;
                <span className="w-8 h-[1px] bg-gray-300" />
              </div>

              {/* Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href="#franchise-inquiry-form"
                  className="bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold text-center text-sm px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {t.heroBtnStart}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-[#ECECEC] hover:border-orange-200 text-gray-800 hover:text-[#FF6B00] font-semibold text-center text-sm px-8 py-4 rounded-xl transition-all shadow-sm hover:bg-[#FFF8F3] flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                  {lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಮಾಡಿ' : 'WhatsApp Now'}
                </a>
              </div>
            </div>

            {/* Right Illustration Column (Apple-inspired dynamic graphics) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-[380px] md:max-w-[430px] aspect-square rounded-[40px] bg-gradient-to-tr from-[#FFF8F3] to-white border border-[#ECECEC] shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
                {/* Embedded Grid background inside illustration container */}
                <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
                <div className="absolute inset-0 radial-glow pointer-events-none" />

                {/* Top illustration layer: City Elements Map Representation */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="bg-white px-3 py-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-[10px] font-bold text-gray-800 uppercase font-mono">{lang === 'kn' ? 'ಹೋಟೆಲ್‌ಗಳು' : 'Restaurant'}</span>
                  </div>
                  <div className="bg-white px-3 py-1.5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-[10px] font-bold text-gray-800 uppercase font-mono">{lang === 'kn' ? 'ಮೆಡಿಕಲ್ ಶಾಪ್' : 'Pharmacy'}</span>
                  </div>
                </div>

                {/* Animated Central Scooter Visual and Floating Category Elements */}
                <div className="relative my-4 flex-1 flex items-center justify-center">
                  
                  {/* Glowing central target representing localized zone */}
                  <div className="absolute w-44 h-44 border border-dashed border-[#FF6B00]/20 rounded-full animate-[spin_30s_linear_infinite] flex items-center justify-center">
                    <div className="w-24 h-24 border border-dashed border-[#FF6B00]/40 rounded-full" />
                  </div>

                  {/* Scooter rider illustration inside a micro-window */}
                  <div className="w-36 h-36 bg-white rounded-3xl border border-[#ECECEC] shadow-lg flex items-center justify-center relative z-10 animate-float">
                    <svg viewBox="0 0 100 100" className="w-24 h-24 text-[#FF6B00]">
                      {/* Stylized Modern Scooter representation */}
                      <circle cx="28" cy="74" r="11" stroke="#111111" strokeWidth="4" fill="none" />
                      <circle cx="72" cy="74" r="11" stroke="#111111" strokeWidth="4" fill="none" />
                      <path d="M 28 74 L 50 74 L 62 48 L 72 74" stroke="#111111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <path d="M 38 60 L 50 35 L 72 35" stroke="#FF6B00" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <rect x="25" y="38" width="16" height="16" rx="3" fill="#FF6B00" stroke="#111111" strokeWidth="2.5" /> {/* Courier Box */}
                      {/* Driver helmet outline */}
                      <circle cx="58" cy="22" r="7" fill="#111111" />
                      <path d="M 58 22 L 53 28" stroke="#111111" strokeWidth="2.5" />
                    </svg>
                    
                    {/* Location target marker */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full animate-ping">
                      <span className="w-1.5 h-1.5 block bg-white rounded-full" />
                    </span>
                    <span className="absolute -top-1 -right-1 bg-[#FF6B00] text-white p-1 rounded-full shadow border border-white">
                      <MapPin className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Floating delivery category icons */}
                  <div className="absolute top-1/10 left-1/10 bg-white p-2.5 rounded-full shadow-md border border-gray-100 text-[#FF6B00] animate-bounce">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-1/10 right-1/12 bg-white p-2.5 rounded-full shadow-md border border-gray-100 text-[#FF6B00] animate-[bounce_4s_infinite]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div className="absolute top-1/3 right-1/10 bg-white p-2.5 rounded-full shadow-md border border-gray-100 text-[#FF6B00] animate-[bounce_5s_infinite]">
                    <Package className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom map location label */}
                <div className="flex justify-between items-center relative z-10 bg-white/80 border border-gray-100 px-4 py-2.5 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span className="text-xs font-bold text-gray-800">{lang === 'kn' ? 'ಪಟ್ಟಣದ ಗಡಿ ನಕ್ಷೆ' : 'Exclusive Town Map'}</span>
                  </div>
                  <span className="text-[10px] font-mono text-green-600 bg-green-50 px-2 py-0.5 rounded font-bold uppercase">
                    {lang === 'kn' ? 'ಬುಕ್ ಆಗಿದೆ' : 'Reserved'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 3. STATISTICS SECTION */}
      <section className="py-12 bg-white border-y border-[#ECECEC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
            {statisticsItems.map((stat, i) => (
              <div
                key={i}
                className="pt-6 sm:pt-0 lg:pl-8 first:pl-0 flex flex-col justify-center text-center sm:text-left space-y-1 group hover:translate-y-[-2px] transition-transform duration-300"
              >
                <div className="text-3xl lg:text-4xl font-display font-extrabold text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-xs text-gray-500 leading-normal">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. SERVICES YOU CAN OFFER */}
      <section id="services" className="py-20 md:py-28 bg-[#FFF8F3]/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-white border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಆದಾಯದ ಮಾರ್ಗಗಳು' : 'Lucrative Offerings'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.servicesTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              {t.servicesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesListArray.map((serv) => (
              <div
                key={serv.id}
                className="bg-white rounded-3xl border border-[#ECECEC] p-6 hover:shadow-xl hover:border-orange-200 transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Service Tag */}
                {serv.tag && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider bg-orange-100 text-[#FF6B00] px-2 py-0.5 rounded-md">
                    {serv.tag}
                  </span>
                )}

                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 bg-[#FFF8F3] border border-orange-100 rounded-2xl flex items-center justify-center text-[#FF6B00] group-hover:bg-[#FF6B00] group-hover:text-white transition-all duration-300">
                    {renderIcon(serv.icon, "w-6 h-6")}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-lg text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                      {serv.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50 text-[10px] text-gray-400 font-mono">
                  {lang === 'kn' ? 'ಹಲವಾರು ಅಂಗಡಿಗಳ ಜೋಡಣೆ ಸಕ್ರಿಯವಾಗಿದೆ' : 'Multi-Store Onboarding Active'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-gray-500 italic max-w-lg mx-auto">
              *{lang === 'kn' ? 'ಜೊತೆಗೆ ಹೂವಿನ ಡೆಲಿವರಿ, ಉಡುಗೊರೆ ಪ್ಯಾಕೇಜಿಂಗ್, ಸ್ಥಳೀಯ ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಅಂಗಡಿಗಳು, ದಾಖಲೆಗಳ ಶಿಪ್ಪಿಂಗ್ ಮತ್ತು ನಿಮ್ಮ ಪಟ್ಟಣದ ಗಡಿಯೊಳಗೆ ತಲುಪಿಸಬಹುದಾದ ಯಾವುದೇ ವಸ್ತುಗಳು!' : 'Plus flower delivery, gift packaging, local electronic shops, document shipping, and anything else deliverable within your town boundaries!'}
            </p>
          </div>

        </div>
      </section>


      {/* 5. WHY CHOOSE GRABITO (BENEFITS) */}
      <section id="benefits" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-[#FFF8F3] border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಅಪ್ರತಿಮ ಮೌಲ್ಯದ ಭರವಸೆ' : 'Unmatched Value Proposition'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.whyChooseTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {t.whyChooseSub}
            </p>
          </div>

          {/* Bento-grid inspired cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseArray.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white rounded-3xl border border-[#ECECEC] p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden group hover:border-orange-200"
              >
                {/* Background ambient corner circle */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="p-3 bg-[#FFF8F3] border border-orange-100 rounded-2xl w-fit text-[#FF6B00]">
                    {renderIcon(benefit.icon, "w-6 h-6")}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-lg text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 6. INTERACTIVE PROFITABILITY ESTIMATOR SECTION */}
      <section className="py-16 md:py-24 bg-[#FFF8F3]/40 border-y border-[#ECECEC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl text-gray-900">
              {t.calcTitle}
            </h2>
            <p className="text-gray-600 text-sm">
              {t.calcSub}
            </p>
          </div>

          <InteractiveCalculator lang={lang} />
        </div>
      </section>


      {/* 7. WHO CAN START */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-[#FFF8F3] border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಎಲ್ಲರಿಗೂ ಮುಕ್ತ ಅವಕಾಶ' : 'Open to All'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.whoCanStartTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {t.whoCanStartSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoCanStartArray.map((person, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border border-[#ECECEC] p-6 hover:shadow-lg hover:border-orange-100 transition-all duration-300 flex gap-4"
              >
                <div className="p-3 bg-[#FFF8F3] border border-orange-500/10 rounded-2xl h-fit text-[#FF6B00] shrink-0">
                  {renderIcon(person.icon, "w-6 h-6")}
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-base text-gray-900">
                    {person.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {person.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 8. FRANCHISE PACKAGE (PRICING) */}
      <section id="pricing" className="py-20 md:py-28 bg-[#FFF8F3]/40 relative border-t border-[#ECECEC]">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-white border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಹೂಡಿಕೆಯ ನೀಲನಕ್ಷೆ' : 'Investment Blueprint'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.packageTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {t.packageSub}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Package 1: Franchise Setup (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-[32px] border border-[#ECECEC] shadow-xl p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start border-b border-gray-100 pb-5 mb-5 flex-wrap gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded">{lang === 'kn' ? 'ಎಲ್ಲವೂ ಒಳಗೊಂಡಿರುವ ಆರಂಭಿಕ ಕಿಟ್' : 'All-Inclusive Starter Kit'}</span>
                    <h3 className="font-display font-bold text-2xl text-gray-900 mt-1.5">{lang === 'kn' ? `${franchisePrice} ಕ್ಕೆ ಎಲ್ಲವೂ ಲಭ್ಯವಿದೆ` : `Everything Included For ${franchisePrice}`}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-display font-extrabold text-gray-900">{franchisePrice}</span>
                    <span className="text-xs text-gray-400 block font-mono">{t.oneTimeText}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {franchiseIncludesArray.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-tight">
                      <span className="p-0.5 bg-green-50 rounded text-green-600 shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-green-500" />
                  {lang === 'kn' ? 'ವಿಶೇಷ ಪಟ್ಟಣದ ಹಕ್ಕುಗಳ ಗ್ಯಾರಂಟಿ' : 'Exclusive Town Rights Guaranteed'}
                </span>
                <a
                  href="#franchise-inquiry-form"
                  className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold text-center text-xs px-6 py-3.5 rounded-xl transition-all shadow"
                >
                  {lang === 'kn' ? 'ನಿಮ್ಮ ವಲಯವನ್ನು ಕಾಯ್ದಿರಿಸಿ' : 'Reserve Your Zone Now'}
                </a>
              </div>
            </div>

            {/* Package 2: Support (5 cols) */}
            <div className="lg:col-span-5 bg-[#111111] text-white rounded-[32px] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex justify-between items-start border-b border-white/10 pb-5 mb-5 flex-wrap gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider bg-orange-500/20 px-2.5 py-1 rounded">{lang === 'kn' ? 'ಬೇಡಿಕೆಯ ಮೇರೆಗೆ ನಿರ್ವಹಣೆ' : 'On-Demand Maintenance'}</span>
                    <h3 className="font-display font-bold text-xl text-white mt-1.5">{t.monthlySupportTitle}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-display font-extrabold text-[#FF6B00]">{supportPrice.startsWith('₹') ? '' : '₹'}{supportPrice}</span>
                    <span className="text-[10px] text-gray-400 block font-mono">{t.perMonthText}</span>
                  </div>
                </div>

                <div className="space-y-3.5 mb-8">
                  {monthlySupportArray.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-300 leading-tight">
                      <span className="p-0.5 bg-orange-500/20 rounded text-[#FF6B00] shrink-0 mt-0.5 border border-orange-500/30">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[11px] text-gray-400 leading-normal italic">
                  *{lang === 'kn' ? 'ತಿಂಗಳ ಬಿಲ್ಲಿಂಗ್. ಸಾಮಾನ್ಯ ನಿಬಂಧನೆಗಳು ಅನ್ವಯಿಸುತ್ತವೆ. ಈ ಅತ್ಯಂತ ಕಡಿಮೆ ಬೆಂಬಲ ಶುಲ್ಕವು ಸರ್ವರ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಗ್ರಾಫಿಕ್ಸ್ ಅಪ್‌ಡೇಟ್‌ಗಳನ್ನು ನೋಡಿಕೊಳ್ಳುತ್ತದೆ. ಇದರಿಂದ ನೀವು ಅಂಗಡಿಗಳೊಂದಿಗೆ ಮತ್ತು ರೈಡರ್‌ಗಳೊಂದಿಗೆ ಸಂಬಂಧ ಗಟ್ಟಿಗೊಳಿಸಲು ಗಮನಹರಿಸಬಹುದು.' : 'Billed monthly. Standard compliance applies. This nominal support fee handles server upkeep and graphic updates so you can focus entirely on local store relationships and rider coordination.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 9. STARTED IN GUNDLUPETE HIGHLIGHT */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFF8F3] border border-orange-100 rounded-[36px] p-8 md:p-12 relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Visual background badge */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-[#FF6B00]/5 to-transparent rounded-bl-full pointer-events-none" />

            <div className="shrink-0 w-20 h-20 md:w-28 md:h-28 bg-white border border-orange-100 rounded-[28px] flex items-center justify-center shadow-md">
              <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 text-[#FF6B00]">
                {/* Clean State Emblem representation / Karnataka maps graphic */}
                <path d="M 50 10 Q 75 10 75 35 Q 75 60 50 85 Q 25 60 25 35 Q 25 10 50 10 Z" fill="#FFF8F3" stroke="#FF6B00" strokeWidth="4" />
                <circle cx="50" cy="35" r="10" fill="#FF6B00" />
                <path d="M 40 55 Q 50 62 60 55" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-1.5 bg-white border border-orange-200 px-3 py-1 rounded-full text-[10px] font-bold text-[#FF6B00] uppercase tracking-wider font-mono">
                {t.gundlupeteBadge}
              </div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight">
                {t.gundlupeteTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.gundlupeteSub}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t.gundlupeteText1}
              </p>

              <div className="flex gap-4 items-center pt-2 text-xs font-mono font-bold text-gray-800">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {lang === 'kn' ? 'ನಮ್ಮ ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯ ಸಂಸ್ಥೆ' : 'Local Karnataka Platform'}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {lang === 'kn' ? 'ಸಣ್ಣ ಪಟ್ಟಣಗಳಿಗಾಗಿಯೇ ರೂಪಿಸಲಾಗಿದೆ' : 'Made for Small Towns'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 10. HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-gray-50 border-y border-[#ECECEC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-white border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಕಾರ್ಯಾಚರಣೆಯ ಹಂತಗಳು' : 'Operation Flow'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.howItWorksTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {t.howItWorksSub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {howItWorksArray.map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-[#ECECEC] p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between relative group"
              >
                {/* Horizontal flow line inside card */}
                <div className="absolute top-8 right-6 text-3xl font-display font-black text-orange-100/70 group-hover:text-orange-500/10 transition-colors">
                  {step.step}
                </div>

                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-full bg-[#FFF8F3] text-[#FF6B00] border border-orange-100 flex items-center justify-center font-mono font-bold text-xs">
                    {step.step}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-gray-900 group-hover:text-[#FF6B00] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                  <span>{lang === 'kn' ? 'ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಹಂತ' : 'Onboarding step'}</span>
                  <ChevronRight className="w-3 h-3 text-gray-300 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* 11. WHY THIS BUSINESS (FEATURES BLOCK WITH ICONS) */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-[#FFF8F3] border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಲಾಭದಾಯಕ ಅವಕಾಶಗಳು' : 'Lucrative Dynamics'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.whyThisBusinessTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              {t.whyThisBusinessSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Grid list */}
            <div className="space-y-6">
              {whyThisBusinessArray.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-gray-100 bg-[#FFF8F3]/30 hover:bg-[#FFF8F3]/70 hover:border-orange-100 transition-colors flex gap-4"
                >
                  <div className="p-2.5 bg-white border border-orange-100 rounded-xl text-[#FF6B00] shrink-0 h-fit shadow-sm">
                    {renderIcon(item.icon, "w-5 h-5")}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-base text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Narrative Callout */}
            <div className="bg-[#111111] text-white p-8 md:p-10 rounded-[36px] shadow-2xl relative overflow-hidden space-y-6">
              <div className="absolute right-0 bottom-0 w-44 h-44 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-tl-full pointer-events-none" />
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest block font-mono">{lang === 'kn' ? 'ಆಧುನಿಕ ಸಾಫ್ಟ್‌ವೇರ್ ಪ್ರಯೋಜನಗಳು' : 'Modern SaaS Advantage'}</span>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-white">
                  {lang === 'kn' ? 'ದೀರ್ಘಕಾಲದ ಪಟ್ಟಣದ ಬೆಳವಣಿಗೆಗೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ' : 'Designed for Long-term Town Growth'}
                </h3>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                {lang === 'kn' ? 'ಸ್ಪರ್ಧಾತ್ಮಕ ಮತ್ತು ಮಿತವ್ಯಯದ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕವನ್ನು ವಿಧಿಸುವ ಮೂಲಕ, ನಿಮ್ಮ ಸ್ಥಳೀಯ ಫ್ರಾಂಚೈಸ್ ವ್ಯಾಪಾರಿಗಳ ಮತ್ತು ಗ್ರಾಹಕರ ವಿಶ್ವಾಸವನ್ನು ಗೆಲ್ಲುತ್ತದೆ. ಬೃಹತ್ ಸಂಸ್ಥೆಗಳು ಜಾಹೀರಾತಿಗಾಗಿ ಭಾರಿ ವೆಚ್ಚ ಮಾಡುವಾಗ, ನೀವು ನಿಕಟ ಅಂಗಡಿ ಪಾಲುದಾರಿಕೆಗಳು ಮತ್ತು ವೈಯಕ್ತಿಕ ಪಟ್ಟಣದ ನೆಟ್‌ವರ್ಕ್ ಮೂಲಕ ಬೆಳೆಯುತ್ತೀರಿ.' : 'By charging a competitive and sustainable platform fee, your local franchise builds massive loyalty. While huge conglomerates burn cash on advertising, you grow through close store partnerships and personal town networks.'}
              </p>

              <div className="border-t border-white/10 pt-5 space-y-3.5">
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-0.5 bg-[#FF6B00] text-white rounded font-bold">✓</div>
                  <span>{lang === 'kn' ? 'ಒಂದೇ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ - ೧೦ಕ್ಕೂ ಹೆಚ್ಚು ಡೆಲಿವರಿ ವಿಭಾಗಗಳು' : 'One Platform - 10+ Delivery Categories'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-0.5 bg-[#FF6B00] text-white rounded font-bold">✓</div>
                  <span>{lang === 'kn' ? 'ಮನೆಯಲ್ಲೇ ಕುಳಿತುಕೊಂಡು ಇಡೀ ಪಟ್ಟಣಕ್ಕೆ ಸೇವೆ ನೀಡಿ' : 'Serve your entire town from your living room'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="p-0.5 bg-[#FF6B00] text-white rounded font-bold">✓</div>
                  <span>{lang === 'kn' ? 'ಸ್ಥಳೀಯ ಅಂಗಡಿಗಳ ಡೆಲಿವರಿಗಳಿಂದ ಉತ್ತಮ ಕಮಿಷನ್ ಗಳಿಸಿ' : 'Earn commission from local store deliveries'}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-white transition-colors"
                >
                  {lang === 'kn' ? 'ನಮ್ಮ ವಿಸ್ತರಣಾ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Consult Our Expansion Experts'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 12. COMMISSION STRUCTURE (PROFESSIONAL SECTION) */}
      <section className="py-16 md:py-20 bg-gray-50 border-y border-[#ECECEC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#ECECEC] rounded-3xl p-6 md:p-8 shadow-sm text-center space-y-5">
            <div className="inline-flex p-3 bg-[#FFF8F3] border border-orange-100 rounded-2xl text-[#FF6B00] mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl md:text-2xl text-gray-900">
                {lang === 'kn' ? 'ಪಾರದರ್ಶಕ ಕಮಿಷನ್ ರಚನೆ' : 'Transparent Commission Structure'}
              </h3>
              <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                {lang === 'kn' ? 'ನಮ್ಮ ಪ್ರಮುಖ ಕಮಿಷನ್ ಮಾದರಿಯನ್ನು ಸ್ಥಳೀಯ ಫ್ರಾಂಚೈಸ್ ಪಾಲುದಾರರಿಗೆ ಕೈಗೆಟುಕುವಂತೆ ಮತ್ತು ದೀರ್ಘಕಾಲದ ಯಶಸ್ಸಿಗೆ ಪೂರಕವಾಗುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ವರ್ಷದಿಂದ ವರ್ಷಕ್ಕೆ ಲಾಭದಾಯಕವಾಗಿ ಬೆಳೆಯಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.' : 'Our core commission model is designed to be affordable and sustainable for local franchise partners. We aim to keep commissions highly competitive while equipping franchise owners to grow profitably year-over-year.'}
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-[#FFF8F3] border border-orange-100 rounded-xl text-left flex gap-3">
              <Info className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-normal">
                {lang === 'kn' ? 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಫೋನ್ ಅಥವಾ ವಾಟ್ಸಾಪ್ ಸಮಾಲೋಚನೆಯ ಸಮಯದಲ್ಲಿ, ನಮ್ಮ ತಂಡವು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಶುಲ್ಕ ಹಂಚಿಕೆಗಳು, ಸ್ಥಳೀಯ ಮಾರ್ಕೆಟಿಂಗ್ ಸೂತ್ರಗಳು ಮತ್ತು ಸಾಮಾನ್ಯ ಉದ್ಯಮ ನಿಯತಾಂಕಗಳನ್ನು ಸರಳವಾದ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸುತ್ತದೆ.' : 'During your personalized phone or WhatsApp consultation, our team will explain the complete platform charge splits, local marketing formulas, and general business parameters in plain English and Kannada.'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* 13. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-[#FFF8F3] border border-orange-100 px-3 py-1 rounded-full">
              {lang === 'kn' ? 'ಸ್ಪಷ್ಟೀಕರಣಗಳು' : 'Clarifications'}
            </span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
              {t.faqTitle}
            </h2>
            <p className="text-gray-600 text-sm">
              {t.faqSub}
            </p>
          </div>

          <div className="space-y-3">
            {faqsArray.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-[#ECECEC] overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 md:p-6 font-display font-bold text-sm md:text-base text-gray-900 hover:text-[#FF6B00] transition-colors flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className={`shrink-0 p-1 rounded-full ${isOpen ? 'bg-orange-50 text-[#FF6B00]' : 'bg-gray-50 text-gray-400'}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50 animate-[fadeIn_0.15s_ease-out]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* 14. LIVE DISTRICT LEADS REGISTRY CONSOLE PANEL (CAN BE TOGGLED/ACCESSED) */}
      <section className="py-12 bg-gray-50 border-t border-[#ECECEC]" id="leads-registry-panel">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display font-bold text-xl text-gray-900">
                {lang === 'kn' ? 'ಸಕ್ರಿಯ ವಿಸ್ತರಣಾ ಸ್ಥಿತಿ ನಕ್ಷೆ' : 'Interactive Expansion Status Map'}
              </h3>
              <p className="text-xs text-gray-500">
                {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಇತರ ಪಟ್ಟಣಗಳಿಂದ ಅರ್ಜಿದಾರರ ಹರಿವನ್ನು ಲೈವ್ ಆಗಿ ವೀಕ್ಷಿಸಿ.' : 'Witness real-time applicant flow from other towns across Karnataka.'}
              </p>
            </div>
            
            <button
              onClick={() => setShowAdminConsole(!showAdminConsole)}
              className="px-4 py-2 text-xs font-semibold bg-white border border-gray-200 hover:border-orange-200 text-[#FF6B00] rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {showAdminConsole 
                ? (lang === 'kn' ? 'ರಿಜಿಸ್ಟ್ರಿ ಪ್ಯಾನಲ್ ಮರೆಮಾಡಿ' : 'Hide Registry Panel') 
                : (lang === 'kn' ? 'ಲೈವ್ ನೋಂದಣಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View Live Registrations')}
            </button>
          </div>

          {showAdminConsole && (
            <div className="animate-[slideUp_0.3s_ease-out]">
              <LeadCenter inquiryCountTrigger={inquiryTrigger} lang={lang} />
            </div>
          )}
        </div>
      </section>


      {/* 15. CONTACT & OWNER PORTRAIT / FORM INTEGRATION SECTION */}
      <section id="contact" className="py-20 md:py-28 bg-white relative">
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500/5 rounded-tl-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Details & Sujith Details (5 cols) */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-[#FFF8F3] border border-orange-100 px-3 py-1 rounded-full block w-fit">
                    {lang === 'kn' ? 'ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಪ್ರಧಾನ ಕಚೇರಿ' : 'Onboarding HQ'}
                  </span>
                  <h2 className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight leading-tight">
                    {t.contactTitle}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t.contactSub}
                  </p>
                </div>

                {/* Owner details card */}
                <div className="p-5 rounded-3xl border border-orange-100 bg-[#FFF8F3]/60 shadow-sm space-y-4">
                  <div className="flex items-center gap-4">
                    {/* Stylized Avatar illustration */}
                    <div className="w-14 h-14 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center font-display font-extrabold text-lg shadow-md shrink-0">
                      SU
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-gray-900 text-base leading-tight">Sujith</h4>
                      <p className="text-xs text-[#FF6B00] font-medium font-mono mt-0.5">{lang === 'kn' ? 'ಸ್ಥಾಪಕರು ಮತ್ತು ತಾಂತ್ರಿಕ ಮುಖ್ಯಸ್ಥರು' : 'Founder & Technical Lead'}</p>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-orange-100/50 text-xs font-sans text-gray-700">
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">{lang === 'kn' ? 'ಕರೆ ಸಹಾಯ' : 'Call Support'}</span>
                      <a href={CONTACT_INFO.callLink} className="font-mono font-bold text-gray-900 hover:text-[#FF6B00] hover:underline">
                        +91 95387 55904
                      </a>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">{lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಸಹಾಯ' : 'WhatsApp Support'}</span>
                      <a href={CONTACT_INFO.whatsappLink} className="font-mono font-bold text-[#25D366] hover:underline">
                        +91 95387 55904
                      </a>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-gray-400">{lang === 'kn' ? 'ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್ ಖಾತೆ' : 'Owner Instagram'}</span>
                      <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="font-mono font-medium text-gray-900 hover:text-orange-500 hover:underline flex items-center gap-1">
                        @linux_sujith
                        <Instagram className="w-3.5 h-3.5 text-pink-600" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Local indicators */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span>
                      <strong>Gundlupete HQ:</strong> {lang === 'kn' ? 'ಗುಂಡ್ಲುಪೇಟೆ, ಚಾಮರಾಜನಗರ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕದಿಂದ ಕಾರ್ಯಾಚರಣೆ.' : 'Operations based in Gundlupete, Chamarajanagar District, Karnataka.'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{lang === 'kn' ? 'ಮೊದಲು ಬಂದವರಿಗೆ ಮೊದಲ ಆದ್ಯತೆ ವಲಯ ಮೀಸಲಾತಿ ನಿಯಮ.' : 'First-come, first-served zone reservation protocol.'}</span>
                  </div>
                </div>
              </div>

              {/* Action Contact buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <a
                  href={CONTACT_INFO.callLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-semibold text-xs px-5 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 fill-white" />
                  {lang === 'kn' ? 'ಈಗಲೇ ಕರೆ ಮಾಡಿ' : 'Call Now'}
                </a>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white font-display font-semibold text-xs px-5 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  {lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಸಂದೇಶ' : 'WhatsApp'}
                </a>
              </div>

            </div>

            {/* Franchise Application Form (7 cols) */}
            <div className="lg:col-span-7">
              <InquiryForm onSuccessSubmit={handleInquirySubmit} lang={lang} />
            </div>

          </div>
        </div>
      </section>


      {/* 16. FINAL CALL TO ACTION (CTA) */}
      <section className="py-20 md:py-28 bg-[#111111] text-white relative overflow-hidden text-center border-t border-white/5">
        <div className="absolute inset-0 radial-glow opacity-25 pointer-events-none" />
        <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
          
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest font-mono bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full inline-block">
              {lang === 'kn' ? 'ತಕ್ಷಣದ ಪ್ರವೇಶ ಅವಕಾಶ' : 'Immediate Onboarding Opportunity'}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {lang === 'kn' ? (
                <>ನಿಮ್ಮ ಪಟ್ಟಣಕ್ಕೆ <br />ನಂಬಿಕಸ್ಥ ಡೆಲಿವರಿ ಬ್ರ್ಯಾಂಡ್ ಆಗಿ</>
              ) : (
                <>Become the Delivery Brand <br />For Your Town</>
              )}
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {lang === 'kn' ? 'ಸ್ವಂತ ಡೆಲಿವರಿ ಉದ್ಯಮವನ್ನು ಪ್ರಾರಂಭಿಸಿ. ಮನೆಯಿಂದಲೇ ನಿರ್ವಹಿಸಿ. ಸ್ಥಳೀಯ ಅಂಗಡಿಗಳಿಗೆ ಸೇವೆ ನೀಡಿ. ಸ್ಥಳೀಯ ಉದ್ಯೋಗಗಳನ್ನು ಸೃಷ್ಟಿಸಿ. ನಿಮ್ಮ ಸಮುದಾಯದೊಂದಿಗೆ ಬೆಳೆಯಿರಿ.' : 'Build your own delivery business. Operate from home. Serve local shops. Create employment. Grow with your community.'}
            </p>
          </div>

          <p className="text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {lang === 'kn' ? 'ನೀವು ವಿದ್ಯಾರ್ಥಿ, ಉದ್ಯೋಗಿ, ಗೃಹಿಣಿ, ಉದ್ಯಮಿ ಅಥವಾ ವಿಶ್ವಾಸಾರ್ಹ ಪಕ್ಕದ ವ್ಯಾಪಾರವನ್ನು ಹುಡುಕುತ್ತಿರುವ ಯಾರೇ ಆಗಿರಲಿ, ಗ್ರ್ಯಾಬಿಟೊ ನಿಮಗೆ ಆಧುನಿಕ ಸ್ಥಳೀಯ ಡೆಲಿವರಿ ವೇದಿಕೆಯನ್ನು ನಿರ್ಮಿಸುವ ಅವಕಾಶವನ್ನು ನೀಡುತ್ತದೆ. ಫ್ರಾಂಚೈಸ್ ಪ್ರಕ್ರಿಯೆ, ಕಮಿಷನ್ ರಚನೆ, ಆನ್‌ಬೋರ್ಡಿಂಗ್ ಮತ್ತು ತಾಂತ್ರಿಕ ಬೆಂಬಲದ ಬಗ್ಗೆ ತಿಳಿಯಲು ಇಂದು ನಮ್ಮ ತಂಡದೊಂದಿಗೆ ಮಾತನಾಡಿ.' : 'Whether you are a student, working professional, homemaker, entrepreneur, or someone looking for a reliable side business, Grabito gives you the opportunity to build a modern local delivery platform. Talk to our team today to learn about the franchise process, commission structure, onboarding, and support.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#franchise-inquiry-form"
              className="w-full sm:w-auto bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:translate-y-[-1px] transform active:scale-[0.98]"
            >
              {lang === 'kn' ? 'ಪ್ರದೇಶಕ್ಕಾಗಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : 'Apply For Territory'}
            </a>
            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-sm px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
              {lang === 'kn' ? 'ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ನೇರವಾಗಿ ಚಾಟ್ ಮಾಡಿ' : 'Chat Directly on WhatsApp'}
            </a>
          </div>

          <div className="pt-6 text-[11px] text-gray-500 font-mono">
            {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ೩೧ ಜಿಲ್ಲೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ. ಯಾವುದೇ ತಾಂತ್ರಿಕ ಅನುಭವದ ಅಗತ್ಯವಿಲ್ಲ.' : 'Available across all 31 districts of Karnataka. No technical experience required.'}
          </div>

        </div>
      </section>


      {/* 17. FOOTER */}
      <footer className="bg-white border-t border-[#ECECEC] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Logo and Slogan Column (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <Logo theme="light" showSlogan={true} lang={lang} />
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
                {lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಸ್ವದೇಶಿ ಹೈಪರ್‌ಲೋಕಲ್ ಮಲ್ಟಿ-ಕ್ಯಾಟಗರಿ ಡೆಲಿವರಿ ನೆಟ್‌ವರ್ಕ್. ಆಧುನಿಕ ಸಾಫ್ಟ್‌ವೇರ್ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ಪಟ್ಟಣಗಳನ್ನು ಮತ್ತು ಸ್ಥಳೀಯ ಉದ್ಯಮಿಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುತ್ತಿದೆ.' : 'Karnataka\'s homegrown hyperlocal multi-category delivery network. Empowering towns and local entrepreneurs through modern SaaS technology.'}
              </p>
            </div>

            {/* Quick Links Column (4 cols) */}
            <div className="md:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono mb-3.5">
                  {lang === 'kn' ? 'ನ್ಯಾವಿಗೇಷನ್' : 'Navigation'}
                </h5>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  <li>
                    <a href="#home" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಮುಖಪುಟ' : 'Home'}</a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಸೇವೆಗಳು' : 'Services'}</a>
                  </li>
                  <li>
                    <a href="#benefits" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಪ್ರಯೋಜನಗಳು' : 'Benefits'}</a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಫ್ರಾಂಚೈಸ್' : 'Franchise'}</a>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono mb-3.5">
                  {lang === 'kn' ? 'ಸಂಪನ್ಮೂಲಗಳು' : 'Resources'}
                </h5>
                <ul className="space-y-2 text-xs font-semibold text-gray-700">
                  <li>
                    <a href="#profit-calculator" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಲಾಭದ ಕ್ಯಾಲ್ಕುಲೇಟರ್' : 'Earnings Tool'}</a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಪ್ರಶ್ನೋತ್ತರಗಳು' : 'FAQ Accordion'}</a>
                  </li>
                  <li>
                    <a href="#leads-registry-panel" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಅರ್ಜಿಗಳ ಪಟ್ಟಿ' : 'Lead Console'}</a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-[#FF6B00] transition-colors">{lang === 'kn' ? 'ಸುಜಿತ್ ಸಂಪರ್ಕಿಸಿ' : 'Contact Sujith'}</a>
                  </li>
                  <li>
                    <button onClick={() => setIsAdminOpen(true)} className="hover:text-[#FF6B00] text-[#FF6B00] transition-colors cursor-pointer text-left font-bold block">🔒 {lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಲಾಗಿನ್' : 'Admin Login'}</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Support Owner Contact Column (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider font-mono">
                {lang === 'kn' ? 'ಸಂಪರ್ಕಿಸಿ' : 'Get In Touch'}
              </h5>
              
              <div className="space-y-2.5 text-xs text-gray-600">
                <p>
                  <strong>{lang === 'kn' ? 'ಸಂಸ್ಥಾಪಕರು:' : 'Owner:'}</strong> Sujith
                </p>
                <p>
                  <strong>{lang === 'kn' ? 'ಫೋನ್ / ವಾಟ್ಸಾಪ್:' : 'Phone / WhatsApp:'}</strong> +91 95387 55904
                </p>
                <p>
                  <strong>{lang === 'kn' ? 'ಮುಖ್ಯ ಕಚೇರಿ:' : 'HQ:'}</strong> Gundlupete, Chamarajanagar District, Karnataka - 571111
                </p>
              </div>

              {/* Social Link Icon buttons */}
              <div className="flex gap-2.5">
                <a
                  href={CONTACT_INFO.callLink}
                  className="p-2 bg-gray-100 hover:bg-[#FF6B00] hover:text-white rounded-lg text-gray-600 transition-colors"
                  title={lang === 'kn' ? 'ಸುಜಿತ್‌ಗೆ ಕರೆ ಮಾಡಿ' : 'Call Sujith'}
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-gray-100 hover:bg-[#25D366] hover:text-white rounded-lg text-gray-600 transition-colors"
                  title={lang === 'kn' ? 'ಸುಜಿತ್ ಅವರೊಂದಿಗೆ ವಾಟ್ಸಾಪ್ ಮಾಡಿ' : 'WhatsApp Sujith'}
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-gray-100 hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-500 hover:text-white rounded-lg text-gray-600 transition-colors"
                  title={lang === 'kn' ? 'ಸುಜಿತ್ ಅವರನ್ನು ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ ಫಾಲೋ ಮಾಡಿ' : 'Follow Sujith on Instagram'}
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Copyright Line */}
          <div className="pt-8 border-t border-[#ECECEC] flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
            <p className="flex items-center gap-1.5 flex-wrap">
              <span>© 2026 Grabito. {lang === 'kn' ? 'ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.' : 'All Rights Reserved.'}</span>
              <span className="text-gray-200">•</span>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-orange-500 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                title="Sujith's Admin Portal"
              >
                🔒 Admin Access
              </button>
            </p>
            <div className="flex gap-4 font-semibold text-gray-500">
              <span className="hover:text-[#FF6B00] transition-colors cursor-default">{lang === 'kn' ? 'ಕರ್ನಾಟಕದಲ್ಲಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ' : 'Designed in Karnataka'}</span>
              <span className="text-gray-200">|</span>
              <span className="hover:text-[#FF6B00] transition-colors cursor-default">{lang === 'kn' ? 'ಆಧುನಿಕ ಹೈಪರ್‌ಲೋಕಲ್ ಲಾಜಿಸ್ಟಿಕ್ಸ್' : 'Modern Hyperlocal Logistics'}</span>
            </div>
          </div>

        </div>
      </footer>


      {/* 18. FLOATING QUICK-ACTION BUTTONS */}
      {/* Floating Call Button on Bottom Left */}
      <a
        href={CONTACT_INFO.callLink}
        className="fixed bottom-6 left-6 z-40 bg-[#FF6B00] hover:bg-[#E05E00] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center border border-white/20 animate-bounce"
        style={{ animationDuration: '3s' }}
        title={lang === 'kn' ? 'ಸುಜಿತ್ ಅವರಿಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ' : 'Call Sujith Directly'}
      >
        <Phone className="w-5 h-5 fill-white" />
      </a>

      {/* Floating WhatsApp Button on Bottom Right */}
      <a
        href={CONTACT_INFO.whatsappLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE57] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-90 transition-all flex items-center justify-center border border-white/20"
        title={lang === 'kn' ? 'ವಾಟ್ಸಾಪ್ ಚಾಟ್' : 'Chat on WhatsApp'}
      >
        <MessageCircle className="w-5 h-5 fill-white" />
      </a>

      {/* 19. ADMIN PANEL PORTAL LAYER */}
      <AdminPanel 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        lang={lang}
        onPriceChange={() => {
          setFranchisePrice(localStorage.getItem('grabito_franchise_price') || '₹5,999');
          setSupportPrice(localStorage.getItem('grabito_support_price') || '₹199');
        }}
        onInquiryChange={() => {
          setInquiryTrigger(prev => prev + 1);
        }}
      />

    </div>
  );
}
