import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { BUNDLE_ACCESSORIES, ColorVariant, StyleOption } from '../data/productData';

export interface CartItemPayload {
  id: string;
  title: string;
  variantLabel: string;
  price: number;
  image: string;
  quantity: number;
  asin: string;
}

interface FrequentlyBoughtTogetherProps {
  variant: ColorVariant;
  styleOption: StyleOption;
  onAddBundleToCart: (items: CartItemPayload[]) => void;
}

export const FrequentlyBoughtTogether: React.FC<FrequentlyBoughtTogetherProps> = ({
  variant,
  styleOption,
  onAddBundleToCart,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'main',
    BUNDLE_ACCESSORIES[0].id,
    BUNDLE_ACCESSORIES[1].id,
  ]);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const mainPrice = variant.price + styleOption.priceDelta;

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const totalPrice =
    (selectedIds.includes('main') ? mainPrice : 0) +
    BUNDLE_ACCESSORIES.reduce(
      (sum, acc) => (selectedIds.includes(acc.id) ? sum + acc.price : sum),
      0
    );

  const selectedCount = selectedIds.length;

  const handleAddSelected = () => {
    if (selectedCount === 0) return;
    const payload: CartItemPayload[] = [];
    if (selectedIds.includes('main')) {
      payload.push({
        id: `${variant.asin}-${styleOption.id}`,
        title: `Razer Viper V3 Pro e-Sport Ultralight Wireless Gaming Mouse`,
        variantLabel: `${variant.name} · ${styleOption.label}`,
        price: mainPrice,
        image: variant.images[0].src,
        quantity: 1,
        asin: variant.asin,
      });
    }
    BUNDLE_ACCESSORIES.forEach((acc) => {
      if (selectedIds.includes(acc.id)) {
        payload.push({
          id: acc.id,
          title: acc.title,
          variantLabel: 'Official Razer Accessory',
          price: acc.price,
          image: acc.image,
          quantity: 1,
          asin: acc.asin,
        });
      }
    });
    onAddBundleToCart(payload);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  return (
    <section
      id="fbt-section"
      className="border-t border-[#E7E7E7] pt-6 pb-8"
      aria-labelledby="fbt-heading"
    >
      <h2 id="fbt-heading" className="text-[21px] font-bold text-[#0F1111] mb-4">
        Frequently bought together
      </h2>

      <div className="flex flex-col lg:flex-row lg:items-center gap-6 bg-white border border-[#E7E7E7] rounded-lg p-5">
        {/* Visual Trio */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-28 h-28 border border-[#E7E7E7] rounded-md p-2 bg-white flex items-center justify-center">
            <img
              src={variant.images[0].src}
              alt={`Razer Viper V3 Pro ${variant.name}`}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain transition-opacity ${
                selectedIds.includes('main') ? 'opacity-100' : 'opacity-35'
              }`}
            />
          </div>
          <Plus className="w-5 h-5 text-[#565959] shrink-0" />
          <div className="w-28 h-28 border border-[#E7E7E7] rounded-md p-2 bg-white flex items-center justify-center">
            <img
              src={BUNDLE_ACCESSORIES[0].image}
              alt={BUNDLE_ACCESSORIES[0].title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain transition-opacity ${
                selectedIds.includes(BUNDLE_ACCESSORIES[0].id) ? 'opacity-100' : 'opacity-35'
              }`}
            />
          </div>
          <Plus className="w-5 h-5 text-[#565959] shrink-0" />
          <div className="w-28 h-28 border border-[#E7E7E7] rounded-md p-2 bg-white flex items-center justify-center">
            <img
              src={BUNDLE_ACCESSORIES[1].image}
              alt={BUNDLE_ACCESSORIES[1].title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-contain transition-opacity ${
                selectedIds.includes(BUNDLE_ACCESSORIES[1].id) ? 'opacity-100' : 'opacity-35'
              }`}
            />
          </div>
        </div>

        {/* Summary & CTA */}
        <div className="lg:border-l lg:border-[#E7E7E7] lg:pl-6 flex flex-col justify-center min-w-[240px]">
          <div className="text-[14px] text-[#565959]">
            Total price:{' '}
            <span className="text-[18px] font-bold text-[#B12704] tabular-nums">
              S${totalPrice.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={handleAddSelected}
            className={`mt-2.5 px-5 py-2 rounded-full text-[13px] font-medium border transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5 ${
              selectedCount === 0
                ? 'bg-[#F0F2F2] border-[#D5D9D9] text-[#888] cursor-not-allowed'
                : 'bg-[#FFD814] hover:bg-[#F7CA00] border-[#FCD200] text-[#0F1111]'
            }`}
          >
            {addedFeedback ? (
              <>
                <Check className="w-4 h-4 text-[#067D62]" />
                <span>Added to Cart</span>
              </>
            ) : (
              <span>
                Add {selectedCount === 3 ? 'all 3' : `${selectedCount} selected`} to Cart
              </span>
            )}
          </button>
        </div>

        {/* Checkboxes List */}
        <div className="flex-1 space-y-2.5 text-[13px]">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIds.includes('main')}
              onChange={() => toggleSelection('main')}
              className="mt-0.5 w-4 h-4 accent-[#007185] cursor-pointer"
            />
            <span>
              <span className="font-bold">This item:</span> Razer Viper V3 Pro e-Sport Ultralight Wireless Gaming Mouse ({variant.name}){' '}
              <span className="font-semibold text-[#B12704] tabular-nums">
                S${mainPrice.toFixed(2)}
              </span>
            </span>
          </label>

          {BUNDLE_ACCESSORIES.map((acc) => (
            <label key={acc.id} className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedIds.includes(acc.id)}
                onChange={() => toggleSelection(acc.id)}
                className="mt-0.5 w-4 h-4 accent-[#007185] cursor-pointer"
              />
              <span>
                <span className="text-[#007185] hover:text-[#C7511F]">{acc.title}</span>{' '}
                <span className="font-semibold text-[#B12704] tabular-nums">
                  S${acc.price.toFixed(2)}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
