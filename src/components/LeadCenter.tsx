import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Search, Calendar, Check, AlertCircle, RefreshCw, User, Briefcase, Database } from 'lucide-react';
import { FranchiseInquiry } from '../types';
import { TRANSLATIONS } from '../translations';

interface LeadCenterProps {
  inquiryCountTrigger: number; // Increment to force reload
  lang?: 'en' | 'kn';
}

export default function LeadCenter({ inquiryCountTrigger, lang = 'en' }: LeadCenterProps) {
  const t = TRANSLATIONS[lang];
  const [inquiries, setInquiries] = useState<FranchiseInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  // Initial dummy bookings to serve as premium social proof of Karnataka traction!
  const defaultInquiries: FranchiseInquiry[] = [
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
      createdAt: new Date(Date.now() - 2592000000).toISOString() // 30 days ago
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
      createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
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
      createdAt: new Date(Date.now() - 432000000).toISOString() // 5 days ago
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
      createdAt: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
    }
  ];

  const loadInquiries = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const masterStored = localStorage.getItem('grabito_all_inquiries');
        if (masterStored) {
          setInquiries(JSON.parse(masterStored));
          setIsLoading(false);
          return;
        }

        const stored = localStorage.getItem('grabito_inquiries');
        if (stored) {
          const parsed = JSON.parse(stored) as FranchiseInquiry[];
          // Combine user inquiries with default social proof
          const combined = [...parsed, ...defaultInquiries];
          // Remove potential duplicates by ID
          const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
          localStorage.setItem('grabito_all_inquiries', JSON.stringify(unique));
          setInquiries(unique);
        } else {
          // No user inputs, save default ones so something beautiful is always visible
          localStorage.setItem('grabito_all_inquiries', JSON.stringify(defaultInquiries));
          setInquiries(defaultInquiries);
        }
      } catch (err) {
        setInquiries(defaultInquiries);
      }
      setIsLoading(false);
    }, 400);
  };

  useEffect(() => {
    loadInquiries();
  }, [inquiryCountTrigger]);

  // Unique districts represented
  const districts = ['All', ...Array.from(new Set(inquiries.map(i => i.district)))];

  // Filtering
  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = inq.town.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inq.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || inq.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const formatDate = (isoStr: string) => {
    const date = new Date(isoStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getBackgroundLabel = (bg: string) => {
    switch (bg) {
      case 'Student': return t.bgStudent;
      case 'Unemployed Youth': return t.bgUnemployed;
      case 'Working Professional': return t.bgProfessional;
      case 'Women Entrepreneur': return t.bgWomen;
      case 'Existing Shop Owner': return t.bgShopOwner;
      case 'Small Business Owner': return t.bgSmallBusiness;
      case 'Courier Operator': return t.bgCourier;
      case 'Other': return t.bgOther;
      default: return bg;
    }
  };

  return (
    <div className="bg-white border border-[#ECECEC] rounded-3xl shadow-xl overflow-hidden" id="live-leads-dashboard">
      {/* Dashboard Top Navigation */}
      <div className="bg-[#111111] text-white p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 rounded-xl border border-orange-500/20 text-[#FF6B00]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-lg leading-tight">{t.registryTitle}</h4>
            <p className="text-xs text-gray-400 font-sans mt-0.5">{t.registrySub}</p>
          </div>
        </div>

        {/* Dashboard Status Pill counters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-gray-400">{t.registryTotalApps}:</span>
            <span className="font-mono font-bold text-white">{inquiries.length}</span>
          </div>
          <button
            onClick={loadInquiries}
            disabled={isLoading}
            className="p-1.5 text-gray-400 hover:text-[#FF6B00] bg-white/5 border border-white/10 rounded-lg transition-colors cursor-pointer"
            title="Refresh Registry"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 border-b border-[#ECECEC] bg-gray-50/50 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t.registrySearchPlh}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-[#ECECEC] rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-all"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-white border border-[#ECECEC] rounded-xl px-3 py-2.5 text-xs text-gray-600 focus:outline-none focus:border-[#FF6B00]"
          >
            {districts.map(dist => (
              <option key={dist} value={dist}>{dist === 'All' ? t.registryAllDistricts : dist}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid List */}
      <div className="divide-y divide-[#ECECEC] max-h-[380px] overflow-y-auto">
        {isLoading ? (
          <div className="py-20 text-center text-sm text-gray-500">
            <div className="w-6 h-6 border-2 border-[#FF6B00] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            {t.registrySyncing}
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="py-16 text-center text-xs text-gray-500 space-y-2">
            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="font-semibold text-gray-700">{t.registryNoBookings}</p>
            <p>{t.registryFirstToSecure}</p>
          </div>
        ) : (
          filteredInquiries.map((inq, idx) => (
            <div key={inq.id} className="p-4 md:p-5 hover:bg-[#FFF8F3]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                {/* Header Line */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display font-semibold text-sm text-gray-900">{inq.name}</span>
                  <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                    {inq.id}
                  </span>
                  <span className="text-[10px] bg-orange-100 text-[#FF6B00] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Briefcase className="w-2.5 h-2.5" />
                    {getBackgroundLabel(inq.background)}
                  </span>
                </div>

                {/* Location Line */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1 font-medium text-gray-800">
                    <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                    {inq.town}, {inq.district}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    {formatDate(inq.createdAt)}
                  </span>
                </div>

                {/* Message notes */}
                {inq.message && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-dashed border-gray-200 mt-1.5 leading-relaxed italic">
                    &ldquo;{inq.message}&rdquo;
                  </p>
                )}
              </div>

              {/* Booking Status Indicator */}
              <div className="shrink-0 self-start sm:self-center flex flex-col items-end gap-1.5">
                {inq.status === 'approved' ? (
                  <span className="text-[10px] font-bold uppercase bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                    {t.registrySecured}
                  </span>
                ) : inq.status === 'contacted' ? (
                  <span className="text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                    {t.registryReview}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {t.registryPriority}
                  </span>
                )}
                
                <span className="text-[10px] text-gray-400 font-mono">
                  {inq.investmentReady ? t.registryCapReady : t.registryCapReview}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer Banner */}
      <div className="bg-gray-50 px-5 py-3 border-t border-[#ECECEC] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-gray-500 gap-2">
        <span>{t.registryCopyright}</span>
        <span className="flex items-center gap-1 font-semibold text-gray-700">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
          {t.registrySecureBanner}
        </span>
      </div>
    </div>
  );
}
