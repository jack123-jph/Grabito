import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, ArrowRight, ShieldCheck, Percent, ShoppingBag } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface InteractiveCalculatorProps {
  lang?: 'en' | 'kn';
}

export default function InteractiveCalculator({ lang = 'en' }: InteractiveCalculatorProps) {
  const t = TRANSLATIONS[lang];
  const [dailyOrders, setDailyOrders] = useState<number>(80);
  const [averageOrderValue, setAverageOrderValue] = useState<number>(220);
  const [avgCommissionRate, setAvgCommissionRate] = useState<number>(15); // 15% typical
  const [deliveryFeeCharge, setDeliveryFeeCharge] = useState<number>(30); // Average delivery charge per order

  // Calculations
  const grossMonthlySales = dailyOrders * averageOrderValue * 30;
  
  // Total Commission collected by the franchise (from store partners)
  const monthlyCommissionRevenue = grossMonthlySales * (avgCommissionRate / 100);
  
  // Delivery Fee Collected: say, delivery fee is split between rider and platform
  // Standard split: Franchise gets ₹10 margin per delivery fee, Rider gets ₹20 + tips
  const platformDeliveryFeeMargin = dailyOrders * 10 * 30; 
  
  const totalGrossRevenue = monthlyCommissionRevenue + platformDeliveryFeeMargin;

  // Monthly Expenses:
  const monthlyAdminSupportFee = 199; // Grabito monthly charge
  const estimatedMarketingOverhead = 2000; // Local posters, flyers, online groups
  const otherExpenses = 1500; // Internet, electricity, minor miscellaneous
  const totalExpenses = monthlyAdminSupportFee + estimatedMarketingOverhead + otherExpenses;

  const estimatedMonthlyNetProfit = Math.max(0, totalGrossRevenue - totalExpenses);

  // Return formatted numbers
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-[#ECECEC] shadow-2xl overflow-hidden" id="profit-calculator">
      {/* Header Banner */}
      <div className="bg-[#FF6B00] text-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/15 rounded-xl">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-mono font-bold text-orange-200">{t.calcInteractive}</span>
            <h3 className="font-display font-bold text-xl md:text-2xl mt-0.5">{t.calcTitle}</h3>
          </div>
        </div>
        <div className="text-sm bg-black/15 px-4 py-2 rounded-full border border-white/10 self-start md:self-auto font-mono">
          {t.calcSetupText}: <span className="font-bold">₹5,999</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Sliders Area (8 cols) */}
        <div className="p-6 md:p-8 lg:col-span-7 space-y-6">
          <h4 className="font-display font-semibold text-lg text-gray-900 border-b border-gray-100 pb-3">
            {lang === 'kn' ? 'ನಿಮ್ಮ ಪಟ್ಟಣಕ್ಕೆ ಅನುಗುಣವಾಗಿ ನಿಯತಾಂಕಗಳನ್ನು ಬದಲಾಯಿಸಿ' : 'Adjust Parameters for Your Town'}
          </h4>

          {/* Slider 1: Daily Orders */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-gray-700 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-[#FF6B00]" />
                {t.calcSliderDailyOrders}
              </label>
              <span className="font-mono font-bold text-[#FF6B00] text-base bg-[#FFF8F3] px-2.5 py-1 rounded-md border border-orange-100">
                {dailyOrders} {t.calcOrdersDay}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="400"
              step="5"
              value={dailyOrders}
              onChange={(e) => setDailyOrders(Number(e.target.value))}
              className="w-full h-2 bg-[#ECECEC] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-mono">
              <span>10 ({lang === 'kn' ? 'ಪ್ರಾರಂಭಿಕ' : 'Starter'})</span>
              <span>100 ({lang === 'kn' ? 'ಮಧ್ಯಮ' : 'Moderate'})</span>
              <span>250 ({lang === 'kn' ? 'ಉತ್ತಮ ಬೆಳವಣಿಗೆ' : 'High Growth'})</span>
              <span>400 ({lang === 'kn' ? 'ಗರಿಷ್ಠ ಸಾಮರ್ಥ್ಯ' : 'Max Capacity'})</span>
            </div>
          </div>

          {/* Slider 2: Average Order Value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-gray-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#FF6B00]" />
                {t.calcSliderAov}
              </label>
              <span className="font-mono font-bold text-[#FF6B00] text-base bg-[#FFF8F3] px-2.5 py-1 rounded-md border border-orange-100">
                ₹{averageOrderValue}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="10"
              value={averageOrderValue}
              onChange={(e) => setAverageOrderValue(Number(e.target.value))}
              className="w-full h-2 bg-[#ECECEC] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-mono">
              <span>₹100 ({lang === 'kn' ? 'ತಿಂಡಿ ತಿನಿಸು' : 'Snacks'})</span>
              <span>₹250 ({lang === 'kn' ? 'ಸಾಧಾರಣ ಊಟ' : 'Standard Meal'})</span>
              <span>₹450 ({lang === 'kn' ? 'ಫ್ಯಾಮಿಲಿ ಪ್ಯಾಕ್/ದಿನಸಿ' : 'Family Pack/Grocery'})</span>
              <span>₹600 ({lang === 'kn' ? 'ದುಬಾರಿ ಆರ್ಡರ್' : 'High-End'})</span>
            </div>
          </div>

          {/* Slider 3: Average Commission Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label className="font-medium text-gray-700 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-[#FF6B00]" />
                {t.calcSliderCommission}
              </label>
              <span className="font-mono font-bold text-[#FF6B00] text-base bg-[#FFF8F3] px-2.5 py-1 rounded-md border border-orange-100">
                {avgCommissionRate}%
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="25"
              step="1"
              value={avgCommissionRate}
              onChange={(e) => setAvgCommissionRate(Number(e.target.value))}
              className="w-full h-2 bg-[#ECECEC] rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 font-mono">
              <span>8% ({lang === 'kn' ? 'ಕಡಿಮೆ ಸ್ಪರ್ಧೆ' : 'Low Competitive'})</span>
              <span>15% ({lang === 'kn' ? 'ಸಾಮಾನ್ಯ ಗುಣಮಟ್ಟ' : 'Typical Standard'})</span>
              <span>20% ({lang === 'kn' ? 'ಪ್ರೀಮಿಯಂ ಪಾಲುದಾರರು' : 'Premium Partners'})</span>
              <span>25% ({lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಬೇಡಿಕೆ' : 'High Demand'})</span>
            </div>
          </div>

          <div className="p-4 bg-[#FFF8F3] border border-[#FFF0E5] rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600 leading-relaxed">
              <span className="font-bold text-gray-900 block mb-0.5">{t.calcDualSystemTitle}</span>
              {t.calcDualSystemDesc}
            </div>
          </div>
        </div>

        {/* Results Area (5 cols) */}
        <div className="bg-[#FFF8F3] border-t lg:border-t-0 lg:border-l border-[#ECECEC] p-6 md:p-8 lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="font-display font-semibold text-lg text-gray-900 border-b border-orange-100 pb-3">
              {t.calcEarningsProjection}
            </h4>

            {/* Main Net Profit Projection */}
            <div className="p-5 bg-white rounded-2xl border border-orange-100 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#FF6B00]/10 to-transparent rounded-bl-full pointer-events-none" />
              <span className="text-xs font-semibold text-[#FF6B00] uppercase tracking-wider block">{t.calcEstimatedProfit}</span>
              <div className="font-display font-extrabold text-3xl md:text-4xl text-gray-900 mt-1">
                {formatCurrency(estimatedMonthlyNetProfit)}
                <span className="text-sm font-normal text-gray-500 font-sans tracking-normal"> {lang === 'kn' ? ' / ತಿಂಗಳಿಗೆ' : ' / month'}</span>
              </div>
              <span className="text-[11px] text-gray-400 block mt-1">{t.calcMonthlySupportOverhead}</span>
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2.5 text-sm font-sans">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">{t.calcGrossSales}</span>
                <span className="font-mono font-medium text-gray-800">{formatCurrency(grossMonthlySales)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">{t.calcCommissionRevenue} ({avgCommissionRate}%)</span>
                <span className="font-mono font-medium text-green-600">+{formatCurrency(monthlyCommissionRevenue)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500">{t.calcPlatformMargin} (₹10/order)</span>
                <span className="font-mono font-medium text-green-600">+{formatCurrency(platformDeliveryFeeMargin)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-orange-200">
                <span className="text-gray-500">{t.calcTotalRevenueStream}</span>
                <span className="font-mono font-semibold text-gray-900">{formatCurrency(totalGrossRevenue)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100 text-xs">
                <span className="text-gray-500">{t.calcExpensesLabel}</span>
                <span className="font-mono text-red-500">-{formatCurrency(totalExpenses)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-orange-100">
            <p className="text-[10px] text-gray-400 leading-normal mb-4 italic">
              {t.calcDisclaimer}
            </p>

            <a
              href="#franchise-inquiry-form"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-display font-semibold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg transform active:scale-[0.98]"
            >
              {t.calcBtnSubmit}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
