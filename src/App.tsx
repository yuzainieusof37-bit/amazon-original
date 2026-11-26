import { useState } from 'react';
import { Star, ChevronDown, ArrowUp, Check } from 'lucide-react';
import {
  COLOR_VARIANTS,
  STYLE_OPTIONS,
  PRODUCT_BULLETS,
  PRODUCT_SPECS,
  INITIAL_REVIEWS,
  ColorVariant,
  StyleOption,
  ComparisonProduct,
  ReviewItem,
} from './data/productData';
import { AmazonHeader } from './components/AmazonHeader';
import { ImageGallery } from './components/ImageGallery';
import { BuyBox } from './components/BuyBox';
import {
  FrequentlyBoughtTogether,
  CartItemPayload,
} from './components/FrequentlyBoughtTogether';
import { APlusShowcase } from './components/APlusShowcase';
import { ReviewsSection } from './components/ReviewsSection';
import {
  CartDrawer,
  LocationModal,
  CheckoutModal,
} from './components/ModalsAndDrawers';

export default function App() {
  const [selectedColorId, setSelectedColorId] = useState<'black' | 'white' | 'sentinels'>('black');
  const [hoveredColorId, setHoveredColorId] = useState<'black' | 'white' | 'sentinels' | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<'mouse-only' | 'grip-kit' | 'pro-bundle'>('mouse-only');
  const [quantity, setQuantity] = useState(1);
  const [postalCode, setPostalCode] = useState('018989');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItemPayload[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItemsOverride, setCheckoutItemsOverride] = useState<CartItemPayload[] | null>(null);
  const [inWishList, setInWishList] = useState(false);
  const [showAllBullets, setShowAllBullets] = useState(true);
  const [installmentsExpanded, setInstallmentsExpanded] = useState(false);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeVariant: ColorVariant =
    COLOR_VARIANTS.find((v) => v.id === (hoveredColorId || selectedColorId)) || COLOR_VARIANTS[0];
  const committedVariant: ColorVariant =
    COLOR_VARIANTS.find((v) => v.id === selectedColorId) || COLOR_VARIANTS[0];
  const activeStyle: StyleOption =
    STYLE_OPTIONS.find((s) => s.id === selectedStyleId) || STYLE_OPTIONS[0];

  const displayPrice = activeVariant.price + activeStyle.priceDelta;
  const displayListPrice = activeVariant.listPrice + activeStyle.priceDelta;
  const discountPct = Math.round(((displayListPrice - displayPrice) / displayListPrice) * 100);
  const wholeDollars = Math.floor(displayPrice);
  const cents = Math.round((displayPrice - wholeDollars) * 100)
    .toString()
    .padStart(2, '0');
  const monthlyInstallment = (displayPrice / 12).toFixed(2);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const mergeIntoCart = (incoming: CartItemPayload[]) => {
    setCartItems((prev) => {
      const next = [...prev];
      incoming.forEach((item) => {
        const idx = next.findIndex((existing) => existing.id === item.id);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            quantity: Math.min(10, next[idx].quantity + item.quantity),
          };
        } else {
          next.push(item);
        }
      });
      return next;
    });
  };

  const handleAddToCart = (includeGiftReceipt: boolean) => {
    const payload: CartItemPayload = {
      id: `${committedVariant.asin}-${activeStyle.id}${includeGiftReceipt ? '-gift' : ''}`,
      title: `Razer Viper V3 Pro e-Sport Ultralight Wireless Gaming Mouse`,
      variantLabel: `${committedVariant.name} · ${activeStyle.label}${
        includeGiftReceipt ? ' (Gift Receipt)' : ''
      }`,
      price: committedVariant.price + activeStyle.priceDelta,
      image: committedVariant.images[0].src,
      quantity,
      asin: committedVariant.asin,
    };
    mergeIntoCart([payload]);
    setCartOpen(true);
  };

  const handleBuyNow = () => {
    const instantItem: CartItemPayload = {
      id: `${committedVariant.asin}-${activeStyle.id}`,
      title: `Razer Viper V3 Pro e-Sport Ultralight Wireless Gaming Mouse`,
      variantLabel: `${committedVariant.name} · ${activeStyle.label}`,
      price: committedVariant.price + activeStyle.priceDelta,
      image: committedVariant.images[0].src,
      quantity,
      asin: committedVariant.asin,
    };
    setCheckoutItemsOverride([instantItem]);
    setCheckoutOpen(true);
  };

  const handleAddBundleToCart = (items: CartItemPayload[]) => {
    mergeIntoCart(items);
    setCartOpen(true);
  };

  const handleAddComparisonToCart = (product: ComparisonProduct) => {
    mergeIntoCart([
      {
        id: product.asin,
        title: product.name,
        variantLabel: `${product.weight} · ${product.pollingRate}`,
        price: product.price,
        image: product.image,
        quantity: 1,
        asin: product.asin,
      },
    ]);
    setCartOpen(true);
  };

  const handleUpdateCartQty = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishList = () => {
    const next = !inWishList;
    setInWishList(next);
    showToast(
      next
        ? `Saved Razer Viper V3 Pro (${committedVariant.name}) to your Wish List`
        : 'Removed from your Wish List'
    );
  };

  const visibleBullets = showAllBullets ? PRODUCT_BULLETS : PRODUCT_BULLETS.slice(0, 4);

  return (
    <div id="product-top" className="min-h-screen flex flex-col bg-white text-[#0F1111]">
      <AmazonHeader
        postalCode={postalCode}
        onOpenLocationModal={() => setLocationModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectSuggestion={scrollToSection}
        onSelectColorFromNav={(colorId) => {
          setSelectedColorId(colorId);
          scrollToSection('product-top');
        }}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-6 pt-5 pb-16">
        {/* Top 3-Column Contiguous Product Detail Fold */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,42%)_minmax(0,1fr)_280px] xl:grid-cols-[minmax(420px,41%)_minmax(0,1fr)_295px] gap-6 xl:gap-8 items-start pb-10">
          {/* Column 1: Sticky Product Gallery */}
          <div>
            <ImageGallery variant={activeVariant} />
          </div>

          {/* Column 2: Title, Ratings, Price, Color/Style Selectors, Specs & Bullets */}
          <div className="min-w-0">
            {/* Brand Store Link */}
            <button
              type="button"
              onClick={() => scrollToSection('aplus-section')}
              className="text-[13px] font-medium text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              Visit the Razer Store
            </button>

            {/* Product Title */}
            <h1 className="font-display text-[21px] sm:text-[24px] font-semibold leading-[1.3] text-[#0F1111] mt-1">
              Razer Viper V3 Pro e-Sport Ultralight Wireless Gaming Mouse: {activeVariant.weightLabel} Lightweight - Symmetrical Design - 8000 Hz HyperPolling - Focus Pro 35K Optical Sensor Gen-2 - Optical Switches Gen-3 - 95Hr Battery ({activeVariant.name})
            </h1>

            {/* Ratings & Search Anchor Row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[13px]">
              <button
                type="button"
                onClick={() => scrollToSection('reviews-section')}
                className="inline-flex items-center gap-1.5 hover:text-[#C7511F] cursor-pointer"
              >
                <span className="font-medium text-[#0F1111] tabular-nums">4.8</span>
                <span className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-[#FFA41C] text-[#DE7921]"
                    />
                  ))}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#565959]" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('reviews-section')}
                className="text-[#007185] hover:text-[#C7511F] hover:underline tabular-nums cursor-pointer"
              >
                1,482 ratings
              </button>

              <span className="text-[#D5D9D9]">|</span>

              <button
                type="button"
                onClick={() => scrollToSection('qna-section')}
                className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
              >
                3 answered questions
              </button>
            </div>

            {/* Amazon's Choice & Sales Velocity */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2.5 text-[12px]">
              <span className="inline-flex items-center px-2 py-0.5 bg-[#232F3E] text-white font-semibold rounded-[3px]">
                Amazon&apos;s{' '}
                <span className="text-[#FF9900] ml-1">Choice</span>
              </span>
              <span className="text-[#565959]">
                for &ldquo;razer wireless esports mouse&rdquo;
              </span>
            </div>

            <p className="mt-2 text-[13px] text-[#0F1111]">
              <span className="font-bold">1K+ bought</span> in past month
            </p>

            {/* Hairline Divider */}
            <hr className="my-3.5 border-[#E7E7E7]" />

            {/* Price Block */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-2.5">
                <span className="text-[24px] font-light text-[#CC0C39] tabular-nums">
                  -{discountPct}%
                </span>
                <div className="flex items-start leading-none text-[#0F1111]">
                  <span className="text-[13px] font-medium pt-1">S$</span>
                  <span className="text-[28px] font-semibold tracking-tight tabular-nums">
                    {wholeDollars}
                  </span>
                  <span className="text-[13px] font-medium pt-1 tabular-nums">
                    {cents}
                  </span>
                </div>
              </div>

              <div className="text-[12px] text-[#565959] tabular-nums">
                List Price:{' '}
                <span className="line-through">S${displayListPrice.toFixed(2)}</span>
              </div>

              <div className="text-[13px] text-[#0F1111] pt-0.5">
                Prices include 9% Singapore GST.{' '}
                <button
                  type="button"
                  onClick={() => setInstallmentsExpanded((prev) => !prev)}
                  className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
                >
                  Pay S${monthlyInstallment}/month for 12 months
                </button>
              </div>

              {installmentsExpanded && (
                <div className="mt-1.5 p-3 rounded border border-[#D5D9D9] bg-[#F7FAFA] text-[12px] text-[#333] leading-relaxed">
                  0% Instalment Payment Plan available with DBS/POSB, OCBC, and UOB credit cards issued in Singapore on orders above S$100.
                </div>
              )}
            </div>

            <hr className="my-4 border-[#E7E7E7]" />

            {/* Colour Variant Selector */}
            <div className="mb-4">
              <div className="text-[13px] mb-2">
                <span className="text-[#565959]">Colour: </span>
                <span className="font-bold text-[#0F1111]">{activeVariant.name}</span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {COLOR_VARIANTS.map((variant) => {
                  const isSelected = variant.id === selectedColorId;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onMouseEnter={() => setHoveredColorId(variant.id)}
                      onMouseLeave={() => setHoveredColorId(null)}
                      onClick={() => setSelectedColorId(variant.id)}
                      className={`flex items-center gap-2.5 p-2 pr-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#007185] bg-[#F7FAFA] ring-1 ring-[#007185]'
                          : 'border-[#D5D9D9] bg-white hover:border-[#888C8C]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded border border-[#E7E7E7] bg-white p-0.5 shrink-0">
                        <img
                          src={variant.images[0].src}
                          alt={variant.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#0F1111] whitespace-nowrap">
                          {variant.name}
                        </div>
                        <div className="text-[12px] text-[#565959] tabular-nums whitespace-nowrap">
                          S${(variant.price + activeStyle.priceDelta).toFixed(2)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Style / Bundle Selector */}
            <div className="mb-5">
              <div className="text-[13px] mb-2">
                <span className="text-[#565959]">Style: </span>
                <span className="font-bold text-[#0F1111]">{activeStyle.label}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {STYLE_OPTIONS.map((style) => {
                  const isSelected = style.id === selectedStyleId;
                  const styleTotal = committedVariant.price + style.priceDelta;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setSelectedStyleId(style.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#007185] bg-[#F7FAFA] ring-1 ring-[#007185]'
                          : 'border-[#D5D9D9] bg-white hover:border-[#888C8C]'
                      }`}
                    >
                      <div className="text-[13px] font-semibold text-[#0F1111] leading-snug">
                        {style.label}
                      </div>
                      <div className="text-[12px] text-[#B12704] font-semibold mt-1 tabular-nums">
                        S${styleTotal.toFixed(2)}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-1.5 text-[12px] text-[#565959]">{activeStyle.description}</p>
            </div>

            {/* Key Specs Overview Grid */}
            <div className="border-t border-b border-[#E7E7E7] py-3.5 mb-4">
              <dl className="grid grid-cols-[160px_1fr] gap-y-2 text-[13px]">
                {PRODUCT_SPECS.map((spec) => (
                  <div key={spec.label} className="contents">
                    <dt className="font-bold text-[#0F1111] pr-3">{spec.label}</dt>
                    <dd className="text-[#0F1111]">
                      {spec.label === 'Colour' ? activeVariant.name : spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* About this item */}
            <div>
              <h2 className="text-[16px] font-bold text-[#0F1111] mb-2.5">
                About this item
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-[14px] text-[#0F1111] leading-[1.5]">
                {visibleBullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px]">
                <button
                  type="button"
                  onClick={() => setShowAllBullets((prev) => !prev)}
                  className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
                >
                  {showAllBullets ? 'Show fewer details' : 'Show all 6 key features'}
                </button>
                <span className="text-[#D5D9D9]">|</span>
                <button
                  type="button"
                  onClick={() => scrollToSection('tech-details-section')}
                  className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
                >
                  See more product details
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: Sticky Right-Hand Buy Box */}
          <div>
            <BuyBox
              variant={committedVariant}
              styleOption={activeStyle}
              postalCode={postalCode}
              onOpenLocationModal={() => setLocationModalOpen(true)}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              inWishList={inWishList}
              onToggleWishList={handleToggleWishList}
            />
          </div>
        </div>

        {/* Lower Page Sections */}
        <FrequentlyBoughtTogether
          variant={committedVariant}
          styleOption={activeStyle}
          onAddBundleToCart={handleAddBundleToCart}
        />

        <APlusShowcase
          onAddComparisonToCart={handleAddComparisonToCart}
          onSelectColorVariant={(colorId) => {
            setSelectedColorId(colorId);
            scrollToSection('product-top');
          }}
        />

        <div className="mt-10">
          <ReviewsSection
            reviews={reviews}
            onAddReview={(rev) => setReviews((prev) => [rev, ...prev])}
            selectedVariantLabel={`Colour: ${committedVariant.name} | Style: ${activeStyle.label}`}
          />
        </div>
      </main>

      {/* Mobile Sticky Bottom Bar (Compact, <15% viewport height) */}
      <div className="lg:hidden sticky bottom-0 z-30 bg-white border-t border-[#D5D9D9] px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="text-[16px] font-bold text-[#0F1111] tabular-nums leading-tight">
            S${displayPrice.toFixed(2)}
          </div>
          <div className="text-[11px] text-[#007600] font-medium">
            Prime Free Delivery
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleAddToCart(false)}
          className="px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-semibold text-[#0F1111] cursor-pointer whitespace-nowrap"
        >
          Add to Cart
        </button>
      </div>

      {/* Amazon.sg Footer */}
      <footer className="bg-[#232F3E] text-white mt-auto">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full py-3.5 bg-[#37475A] hover:bg-[#485769] text-[13px] font-medium text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to top</span>
        </button>

        <div className="max-w-[1000px] mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8 text-[13px]">
          <div>
            <h3 className="font-bold text-white mb-2.5 text-[15px]">Get to Know Us</h3>
            <ul className="space-y-1.5 text-[#DDD]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('aplus-section')}
                  className="hover:underline cursor-pointer"
                >
                  About Amazon Singapore
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('compare-section')}
                  className="hover:underline cursor-pointer"
                >
                  Amazon Science
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2.5 text-[15px]">Shop with Us</h3>
            <ul className="space-y-1.5 text-[#DDD]">
              <li>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  className="hover:underline cursor-pointer"
                >
                  Your Shopping Cart
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="hover:underline cursor-pointer"
                >
                  Singapore Delivery Rates
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2.5 text-[15px]">Razer Official Store</h3>
            <ul className="space-y-1.5 text-[#DDD]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('tech-details-section')}
                  className="hover:underline cursor-pointer"
                >
                  2-Year Local SG Warranty
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('qna-section')}
                  className="hover:underline cursor-pointer"
                >
                  Technical Support Q&amp;A
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2.5 text-[15px]">Let Us Help You</h3>
            <ul className="space-y-1.5 text-[#DDD]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('reviews-section')}
                  className="hover:underline cursor-pointer"
                >
                  15-Day Free Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(true)}
                  className="hover:underline cursor-pointer"
                >
                  Manage Postal Code ({postalCode})
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#131A22] py-6 px-4 text-center text-[12px] text-[#CCC] border-t border-[#3A4553]">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="font-display font-bold text-[16px] text-white">
              amazon<span className="text-[#FF9900]">.sg</span>
            </span>
            <span className="text-[#565959]">|</span>
            <span>Singapore (SGD · English)</span>
          </div>
          <p className="text-[#999]">
            Amazon Singapore Storefront Experience · ASIN B0G5QBTC2Q
          </p>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-16 lg:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F1111] text-white text-[13px] px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2">
          <Check className="w-4 h-4 text-[#44D62C]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Drawers & Modals */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutItemsOverride(null);
          setCheckoutOpen(true);
        }}
      />

      <LocationModal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        currentPostal={postalCode}
        onSavePostal={(code) => {
          setPostalCode(code);
          showToast(`Delivery location updated to Singapore ${code}`);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          setCheckoutItemsOverride(null);
        }}
        items={checkoutItemsOverride || cartItems}
        postalCode={postalCode}
        onClearCartAfterOrder={() => {
          if (!checkoutItemsOverride) {
            setCartItems([]);
          }
        }}
      />
    </div>
  );
}
