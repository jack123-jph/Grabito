import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Shield, AlertCircle, Save, Check, Trash2, Edit3, 
  Plus, X, RefreshCw, Phone, MessageCircle, MapPin, Search, Calendar,
  TrendingUp, Award, Users, Database, HelpCircle
} from 'lucide-react';
import { FranchiseInquiry } from '../types';
import { KARNATAKA_DISTRICTS } from '../data';

// Helper to get initial inquiries
const DEFAULT_INQUIRIES: FranchiseInquiry[] = [
  {
    id: "inq-gund-01",
    name: "Sujith M. L.",
    phone: "95387XXXXX",
    whatsapp: "95387XXXXX",
    town: "Gundlupete",
    district: "Chamarajanagar",
    background: "Courier Operator",
    investmentReady: true,
    message: "Grabito headquarters town. Operations fully active and expanding locally.",
    status: 'approved',
    createdAt: new Date(Date.now() - 2592000000).toISOString()
  },
  {
    id: "inq-nanj-02",
    name: "Kiran Gowda",
    phone: "98452XXXXX",
    whatsapp: "98452XXXXX",
    town: "Nanjangud",
    district: "Mysuru",
    background: "Small Business Owner",
    investmentReady: true,
    message: "Strong network of local tea estates and restaurants ready to onboard.",
    status: 'approved',
    createdAt: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: "inq-chamar-03",
    name: "Shruthi Patel",
    phone: "70195XXXXX",
    whatsapp: "70195XXXXX",
    town: "Chamarajanagar",
    district: "Chamarajanagar",
    background: "Women Entrepreneur",
    investmentReady: true,
    message: "Interested in organizing student delivery teams from college campus.",
    status: 'approved',
    createdAt: new Date(Date.now() - 432000000).toISOString()
  },
  {
    id: "inq-kolar-04",
    name: "Ranganath Swamy",
    phone: "88612XXXXX",
    whatsapp: "88612XXXXX",
    town: "Mulbagal",
    district: "Kolar",
    background: "Existing Shop Owner",
    investmentReady: true,
    message: "Already run a high volume kirana shop. Ready to digitize the entire street.",
    status: 'contacted',
    createdAt: new Date(Date.now() - 21600000).toISOString()
  }
];

interface AdminPanelProps {
  onPriceChange: () => void;
  onInquiryChange: () => void;
  isOpen: boolean;
  onClose: () => void;
  lang?: 'en' | 'kn';
}

