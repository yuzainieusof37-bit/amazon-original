import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  MapPin,
  ShoppingCart,
  Menu,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';

interface AmazonHeaderProps {
  postalCode: string;
  onOpenLocationModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectSuggestion: (anchorId: string) => void;
  onSelectColorFromNav: (colorId: 'black' | 'white' | 'sentinels') => void;
}

const DEPARTMENTS = [
  'All Departments',
  'Computers & Accessories',
  'Electronics',
  'Video Games',
  'PC Gaming Peripherals',
];

const QUICK_SEARCH_RESULTS = [
  { label: 'Razer Viper V3 Pro — Matte Black (54g)', target: 'product-top', color: 'black' as const },
  { label: 'Razer Viper V3 Pro — Matte White Edition', target: 'product-top', color: 'white' as const },
  { label: 'Razer Viper V3 Pro — Sentinels Edition', target: 'product-top', color: 'sentinels' as const },
  { label: 'Compare Razer Viper V3 Pro vs DeathAdder V3 Pro', target: 'compare-section' },
  { label: 'Technical Specifications & 8000 Hz Polling Details', target: 'tech-details-section' },
  { label: 'Customer Reviews & Singapore Verified Ratings', target: 'reviews-section' },
];

export const AmazonHeader: React.FC<AmazonHeaderProps> = ({
  postalCode,
  onOpenLocationModal,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
  onSelectSuggestion,
  onSelectColorFromNav,
}) => {
  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
  const [searchFocused, setSearchFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [infoNotice, setInfoNotice] = useState<string | null>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredSuggestions = QUICK_SEARCH_RESULTS.filter((item) =>
    searchQuery.trim() === ''
      ? true
      : item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNavClick = (label: string, targetId?: string) => {
    if (targetId) {
      onSelectSuggestion(targetId);
      setSidebarOpen(false);
      return;
    }
    setInfoNotice(`Viewing Amazon.sg — ${label}`);
    setTimeout(() => setInfoNotice(null), 2600);
    setSidebarOpen(false);
  };

  return (
    <>
      <header className="w-full select-none">
        {/* Primary Dark Navy Top Bar (#131921) */}
        <div className="bg-[#131921] text-white px-3 lg:px-5 h-[60px] flex items-center gap-3 lg:gap-4">
          {/* Amazon.sg Logo */}
          <a
            href="#product-top"
            onClick={(e) => {
              e.preventDefault();
              onSelectSuggestion('product-top');
            }}
            className="flex items-start px-2 py-1.5 border border-transparent hover:border-white rounded-sm transition-colors shrink-0"
            aria-label="Amazon.sg Home"
          >
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline">
                <span className="font-display font-extrabold text-[21px] tracking-tight text-white">
                  amazon
                </span>
                <span className="text-[13px] font-medium text-[#FF9900] ml-0.5">.sg</span>
              </div>
              <svg
                viewBox="0 0 88 12"
                className="w-[74px] h-[10px] -mt-0.5 text-[#FF9900]"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 3.5C22 11.5 55 11.5 76 3.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M72 1.5L78.5 3.3L74.5 9"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </a>

          {/* Deliver to Singapore */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="hidden sm:flex items-end gap-1 px-2 py-1.5 border border-transparent hover:border-white rounded-sm transition-colors text-left shrink-0 cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-white mb-0.5 shrink-0" />
            <div className="leading-tight">
              <div className="text-[11px] text-[#CCCCCC] whitespace-nowrap">Deliver to</div>
              <div className="text-[13px] font-bold text-white whitespace-nowrap">
                Singapore {postalCode}
              </div>
            </div>
          </button>

          {/* Search Bar */}
          <div ref={searchBoxRef} className="relative flex-1 min-w-0 max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchFocused(false);
                if (filteredSuggestions[0]) {
                  if (filteredSuggestions[0].color) {
                    onSelectColorFromNav(filteredSuggestions[0].color);
                  }
                  onSelectSuggestion(filteredSuggestions[0].target);
                }
              }}
              className={`flex items-center h-[40px] rounded-md overflow-hidden bg-white ${
                searchFocused ? 'ring-[3px] ring-[#FF9900]' : ''
              }`}
            >
              <div className="hidden md:flex items-center bg-[#E6E6E6] hover:bg-[#D4D4D4] text-[#0F1111] h-full border-r border-[#CDCDCD] shrink-0">
                <select
                  aria-label="Search department"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-transparent text-[12px] font-medium pl-3 pr-2 h-full cursor-pointer focus:outline-none max-w-[148px] truncate"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search Amazon.sg"
                className="flex-1 min-w-0 h-full px-3 text-[14px] text-[#0F1111] placeholder:text-[#565959] focus:outline-none"
                aria-label="Search Amazon.sg"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="px-2 text-[#565959] hover:text-[#0F1111] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                className="bg-[#FEBD69] hover:bg-[#F3A847] text-[#111111] h-full px-3.5 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                aria-label="Go"
              >
                <Search className="w-5 h-5 stroke-[2.25]" />
              </button>
            </form>

            {/* Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute left-0 right-0 top-[42px] bg-white text-[#0F1111] border border-[#D5D9D9] rounded-md shadow-xl z-50 overflow-hidden">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#565959] bg-[#F7FAFA] border-b border-[#E7E7E7]">
                  Quick Jump &amp; Related Searches
                </div>
                {filteredSuggestions.length === 0 ? (
                  <div className="px-4 py-3 text-[13px] text-[#565959]">
                    No matches on this page for &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  filteredSuggestions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        if (item.color) {
                          onSelectColorFromNav(item.color);
                        }
                        onSelectSuggestion(item.target);
                        setSearchFocused(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#F3F3F3] flex items-center gap-2.5 cursor-pointer border-b border-[#F0F2F2] last:border-b-0"
                    >
                      <Search className="w-3.5 h-3.5 text-[#565959] shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Language / Region */}
          <button
            type="button"
            onClick={onOpenLocationModal}
            className="hidden lg:flex items-center gap-1 px-2 py-2 border border-transparent hover:border-white rounded-sm transition-colors cursor-pointer shrink-0"
            title="Singapore (SGD)"
          >
            <span className="text-[14px]" aria-hidden="true">🇸🇬</span>
            <span className="text-[13px] font-bold">EN</span>
            <ChevronDown className="w-3 h-3 text-[#A7ACB2]" />
          </button>

          {/* Account & Lists */}
          <div className="relative hidden md:block shrink-0">
            <button
              type="button"
              onClick={() => setAccountMenuOpen((prev) => !prev)}
              className="flex flex-col text-left px-2 py-1 border border-transparent hover:border-white rounded-sm transition-colors cursor-pointer"
            >
              <span className="text-[11px] text-[#CCCCCC] leading-tight whitespace-nowrap">
                Hello, sign in
              </span>
              <span className="text-[13px] font-bold text-white flex items-center gap-0.5 leading-tight whitespace-nowrap">
                Account &amp; Lists
                <ChevronDown className="w-3 h-3 text-[#A7ACB2]" />
              </span>
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 top-[48px] w-64 bg-white text-[#0F1111] border border-[#D5D9D9] rounded-md shadow-xl p-4 z-50">
                <button
                  type="button"
                  onClick={() => {
                    setAccountMenuOpen(false);
                    handleNavClick('Signed in as Guest (Singapore)');
                  }}
                  className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] rounded-lg text-[13px] font-medium text-[#0F1111] cursor-pointer"
                >
                  Continue with Amazon.sg
                </button>
                <div className="mt-3 pt-3 border-t border-[#E7E7E7] space-y-1.5 text-[13px]">
                  <button
                    type="button"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onSelectSuggestion('reviews-section');
                    }}
                    className="block w-full text-left hover:text-[#C7511F] hover:underline cursor-pointer"
                  >
                    Your Verified Reviews
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onOpenCart();
                    }}
                    className="block w-full text-left hover:text-[#C7511F] hover:underline cursor-pointer"
                  >
                    Your Shopping Cart ({cartCount})
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <button
            type="button"
            onClick={() => onOpenCart()}
            className="hidden lg:flex flex-col text-left px-2 py-1 border border-transparent hover:border-white rounded-sm transition-colors cursor-pointer shrink-0"
          >
            <span className="text-[11px] text-[#CCCCCC] leading-tight whitespace-nowrap">
              Returns
            </span>
            <span className="text-[13px] font-bold text-white leading-tight whitespace-nowrap">
              &amp; Orders
            </span>
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={onOpenCart}
            className="flex items-end gap-1.5 px-2 py-1.5 border border-transparent hover:border-white rounded-sm transition-colors cursor-pointer shrink-0"
            aria-label={`Cart with ${cartCount} items`}
          >
            <div className="relative flex items-center">
              <ShoppingCart className="w-7 h-7 text-white stroke-[1.9]" />
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-[#131921] px-1 text-[14px] font-extrabold text-[#FF9900] tabular-nums leading-none">
                {cartCount}
              </span>
            </div>
            <span className="hidden sm:inline text-[13px] font-bold text-white mb-0.5 whitespace-nowrap">
              Cart
            </span>
          </button>
        </div>

        {/* Secondary Slate Sub-Nav Bar (#232F3E) */}
        <nav
          aria-label="Primary categories"
          className="bg-[#232F3E] text-white px-3 lg:px-5 h-[39px] flex items-center justify-between gap-4 overflow-x-auto"
        >
          <div className="flex items-center gap-1 text-[13px] font-medium whitespace-nowrap">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1 border border-transparent hover:border-white rounded-sm font-bold cursor-pointer shrink-0"
            >
              <Menu className="w-4 h-4" />
              <span>All</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Prime Free Next-Day Delivery', 'buy-box')}
              className="px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Prime
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Best Sellers in Gaming Mice', 'compare-section')}
              className="px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Best Sellers
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("Today's Deals — 15% Off Razer", 'product-top')}
              className="px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Today&apos;s Deals
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Electronics & Peripherals', 'tech-details-section')}
              className="px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Electronics
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Computers & Accessories', 'aplus-section')}
              className="hidden sm:inline-block px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Computers
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Video Games & Esports', 'fbt-section')}
              className="hidden md:inline-block px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Video Games
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('Customer Q&A', 'qna-section')}
              className="hidden lg:inline-block px-2 py-1 border border-transparent hover:border-white rounded-sm cursor-pointer shrink-0"
            >
              Customer Service
            </button>
          </div>

          <button
            type="button"
            onClick={() => onSelectSuggestion('aplus-section')}
            className="hidden xl:flex items-center gap-1.5 text-[13px] font-bold text-[#FF9900] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Razer Esports Store</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Sub-bar Category Breadcrumb & Razer Store Strip */}
        <div className="bg-[#FAFAFA] border-b border-[#DDD] px-4 lg:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-[12px] text-[#565959]">
          <div className="flex items-center flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleNavClick('Electronics')}
              className="hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              Electronics
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => handleNavClick('Computers & Accessories')}
              className="hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              Computers &amp; Accessories
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => handleNavClick('Computer Accessories & Peripherals')}
              className="hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              Computer Accessories &amp; Peripherals
            </button>
            <span>›</span>
            <button
              type="button"
              onClick={() => handleNavClick('Gaming Mice')}
              className="font-semibold text-[#0F1111] hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              Gaming Mice
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[12px]">
            <button
              type="button"
              onClick={() => onSelectSuggestion('compare-section')}
              className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              Compare Razer Pro Mice
            </button>
            <span className="text-[#D5D9D9]">|</span>
            <button
              type="button"
              onClick={() => onSelectSuggestion('reviews-section')}
              className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
            >
              1,482 Customer Ratings
            </button>
          </div>
        </div>

        {/* Transient Notification Strip when navigating */}
        {infoNotice && (
          <div className="bg-[#E7F4F5] border-b border-[#B7D8DC] px-4 py-1.5 text-[12px] text-[#0F1111] text-center">
            {infoNotice}
          </div>
        )}
      </header>

      {/* Slide-out "All" Category Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative w-[320px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="bg-[#232F3E] text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-display font-bold text-[17px]">Hello, Shopper (SG)</span>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1 hover:bg-white/10 rounded cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-5 text-[14px] text-[#0F1111]">
              <div>
                <h3 className="font-bold text-[15px] mb-2">Razer Viper V3 Pro Editions</h3>
                <ul className="space-y-2 text-[#333]">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectColorFromNav('black');
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left py-1 hover:text-[#C7511F] flex items-center justify-between cursor-pointer"
                    >
                      <span>Matte Black (54g)</span>
                      <ChevronRight className="w-4 h-4 text-[#888]" />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectColorFromNav('white');
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left py-1 hover:text-[#C7511F] flex items-center justify-between cursor-pointer"
                    >
                      <span>Matte White (55g)</span>
                      <ChevronRight className="w-4 h-4 text-[#888]" />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectColorFromNav('sentinels');
                        setSidebarOpen(false);
                      }}
                      className="w-full text-left py-1 hover:text-[#C7511F] flex items-center justify-between cursor-pointer"
                    >
                      <span>Sentinels Limited Edition</span>
                      <ChevronRight className="w-4 h-4 text-[#888]" />
                    </button>
                  </li>
                </ul>
              </div>
              <div className="border-t border-[#E7E7E7] pt-4">
                <h3 className="font-bold text-[15px] mb-2">Jump to Page Section</h3>
                <ul className="space-y-2 text-[#333]">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavClick('Frequently Bought Together', 'fbt-section')}
                      className="w-full text-left py-1 hover:text-[#C7511F] cursor-pointer"
                    >
                      Frequently Bought Together
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavClick('From the Manufacturer', 'aplus-section')}
                      className="w-full text-left py-1 hover:text-[#C7511F] cursor-pointer"
                    >
                      From the Manufacturer (Razer A+)
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavClick('Technical Specifications', 'tech-details-section')}
                      className="w-full text-left py-1 hover:text-[#C7511F] cursor-pointer"
                    >
                      Technical Specifications
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleNavClick('Customer Reviews', 'reviews-section')}
                      className="w-full text-left py-1 hover:text-[#C7511F] cursor-pointer"
                    >
                      Customer Reviews (1,482)
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
