import React from 'react';
import { Star } from 'lucide-react';
import {
  COMPARISON_PRODUCTS,
  ComparisonProduct,
  IMAGES,
  TECHNICAL_DETAILS,
} from '../data/productData';

interface APlusShowcaseProps {
  onAddComparisonToCart: (product: ComparisonProduct) => void;
  onSelectColorVariant: (colorId: 'black' | 'white' | 'sentinels') => void;
}

const FEATURE_PILLARS = [
  {
    title: '54g Zero-Hole Ultralight Shell',
    description:
      'Redesigned from the ground up with esports pros for optimal weight balance, rigid side walls, and a smooth-touch matte coating that locks into claw and fingertip grips.',
  },
  {
    title: 'Focus Pro 35K Optical Sensor Gen-2',
    description:
      '99.8% resolution accuracy with 1-DPI step adjustments, Smart Tracking auto-calibration across cloth and glass pads, and Asymmetric Cut-off for pixel-exact lift-off.',
  },
  {
    title: 'True 8000 Hz Wireless HyperPolling',
    description:
      'Combines Razer HyperSpeed Wireless with the included HyperPolling Wireless Dongle for sub-millisecond transmission and fluid tracking on 240Hz–540Hz esports monitors.',
  },
  {
    title: 'Optical Mouse Switches Gen-3',
    description:
      'Crisp tactile feedback rated for 90-million clicks with 0.2ms actuation and zero debounce delay—eliminating unintended double-clicks under tournament pressure.',
  },
];