export default function AdminPanel({ onPriceChange, onInquiryChange, isOpen, onClose, lang = 'en' }: AdminPanelProps) {
  // Login credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('grabito_admin_logged') === 'true';
  });
  const [error, setError] = useState('');

  // Editing state for prices
  const [franchisePrice, setFranchisePrice] = useState(() => {
    return localStorage.getItem('grabito_franchise_price') || '₹5,999';
  });
  const [supportPrice, setSupportPrice] = useState(() => {
    return localStorage.getItem('grabito_support_price') || '₹199';
  });

  // Leads list in Admin console
  const [allLeads, setAllLeads] = useState<FranchiseInquiry[]>([]);
  const [searchLeadQuery, setSearchLeadQuery] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('All');

  // Custom non-blocking notification and delete confirmations
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);

  const showNotification = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };
  
  // Custom lead modal adding state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadTown, setNewLeadTown] = useState('');
  const [newLeadDistrict, setNewLeadDistrict] = useState('Chamarajanagar');
  const [newLeadBackground, setNewLeadBackground] = useState('Courier Operator');
  const [newLeadReady, setNewLeadReady] = useState(true);
  const [newLeadMessage, setNewLeadMessage] = useState('');

  // Editing single lead state
  const [editingLead, setEditingLead] = useState<FranchiseInquiry | null>(null);
  const [editLeadName, setEditLeadName] = useState('');
  const [editLeadPhone, setEditLeadPhone] = useState('');
  const [editLeadTown, setEditLeadTown] = useState('');
  const [editLeadDistrict, setEditLeadDistrict] = useState('Chamarajanagar');
  const [editLeadBackground, setEditLeadBackground] = useState('Courier Operator');
  const [editLeadReady, setEditLeadReady] = useState(true);
  const [editLeadMessage, setEditLeadMessage] = useState('');
  const [editLeadStatus, setEditLeadStatus] = useState<'approved' | 'contacted' | 'new'>('new');

  // Sync / Load leads list
  const loadLeads = () => {
    try {
      const storedAll = localStorage.getItem('grabito_all_inquiries');
      if (storedAll) {
        setAllLeads(JSON.parse(storedAll));
      } else {
        // First initialization
        const storedUser = localStorage.getItem('grabito_inquiries');
        const userLeads = storedUser ? JSON.parse(storedUser) : [];
        const combined = [...userLeads, ...DEFAULT_INQUIRIES];
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
        localStorage.setItem('grabito_all_inquiries', JSON.stringify(unique));
        setAllLeads(unique);
      }
    } catch (err) {
      setAllLeads(DEFAULT_INQUIRIES);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Authentication
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'sujithpurmesh2244@gmail.com' && password === 'linuxsujith') {
      setIsLoggedIn(true);
      localStorage.setItem('grabito_admin_logged', 'true');
      setError('');
      loadLeads();
    } else {
      setError(lang === 'kn' ? 'ತಪ್ಪು ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್!' : 'Invalid email or password! Only Sujith can access.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('grabito_admin_logged');
    setEmail('');
    setPassword('');
  };

  // Save Pricing configurations
  const handleSavePrices = () => {
    localStorage.setItem('grabito_franchise_price', franchisePrice.trim());
    localStorage.setItem('grabito_support_price', supportPrice.trim());
    onPriceChange();
    showNotification(
      lang === 'kn' ? 'ಬೆಲೆಗಳ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!' : 'Prices updated successfully and published on the live website!',
      'success'
    );
  };

  // Change individual inquiry status
  const handleUpdateStatus = (leadId: string, newStatus: 'approved' | 'contacted' | 'new') => {
    const updated = allLeads.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: newStatus };
      }
      return lead;
    });
    setAllLeads(updated);
    localStorage.setItem('grabito_all_inquiries', JSON.stringify(updated));
    onInquiryChange();
    showNotification(
      lang === 'kn' ? 'ಅರ್ಜಿಯ ಸ್ಥಿತಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಯಿಸಲಾಗಿದೆ.' : 'Application status updated successfully.',
      'success'
    );
  };

  // Confirm Delete Lead
  const confirmDeleteLead = (leadId: string) => {
    const filtered = allLeads.filter(lead => lead.id !== leadId);
    setAllLeads(filtered);
    localStorage.setItem('grabito_all_inquiries', JSON.stringify(filtered));
    
    // Also sync back to grabito_inquiries
    try {
      const storedUser = localStorage.getItem('grabito_inquiries');
      if (storedUser) {
        const userLeads = JSON.parse(storedUser) as FranchiseInquiry[];
        const updatedUser = userLeads.filter(lead => lead.id !== leadId);
        localStorage.setItem('grabito_inquiries', JSON.stringify(updatedUser));
      }
    } catch (err) {}

    setDeletingLeadId(null);
    onInquiryChange();
    showNotification(
      lang === 'kn' ? 'ಅರ್ಜಿಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ತೆಗೆದುಹಾಕಲಾಗಿದೆ.' : 'Registration deleted successfully.',
      'info'
    );
  };

  // Start Editing a specific lead
  const handleStartEdit = (lead: FranchiseInquiry) => {
    setEditingLead(lead);
    setEditLeadName(lead.name);
    setEditLeadPhone(lead.phone);
    setEditLeadTown(lead.town);
    setEditLeadDistrict(lead.district);
    setEditLeadBackground(lead.background);
    setEditLeadReady(lead.investmentReady ?? true);
    setEditLeadMessage(lead.message || '');
    setEditLeadStatus(lead.status);
  };

  // Save the Edited Lead details
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    if (!editLeadName || !editLeadPhone || !editLeadTown) {
      showNotification(
        lang === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕಡ್ಡಾಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' : 'Please fill all required fields.',
        'error'
      );
      return;
    }

    const updated = allLeads.map(lead => {
      if (lead.id === editingLead.id) {
        return {
          ...lead,
          name: editLeadName,
          phone: editLeadPhone,
          whatsapp: editLeadPhone,
          town: editLeadTown,
          district: editLeadDistrict,
          background: editLeadBackground,
          investmentReady: editLeadReady,
          message: editLeadMessage,
          status: editLeadStatus
        };
      }
      return lead;
    });

    setAllLeads(updated);
    localStorage.setItem('grabito_all_inquiries', JSON.stringify(updated));

    // Also sync back to grabito_inquiries for deep local consistency
    try {
      const storedUser = localStorage.getItem('grabito_inquiries');
      if (storedUser) {
        const userLeads = JSON.parse(storedUser) as FranchiseInquiry[];
        const updatedUser = userLeads.map(lead => {
          if (lead.id === editingLead.id) {
            return {
              ...lead,
              name: editLeadName,
              phone: editLeadPhone,
              whatsapp: editLeadPhone,
              town: editLeadTown,
              district: editLeadDistrict,
              background: editLeadBackground,
              investmentReady: editLeadReady,
              message: editLeadMessage,
              status: editLeadStatus
            };
          }
          return lead;
        });
        localStorage.setItem('grabito_inquiries', JSON.stringify(updatedUser));
      }
    } catch (err) {}

    onInquiryChange();
    setEditingLead(null);
    showNotification(
      lang === 'kn' ? 'ವಲಯ ಅರ್ಜಿಯ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!' : 'Territory details updated and published successfully!',
      'success'
    );
  };

  // Add custom manual lead via Admin Console
  const handleAddCustomLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName || !newLeadPhone || !newLeadTown) {
      showNotification(
        lang === 'kn' ? 'ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.' : 'Please fill all fields.',
        'error'
      );
      return;
    }

    const createdLead: FranchiseInquiry = {
      id: 'inq-' + Math.random().toString(36).substr(2, 9),
      name: newLeadName,
      phone: newLeadPhone,
      whatsapp: newLeadPhone,
      town: newLeadTown,
      district: newLeadDistrict,
      background: newLeadBackground,
      investmentReady: newLeadReady,
      message: newLeadMessage,
      status: 'approved', // Auto-approved when entered by Admin
      createdAt: new Date().toISOString()
    };

    const updated = [createdLead, ...allLeads];
    setAllLeads(updated);
    localStorage.setItem('grabito_all_inquiries', JSON.stringify(updated));
    
    // Also add to grabito_inquiries for backward syncing
    try {
      const storedUser = localStorage.getItem('grabito_inquiries');
      const userLeads = storedUser ? JSON.parse(storedUser) : [];
      userLeads.unshift(createdLead);
      localStorage.setItem('grabito_inquiries', JSON.stringify(userLeads));
    } catch (e) {}

    onInquiryChange();
    setIsAddModalOpen(false);

    // Reset fields
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadTown('');
    setNewLeadMessage('');
    showNotification(
      lang === 'kn' ? 'ಹೊಸ ಲೈವ್ ವಲಯವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸೇರಿಸಲಾಗಿದೆ!' : 'New Live Territory Registration published successfully!',
      'success'
    );
  };

  // Unique districts in current leads
  const districts = ['All', ...KARNATAKA_DISTRICTS];

  // Filtering for admin table view
  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchLeadQuery.toLowerCase()) || 
                          lead.town.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
                          lead.id.toLowerCase().includes(searchLeadQuery.toLowerCase());
    const matchesDistrict = filterDistrict === 'All' || lead.district === filterDistrict;
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="fixed inset-0 bg-[#111111]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-[32px] w-full max-w-5xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] animate-[slideUp_0.3s_ease-out]">
        
        {/* Modal Header */}
        <div className="bg-[#111111] text-white p-6 flex justify-between items-center shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-xl tracking-tight">
                {lang === 'kn' ? 'ಗ್ರಾಬಿಟೊ ಅಡ್ಮಿನ್ ನಿಯಂತ್ರಣ ಮಂಡಳಿ' : 'Grabito Admin Console'}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {lang === 'kn' ? 'ಸುಜಿತ್ ಪರ್ಮೆಶ್ ಅವರಿಗೆ ಮಾತ್ರ ಪ್ರತ್ಯೇಕ ನಿಯಂತ್ರಣ' : 'Exclusive portal for Sujith Purmesh'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Non-blocking Notification Alert Bar */}
        {notification && (
          <div className={`p-4 text-xs font-semibold flex items-center gap-2.5 transition-all animate-[slideDown_0.2s_ease-out] shrink-0 border-b ${
            notification.type === 'error' 
              ? 'bg-red-50 text-red-700 border-red-100' 
              : notification.type === 'info'
              ? 'bg-blue-50 text-blue-700 border-blue-100'
              : 'bg-green-50 text-green-700 border-green-100'
          }`}>
            <span className="w-2 h-2 rounded-full animate-pulse bg-current shrink-0" />
            <span className="flex-1">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-700 font-bold px-1.5 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Not Logged In View */}
        {!isLoggedIn ? (
          <div className="p-8 md:p-12 flex flex-col items-center justify-center space-y-6 max-w-md mx-auto my-auto py-16">
            <div className="p-4 bg-orange-50 rounded-full border border-orange-100 text-[#FF6B00]">
              <Lock className="w-10 h-10" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="font-display font-bold text-lg text-gray-900">
                {lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಲಾಗಿನ್ ಅಗತ್ಯವಿದೆ' : 'Admin Credentials Required'}
              </h3>
              <p className="text-xs text-gray-500">
                {lang === 'kn' ? 'ಲೈವ್ ರಿಜಿಸ್ಟ್ರಿ ಮತ್ತು ದರಗಳನ್ನು ಬದಲಾಯಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.' : 'Enter credentials to edit live prices and manage territory bookings.'}
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">{lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಇಮೇಲ್' : 'Admin Email'}</label>
                <input
                  type="email"
                  required
                  placeholder="sujithpurmesh2244@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">{lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'Password'}</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Unlock className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಅಡ್ಮಿನ್ ಪ್ರವೇಶ ಸಕ್ರಿಯಗೊಳಿಸಿ' : 'Unlock Dashboard'}</span>
              </button>
            </form>
          </div>
        ) : (
          /* Logged In View */
          <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Left Sidebar: Controls & Pricing */}
            <div className="md:w-80 p-6 space-y-6 shrink-0 bg-gray-50/50">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200/60">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span>{lang === 'kn' ? 'ಅಡ್ಮಿನ್: ಸುಜಿತ್ ಪರ್ಮೆಶ್' : 'Admin Active: Sujith'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {lang === 'kn' ? 'ನಿರ್ಗಮಿಸಿ' : 'Log Out'}
                </button>
              </div>

              {/* Pricing section */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
                  {lang === 'kn' ? 'ವೆಬ್‌ಸೈಟ್ ಶುಲ್ಕಗಳ ಬದಲಾವಣೆ' : 'Website Price Settings'}
                </h4>

                <div className="space-y-3 p-4 bg-white border border-gray-200/80 rounded-2xl shadow-xs">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 block">
                      {lang === 'kn' ? 'ಫ್ರಾಂಚೈಸ್ ಲೈಸೆನ್ಸ್ ಶುಲ್ಕ' : 'Franchise Setup Fee'}
                    </label>
                    <input
                      type="text"
                      value={franchisePrice}
                      onChange={(e) => setFranchisePrice(e.target.value)}
                      placeholder="e.g. ₹5,999"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#FF6B00] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-gray-600 block">
                      {lang === 'kn' ? 'ತಿಂಗಳ ನಿರ್ವಹಣಾ ಶುಲ್ಕ' : 'Monthly Support Fee'}
                    </label>
                    <input
                      type="text"
                      value={supportPrice}
                      onChange={(e) => setSupportPrice(e.target.value)}
                      placeholder="e.g. ₹199"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold focus:bg-white focus:outline-none focus:border-[#FF6B00] transition-all"
                    />
                  </div>

                  <button
                    onClick={handleSavePrices}
                    className="w-full mt-2 bg-[#111111] hover:bg-orange-600 hover:text-white text-gray-300 font-semibold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{lang === 'kn' ? 'ದರಗಳನ್ನು ನವೀಕರಿಸಿ' : 'Publish New Prices'}</span>
                  </button>
                </div>
              </div>

              {/* Quick statistics */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-gray-400">
                  {lang === 'kn' ? 'ತ್ವರಿತ ಅಂಕಿಅಂಶಗಳು' : 'Registry Overview'}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 border border-gray-200/80 rounded-xl text-center">
                    <span className="text-[10px] text-gray-400 block">{lang === 'kn' ? 'ಒಟ್ಟು ನೋಂದಣಿ' : 'Total Leads'}</span>
                    <span className="font-display font-extrabold text-lg text-gray-900">{allLeads.length}</span>
                  </div>
                  <div className="bg-white p-3 border border-gray-200/80 rounded-xl text-center">
                    <span className="text-[10px] text-gray-400 block">{lang === 'kn' ? 'ಖಚಿತಪಡಿಸಿದ ವಲಯ' : 'Secured'}</span>
                    <span className="font-display font-extrabold text-lg text-green-600">
                      {allLeads.filter(l => l.status === 'approved').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Info Tips */}
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 text-[11px] text-gray-600 leading-normal space-y-1">
                <span className="font-bold text-[#FF6B00] block">{lang === 'kn' ? 'ಬಳಕೆದಾರರಿಗೆ ಸೂಚನೆ:' : 'Quick Pro-Tip:'}</span>
                <p>
                  {lang === 'kn' 
                    ? 'ಇಲ್ಲಿ ನೀವು ಮಾಡುವ ಯಾವುದೇ ಬದಲಾವಣೆಗಳು ತಕ್ಷಣವೇ ಮುಖ್ಯ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಬದಲಾಗುತ್ತವೆ. ಹೊಸ ವಲಯಗಳನ್ನು ನೀವೇ ಸೇರಿಸಿ ಸಾಮಾಜಿಕ ಪುರಾವೆಯನ್ನು ಹೆಚ್ಚಿಸಬಹುದು.'
                    : 'Any prices or status changes configured here update the website instantly. Add mock inquiries to dynamically guide applicants from new expansion zones!'}
                </p>
              </div>
            </div>

            {/* Right Side: Inquiry Management table/list */}
            <div className="flex-1 p-6 flex flex-col min-h-0 bg-white">
              
              {/* Table header operations */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="font-display font-extrabold text-base text-gray-900">
                    {lang === 'kn' ? 'ನೋಂದಣಿ ವಲಯ ನಿರ್ವಹಣೆ' : 'Active Territory Registrations'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {lang === 'kn' ? 'ಅರ್ಜಿಗಳ ಸ್ಥಿತಿಯನ್ನು ಬದಲಾಯಿಸಿ ಅಥವಾ ತೆಗೆದುಹಾಕಿ' : 'Publish, edit, and control which towns appear active on the map'}
                  </p>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-[#FF6B00] hover:bg-[#E05E00] text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{lang === 'kn' ? 'ಹೊಸ ವಲಯ ಸೇರಿಸಿ' : 'Add Custom Lead'}</span>
                </button>
              </div>

              {/* Filters & Search */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 shrink-0 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search name, town or ID..."
                    value={searchLeadQuery}
                    onChange={(e) => setSearchLeadQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200/80 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
                  />
                </div>
                <div>
                  <select
                    value={filterDistrict}
                    onChange={(e) => setFilterDistrict(e.target.value)}
                    className="w-full bg-white border border-gray-200/80 rounded-xl px-3 py-2 text-xs focus:outline-none text-gray-600"
                  >
                    <option value="All">All Districts</option>
                    {KARNATAKA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Infinite list viewport */}
              <div className="flex-1 overflow-y-auto border border-gray-100 rounded-2xl divide-y divide-gray-100 max-h-[450px]">
                {filteredLeads.length === 0 ? (
                  <div className="py-12 text-center text-xs text-gray-400">
                    No matching records found.
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div key={lead.id} className="p-4 hover:bg-[#FFF8F3]/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Left Info Column */}
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{lead.name}</span>
                          <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{lead.id}</span>
                          <span className="text-[10px] bg-orange-50 text-[#FF6B00] font-semibold px-2 py-0.5 rounded">
                            {lead.background}
                          </span>
                        </div>

                        {/* Location / Meta data */}
                        <div className="flex items-center gap-3.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1 font-medium text-gray-800">
                            <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
                            {lead.town}, {lead.district}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3.5 text-xs mt-1 text-gray-600">
                          <span>Phone: <strong>{lead.phone}</strong></span>
                          <span>WhatsApp: <strong className="text-green-600">{lead.whatsapp}</strong></span>
                        </div>

                        {lead.message && (
                          <p className="text-[11px] text-gray-500 italic bg-gray-50 px-2.5 py-1.5 rounded-lg border border-dashed border-gray-200 mt-1.5">
                            &ldquo;{lead.message}&rdquo;
                          </p>
                        )}
                      </div>

                      {/* Right Status Actions */}
                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0 min-h-[50px]">
                        {deletingLeadId === lead.id ? (
                          <div className="flex flex-col items-end gap-1.5 p-2 bg-red-50 rounded-xl border border-red-100 animate-[fadeIn_0.2s_ease-out]">
                            <span className="text-[10px] font-bold text-red-700 px-1">
                              {lang === 'kn' ? 'ಖಂಡಿತವಾಗಿಯೂ ಡಿಲೀಟ್ ಮಾಡಬೇಕೆ?' : 'Are you sure?'}
                            </span>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => confirmDeleteLead(lead.id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                              >
                                {lang === 'kn' ? 'ಹೌದು' : 'Yes'}
                              </button>
                              <button
                                onClick={() => setDeletingLeadId(null)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold text-[10px] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                              >
                                {lang === 'kn' ? 'ಅಲ್ಲ' : 'No'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* Status switcher */}
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] text-gray-400 font-bold block text-right">Status:</span>
                              <select
                                value={lead.status}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                className={`text-xs px-2.5 py-1 rounded-lg border font-bold focus:outline-none ${
                                  lead.status === 'approved' 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : lead.status === 'contacted'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                                    : 'bg-amber-50 text-amber-700 border-amber-200'
                                }`}
                              >
                                <option value="new">New Inquiry</option>
                                <option value="contacted">Under Review</option>
                                <option value="approved">Secured / Active</option>
                              </select>
                            </div>

                            {/* Edit button */}
                            <button
                              onClick={() => handleStartEdit(lead)}
                              className="p-2 text-gray-400 hover:text-orange-500 bg-gray-50 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer mt-4"
                              title="Edit registration details"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Delete button */}
                            <button
                              onClick={() => setDeletingLeadId(lead.id)}
                              className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors cursor-pointer mt-4"
                              title="Delete inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>

                    </div>
                  ))
                )}
              </div>

            </div>

          </div>
        )}
      </div>

      {/* MANUAL ADD LEAD MODAL OVERLAY */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-md p-6 border border-gray-100 shadow-2xl space-y-4 animate-[slideUp_0.2s_ease-out]">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h4 className="font-display font-black text-gray-900 text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#FF6B00]" />
                {lang === 'kn' ? 'ಹೊಸ ವಲಯ ಪ್ರಕಟಿಸಿ' : 'Create Custom Booking'}
              </h4>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Applicant Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="99450XXXXX"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">District</label>
                  <select
                    value={newLeadDistrict}
                    onChange={(e) => setNewLeadDistrict(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] text-gray-700"
                  >
                    {KARNATAKA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Town / Hobli</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gundlupete"
                    value={newLeadTown}
                    onChange={(e) => setNewLeadTown(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 uppercase">Applicant Background</label>
                <select
                  value={newLeadBackground}
                  onChange={(e) => setNewLeadBackground(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] text-gray-700"
                >
                  <option value="Student">Student</option>
                  <option value="Unemployed Youth">Unemployed Youth</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Women Entrepreneur">Women Entrepreneur</option>
                  <option value="Existing Shop Owner">Existing Shop Owner</option>
                  <option value="Small Business Owner">Small Business Owner</option>
                  <option value="Courier Operator">Courier Operator</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 uppercase">Message / Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Completed onboarding training, ready to start rider hiring."
                  value={newLeadMessage}
                  onChange={(e) => setNewLeadMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="customReady"
                  checked={newLeadReady}
                  onChange={(e) => setNewLeadReady(e.target.checked)}
                  className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <label htmlFor="customReady" className="text-xs text-gray-600 select-none cursor-pointer">
                  Investment Capital is Ready
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
                >
                  Publish Live Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MANUAL LEAD MODAL OVERLAY */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] w-full max-w-md p-6 border border-gray-100 shadow-2xl space-y-4 animate-[slideUp_0.2s_ease-out]">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h4 className="font-display font-black text-gray-900 text-lg flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#FF6B00]" />
                {lang === 'kn' ? 'ವಲಯ ವಿವರಗಳನ್ನು ಸಂಪಾದಿಸಿ' : 'Edit Territory Booking'}
              </h4>
              <button 
                onClick={() => setEditingLead(null)}
                className="text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-50 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Applicant Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={editLeadName}
                    onChange={(e) => setEditLeadName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    placeholder="99450XXXXX"
                    value={editLeadPhone}
                    onChange={(e) => setEditLeadPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">District</label>
                  <select
                    value={editLeadDistrict}
                    onChange={(e) => setEditLeadDistrict(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] text-gray-700"
                  >
                    {KARNATAKA_DISTRICTS.map(dist => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Town / Hobli</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gundlupete"
                    value={editLeadTown}
                    onChange={(e) => setEditLeadTown(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Applicant Background</label>
                  <select
                    value={editLeadBackground}
                    onChange={(e) => setEditLeadBackground(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] text-gray-700"
                  >
                    <option value="Student">Student</option>
                    <option value="Unemployed Youth">Unemployed Youth</option>
                    <option value="Working Professional">Working Professional</option>
                    <option value="Women Entrepreneur">Women Entrepreneur</option>
                    <option value="Existing Shop Owner">Existing Shop Owner</option>
                    <option value="Small Business Owner">Small Business Owner</option>
                    <option value="Courier Operator">Courier Operator</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-700 uppercase">Territory Status</label>
                  <select
                    value={editLeadStatus}
                    onChange={(e) => setEditLeadStatus(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] text-gray-700"
                  >
                    <option value="new">New Inquiry</option>
                    <option value="contacted">Under Review</option>
                    <option value="approved">Secured / Active</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-700 uppercase">Message / Notes (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Completed onboarding training, ready to start rider hiring."
                  value={editLeadMessage}
                  onChange={(e) => setEditLeadMessage(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-none focus:border-[#FF6B00] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editReady"
                  checked={editLeadReady}
                  onChange={(e) => setEditLeadReady(e.target.checked)}
                  className="rounded text-[#FF6B00] focus:ring-[#FF6B00]"
                />
                <label htmlFor="editReady" className="text-xs text-gray-600 select-none cursor-pointer">
                  Investment Capital is Ready
                </label>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  <span>{lang === 'kn' ? 'ಉಳಿಸು' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
