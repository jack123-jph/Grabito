import React, { useState } from 'react';
import { Send, Phone, ArrowRight, CheckCircle2, Copy, Sparkles, MessageCircle, Info } from 'lucide-react';
import { KARNATAKA_DISTRICTS, CONTACT_INFO } from '../data';
import { FranchiseInquiry } from '../types';
import { TRANSLATIONS } from '../translations';

interface InquiryFormProps {
  onSuccessSubmit?: (newInquiry: FranchiseInquiry) => void;
  lang?: 'en' | 'kn';
}

export default function InquiryForm({ onSuccessSubmit, lang = 'en' }: InquiryFormProps) {
  const t = TRANSLATIONS[lang];
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [town, setTown] = useState('');
  const [district, setDistrict] = useState('');
  const [background, setBackground] = useState('');
  const [investmentReady, setInvestmentReady] = useState(true);
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [latestInquiry, setLatestInquiry] = useState<FranchiseInquiry | null>(null);
  const [formError, setFormError] = useState('');
  const [customWhatsappUrl, setCustomWhatsappUrl] = useState('');

  // Copy phone number to WhatsApp field automatically for quick filling
  const handleCopyPhoneToWhatsapp = () => {
    setWhatsapp(phone);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!name || !phone || !town || !district || !background) {
      setFormError(t.formAlertFields);
      return;
    }

    setIsSubmitting(true);

    // Simulate database write delay
    setTimeout(() => {
      const newInquiry: FranchiseInquiry = {
        id: 'inq-' + Math.random().toString(36).substr(2, 9),
        name,
        phone,
        whatsapp: whatsapp || phone,
        town,
        district,
        background,
        investmentReady,
        message,
        status: 'new',
        createdAt: new Date().toISOString(),
      };

      // Save to local storage
      try {
        const existingInquiriesStr = localStorage.getItem('grabito_inquiries');
        const existingInquiries = existingInquiriesStr ? JSON.parse(existingInquiriesStr) : [];
        existingInquiries.unshift(newInquiry);
        localStorage.setItem('grabito_inquiries', JSON.stringify(existingInquiries));

        // Also save to the master list grabito_all_inquiries so it instantly appears in active territories and Admin Panel
        const masterInquiriesStr = localStorage.getItem('grabito_all_inquiries');
        const masterInquiries = masterInquiriesStr ? JSON.parse(masterInquiriesStr) : [];
        
        // Prevent duplicate IDs if any, and insert the new inquiry at the top
        const filteredMaster = masterInquiries.filter((inq: FranchiseInquiry) => inq.id !== newInquiry.id);
        filteredMaster.unshift(newInquiry);
        localStorage.setItem('grabito_all_inquiries', JSON.stringify(filteredMaster));
      } catch (err) {
        console.error("Local storage saving error:", err);
      }

      // Format WhatsApp details message
      const formattedText = `*New Grabito Franchise Inquiry* 📱
----------------------------------------
*Name / ಹೆಸರು:* ${name}
*Phone / ಫೋನ್:* ${phone}
*WhatsApp / ವಾಟ್ಸಾಪ್:* ${whatsapp || phone}
*Town / ಪಟ್ಟಣ:* ${town}
*District / ಜಿಲ್ಲೆ:* ${district}
*Background / ಹಿನ್ನೆಲೆ:* ${background}
*Investment Ready / ಬಂಡವಾಳ ಸಿದ್ಧ:* ${investmentReady ? "Yes (₹5,999+ Ready) ✅" : "No ❌"}
${message ? `*Additional Message / ಸಂದೇಶ:* ${message}` : ''}
----------------------------------------
_Submitted from Grabito Franchise Website_`;

      const encodedText = encodeURIComponent(formattedText);
      const whatsappUrl = `https://wa.me/919538755904?text=${encodedText}`;
      setCustomWhatsappUrl(whatsappUrl);

      setIsSubmitting(false);
      setIsSuccess(true);
      setLatestInquiry(newInquiry);

      if (onSuccessSubmit) {
        onSuccessSubmit(newInquiry);
      }

      // Auto-open the WhatsApp link
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error("Popup blocked or failed to auto-open:", err);
      }

      // Reset form
      setName('');
      setPhone('');
      setWhatsapp('');
      setTown('');
      setDistrict('');
      setBackground('');
      setMessage('');
    }, 1200);
  };

  const successDesc = t.formSuccessDesc
    .replace('{name}', latestInquiry?.name || '')
    .replace('{town}', latestInquiry?.town || '')
    .replace('{district}', latestInquiry?.district || '');

  return (
    <div className="w-full bg-white rounded-3xl border border-[#ECECEC] shadow-2xl p-6 md:p-8 relative overflow-hidden" id="franchise-inquiry-form">
      {/* Visual Ambient Glow */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-gradient-to-br from-[#FF6B00]/5 to-transparent rounded-bl-full pointer-events-none" />

      {isSuccess ? (
        <div className="text-center py-10 px-4 space-y-6 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex p-4 bg-green-50 rounded-full border border-green-100 text-green-500 mb-2">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-extrabold text-2xl text-gray-900">{t.formSuccessTitle}</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              {successDesc}
            </p>
          </div>

          <div className="p-4 bg-[#FFF8F3] border border-orange-100 rounded-2xl max-w-sm mx-auto text-left space-y-2.5">
            <span className="text-[11px] font-bold text-[#FF6B00] uppercase tracking-wider block">{t.formSuccessId}</span>
            <div className="font-mono text-xs text-gray-700 font-semibold bg-white/80 px-2.5 py-1.5 rounded-lg border border-orange-100 flex justify-between items-center">
              <span>{latestInquiry?.id}</span>
              <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded uppercase font-bold">{t.formSuccessStatus}</span>
            </div>
            <p className="text-xs text-gray-500 leading-normal">
              {t.formSuccessAlert}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href={customWhatsappUrl || CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE57] text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              {t.formSuccessBtnWhatsapp}
            </a>
            <button
              onClick={() => setIsSuccess(false)}
              className="inline-flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
            >
              {t.formSuccessBtnAnother}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider block">{t.formExclusive}</span>
            <h3 className="font-display font-bold text-2xl text-gray-900">{t.formTitle}</h3>
            <p className="text-gray-500 text-xs">
              {t.formSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {t.formName} <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={t.formNamePlh}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
              />
            </div>

            {/* Background Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {t.formBackground} <span className="text-[#FF6B00]">*</span>
              </label>
              <select
                required
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-gray-700"
              >
                <option value="">{t.formBackgroundPlh}</option>
                <option value="Student">{t.bgStudent}</option>
                <option value="Unemployed Youth">{t.bgUnemployed}</option>
                <option value="Working Professional">{t.bgProfessional}</option>
                <option value="Women Entrepreneur">{t.bgWomen}</option>
                <option value="Existing Shop Owner">{t.bgShopOwner}</option>
                <option value="Small Business Owner">{t.bgSmallBusiness}</option>
                <option value="Courier Operator">{t.bgCourier}</option>
                <option value="Other">{t.bgOther}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {t.formPhone} <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type="tel"
                required
                pattern="[0-9]{10}"
                placeholder={t.formPhonePlh}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
              />
            </div>

            {/* WhatsApp */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-700 block">
                  {t.formWhatsapp}
                </label>
                {phone.length === 10 && (
                  <button
                    type="button"
                    onClick={handleCopyPhoneToWhatsapp}
                    className="text-[10px] text-[#FF6B00] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    {t.formSameAsPhone}
                  </button>
                )}
              </div>
              <input
                type="tel"
                pattern="[0-9]{10}"
                placeholder={t.formWhatsappPlh}
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* District Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {t.formDistrict} <span className="text-[#FF6B00]">*</span>
              </label>
              <select
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-gray-700"
              >
                <option value="">{t.formDistrictPlh}</option>
                {KARNATAKA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Town */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 block">
                {t.formTown} <span className="text-[#FF6B00]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder={t.formTownPlh}
                value={town}
                onChange={(e) => setTown(e.target.value)}
                className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
              />
            </div>
          </div>

          {/* Investment confirmation checkbox */}
          <div className="flex items-start gap-3 p-3.5 bg-[#FFF8F3] border border-orange-100 rounded-xl">
            <input
              type="checkbox"
              id="invReady"
              checked={investmentReady}
              onChange={(e) => setInvestmentReady(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#FF6B00] focus:ring-[#FF6B00]"
            />
            <label htmlFor="invReady" className="text-xs text-gray-600 leading-normal cursor-pointer select-none">
              <strong className="text-gray-900 block font-semibold mb-0.5">{t.formCapitalCheckTitle}</strong>
              {t.formCapitalCheckDesc}
            </label>
          </div>

          {/* Optional Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              {t.formNotes}
            </label>
            <textarea
              rows={2}
              placeholder={t.formNotesPlh}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-50/50 border border-[#ECECEC] rounded-xl px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all resize-none"
            />
          </div>

          {formError && (
            <div className="p-3.5 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              <span className="font-semibold">{formError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:bg-orange-300 disabled:cursor-not-allowed transform active:scale-[0.99] cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t.formBtnSubmitting}
              </div>
            ) : (
              <>
                {t.formBtnSubmit}
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center">
            <span className="text-[10px] text-gray-400 block">
              {t.formFirstComeFirstServe}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