export const APlusShowcase: React.FC<APlusShowcaseProps> = ({
  onAddComparisonToCart,
  onSelectColorVariant,
}) => {
  return (
    <div className="space-y-10">
      {/* From the Manufacturer (A+ Brand Content) */}
      <section
        id="aplus-section"
        className="border-t border-[#E7E7E7] pt-6"
        aria-labelledby="aplus-heading"
      >
        <h2 id="aplus-heading" className="text-[21px] font-bold text-[#0F1111] mb-4">
          From the manufacturer
        </h2>

        <div className="rounded-lg overflow-hidden border border-[#27272A] bg-[#0B0C0E] text-white">
          {/* Dark Hero Banner with Measured Scrim */}
          <div className="relative w-full aspect-[16/9] max-h-[460px] overflow-hidden bg-black">
            <img
              src={IMAGES.aplusBanner}
              alt="Razer Viper V3 Pro Wireless Esports Mouse on dark micro-weave desk mat"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/35 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 max-w-xl">
              <p className="text-[12px] font-semibold tracking-wider text-[#44D62C] uppercase mb-1.5">
                Razer Viper V3 Pro · For The Pro
              </p>
              <h3 className="font-display text-[24px] md:text-[34px] font-bold leading-tight text-white">
                54 Grams of Pure Tournament Precision
              </h3>
              <p className="mt-2 text-[14px] md:text-[15px] text-zinc-200 leading-relaxed">
                Built with champion esports rosters for featherweight agility, 8000 Hz wireless responsiveness, and up to 95 hours of competitive endurance.
              </p>
            </div>
          </div>

          {/* 4-Pillar Engineering Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 border-t border-zinc-800">
            {FEATURE_PILLARS.map((pillar, idx) => (
              <div key={pillar.title} className="p-5 md:p-6">
                <div className="font-mono-num text-[12px] font-semibold text-[#44D62C] mb-2">
                  0{idx + 1}
                </div>
                <h4 className="font-display text-[16px] font-semibold text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-[13px] text-zinc-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compare with Similar Items */}
      <section
        id="compare-section"
        className="border-t border-[#E7E7E7] pt-6"
        aria-labelledby="compare-heading"
      >
        <h2 id="compare-heading" className="text-[21px] font-bold text-[#0F1111] mb-4">
          Compare with similar items
        </h2>

        <div className="overflow-x-auto border border-[#E7E7E7] rounded-lg">
          <table className="w-full min-w-[740px] border-collapse text-[13px] text-[#0F1111]">
            <thead>
              <tr className="border-b border-[#E7E7E7] bg-white">
                <th className="w-40 p-3 text-left font-medium text-[#565959] align-bottom">
                  Model
                </th>
                {COMPARISON_PRODUCTS.map((item) => (
                  <th
                    key={item.id}
                    className={`p-4 text-left align-top font-normal border-l border-[#E7E7E7] ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : 'bg-white'
                    }`}
                  >
                    <div className="h-32 w-full flex items-center justify-center mb-3 bg-white rounded border border-[#F0F2F2] p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (item.id === 'viper-v3-pro') onSelectColorVariant('black');
                        if (item.id === 'viper-v3-white') onSelectColorVariant('white');
                        if (item.id === 'viper-v3-sentinels') onSelectColorVariant('sentinels');
                      }}
                      className="text-left font-semibold text-[#007185] hover:text-[#C7511F] hover:underline leading-snug cursor-pointer"
                    >
                      {item.name}
                    </button>
                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => onAddComparisonToCart(item)}
                        className="px-3.5 py-1.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[12px] font-medium text-[#0F1111] cursor-pointer whitespace-nowrap"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E7E7]">
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">
                  Customer Rating
                </td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <div className="flex items-center text-[#DE7921]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3.5 h-3.5 ${
                              star <= Math.round(item.rating)
                                ? 'fill-[#FFA41C] text-[#DE7921]'
                                : 'text-[#CCCCCC]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[#007185] tabular-nums">
                        ({item.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">Price</td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] font-bold text-[#B12704] tabular-nums ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    S${item.price.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">Weight</td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] tabular-nums ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    {item.weight}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">Optical Sensor</td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    {item.sensor}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">Polling Rate</td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    {item.pollingRate}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">Battery Life</td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    {item.batteryLife}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold bg-[#F7FAFA] text-[#0F1111]">Form Factor</td>
                {COMPARISON_PRODUCTS.map((item) => (
                  <td
                    key={item.id}
                    className={`p-3 border-l border-[#E7E7E7] ${
                      item.isCurrent ? 'bg-[#F7FAFA]' : ''
                    }`}
                  >
                    {item.shape}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Product Information / Technical Details */}
      <section
        id="tech-details-section"
        className="border-t border-[#E7E7E7] pt-6"
        aria-labelledby="tech-heading"
      >
        <h2 id="tech-heading" className="text-[21px] font-bold text-[#0F1111] mb-4">
          Product information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-[#E7E7E7] rounded-lg overflow-hidden">
            <div className="bg-[#F0F2F2] px-4 py-2.5 text-[14px] font-bold text-[#0F1111] border-b border-[#E7E7E7]">
              Technical Details
            </div>
            <table className="w-full text-[13px]">
              <tbody className="divide-y divide-[#E7E7E7]">
                {TECHNICAL_DETAILS.slice(0, 5).map((row) => (
                  <tr key={row.label}>
                    <th className="w-[44%] bg-[#F7FAFA] px-4 py-2.5 text-left font-medium text-[#565959]">
                      {row.label}
                    </th>
                    <td className="px-4 py-2.5 text-[#0F1111] tabular-nums">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border border-[#E7E7E7] rounded-lg overflow-hidden">
            <div className="bg-[#F0F2F2] px-4 py-2.5 text-[14px] font-bold text-[#0F1111] border-b border-[#E7E7E7]">
              Additional Information
            </div>
            <table className="w-full text-[13px]">
              <tbody className="divide-y divide-[#E7E7E7]">
                {TECHNICAL_DETAILS.slice(5).map((row) => (
                  <tr key={row.label}>
                    <th className="w-[44%] bg-[#F7FAFA] px-4 py-2.5 text-left font-medium text-[#565959]">
                      {row.label}
                    </th>
                    <td className="px-4 py-2.5 text-[#0F1111] tabular-nums">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
