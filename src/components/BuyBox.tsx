import React, { useState } from 'react';
import { MapPin, Lock, ChevronDown, Check, Heart, ShieldCheck } from 'lucide-react';
import { ColorVariant, StyleOption } from '../data/productData';

interface BuyBoxProps {
  variant: ColorVariant;
  styleOption: StyleOption;
  postalCode: string;
  onOpenLocationModal: () => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: (includeGiftReceipt: boolean) => void;
  onBuyNow: () => void;
  inWishList: boolean;
  onToggleWishList: () => void;
}

export const BuyBox: React.FC<BuyBoxProps> = ({
  variant,
  styleOption,
  postalCode,
  onOpenLocationModal,
  quantity,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  inWishList,
  onToggleWishList,
}) => {
  const [giftReceipt, setGiftReceipt] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [returnsExpanded, setReturnsExpanded] = useState(false);

  const unitPrice = variant.price + styleOption.priceDelta;
  const wholeDollars = Math.floor(unitPrice);
  const cents = Math.round((unitPrice - wholeDollars) * 100)
    .toString()
    .padStart(2, '0');

  const handleAdd = () => {
    onAddToCart(giftReceipt);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <aside
      id="buy-box"
      className="lg:sticky lg:top-5 border border-[#D5D9D9] rounded-lg p-4.5 bg-white text-[#0F1111]"
    >
      {/* Price Header */}
      <div className="flex items-start leading-none mb-2">
        <span className="text-[13px] font-medium pt-1">S$</span>
        <span className="text-[28px] font-semibold tracking-tight tabular-nums">
          {wholeDollars}
        </span>
        <span className="text-[13px] font-medium pt-1 tabular-nums">{cents}</span>
      </div>

      {/* Free Returns + GST info */}
      <div className="mb-3">
        <button
          type="button"
          onClick={() => setReturnsExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
        >
          <span>FREE Returns</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${
              returnsExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
        {returnsExpanded && (
          <div className="mt-1.5 p-2.5 bg-[#F7FAFA] border border-[#D5D9D9] rounded text-[12px] text-[#333] leading-relaxed">
            Return this item for free within 15 days of receipt via SingPost POPStation or courier pickup in Singapore.
          </div>
        )}
      </div>

      {/* Prime & Delivery Estimate */}
      <div className="space-y-1.5 text-[13px] leading-snug mb-3">
        <div className="flex items-center gap-1.5">
          <span className="font-display font-extrabold italic text-[#00A8E1] text-[14px] tracking-tight">
            prime
          </span>
          <span className="text-[#565959]">Same-Day / Next-Day</span>
        </div>

        <p>
          <span className="font-semibold">FREE delivery</span>{' '}
          <span className="font-bold">Tomorrow</span>. Order within{' '}
          <span className="text-[#007600] font-medium tabular-nums">8 hrs 24 mins</span>
        </p>

        <button
          type="button"
          onClick={onOpenLocationModal}
          className="flex items-center gap-1.5 text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer pt-0.5"
        >
          <MapPin className="w-3.5 h-3.5 text-[#0F1111] shrink-0" />
          <span>Deliver to Singapore {postalCode}</span>
        </button>
      </div>

      {/* Stock Availability */}
      <div className="mb-3">
        {variant.stockCount ? (
          <p className="text-[16px] font-medium text-[#B12704]">
            Only {variant.stockCount} left in stock — order soon.
          </p>
        ) : (
          <p className="text-[18px] font-medium text-[#007600]">In Stock</p>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="mb-3">
        <label className="flex items-center justify-between w-full px-3 py-2 bg-[#F0F2F2] hover:bg-[#E3E6E6] border border-[#D5D9D9] rounded-lg text-[13px] shadow-xs cursor-pointer">
          <span className="text-[#0F1111]">Quantity:</span>
          <select
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            aria-label="Quantity"
            className="bg-transparent font-semibold text-[#0F1111] focus:outline-none cursor-pointer tabular-nums"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Primary Action CTAs */}
      <div className="space-y-2 mb-3.5">
        <button
          type="button"
          onClick={handleAdd}
          className="w-full py-2.5 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] border border-[#FCD200] text-[14px] font-medium text-[#0F1111] shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-[#067D62]" />
              <span>Added to Cart</span>
            </>
          ) : (
            <span>Add to Cart</span>
          )}
        </button>

        <button
          type="button"
          onClick={onBuyNow}
          className="w-full py-2.5 px-4 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] active:bg-[#E47911] border border-[#FF8F00] text-[14px] font-medium text-[#0F1111] shadow-xs transition-colors cursor-pointer"
        >
          Buy Now
        </button>
      </div>

      {/* Secure Transaction & Seller Matrix */}
      <div className="space-y-2 text-[12px] border-t border-[#E7E7E7] pt-3">
        <div className="flex items-center gap-1.5 text-[#007185]">
          <Lock className="w-3.5 h-3.5 text-[#565959] shrink-0" />
          <span>Secure transaction</span>
        </div>

        <div className="grid grid-cols-[88px_1fr] gap-y-1.5 text-[12px] leading-snug">
          <span className="text-[#565959]">Ships from</span>
          <span className="text-[#0F1111] font-medium">Amazon.sg</span>

          <span className="text-[#565959]">Sold by</span>
          <span className="text-[#007185] font-medium">Razer Official Store SG</span>

          <span className="text-[#565959]">Returns</span>
          <span className="text-[#007185]">15-day Returnable</span>

          <span className="text-[#565959]">Warranty</span>
          <span className="text-[#0F1111] inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#067D62] shrink-0" />
            2-Year Local SG
          </span>
        </div>

        <label className="flex items-center gap-2 pt-1.5 text-[13px] text-[#0F1111] cursor-pointer">
          <input
            type="checkbox"
            checked={giftReceipt}
            onChange={(e) => setGiftReceipt(e.target.checked)}
            className="w-4 h-4 accent-[#007185] rounded cursor-pointer"
          />
          <span>Add a gift receipt for easy returns</span>
        </label>
      </div>

      {/* Add to Wish List */}
      <div className="mt-3.5 pt-3 border-t border-[#E7E7E7]">
        <button
          type="button"
          onClick={onToggleWishList}
          className={`w-full py-1.5 px-3 rounded-lg border text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            inWishList
              ? 'bg-[#FFF5F5] border-[#C7511F] text-[#C7511F]'
              : 'bg-white hover:bg-[#F7FAFA] border-[#D5D9D9] text-[#0F1111]'
          }`}
        >
          <Heart className={`w-4 h-4 ${inWishList ? 'fill-[#C7511F]' : ''}`} />
          <span>{inWishList ? 'Added to Wish List' : 'Add to Wish List'}</span>
        </button>
      </div>
    </aside>
  );
};
