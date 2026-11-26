import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';
import { CartItemPayload } from './FrequentlyBoughtTogether';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItemPayload[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/55" onClick={onClose} />
      <aside className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="bg-[#232F3E] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FF9900]" />
            <h2 className="font-display font-bold text-[17px]">
              Shopping Cart ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free SG Delivery Banner */}
        <div className="px-5 py-2.5 bg-[#E7F4F5] border-b border-[#B7D8DC] text-[12px] text-[#0F1111] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#067D62] shrink-0" />
          <span>
            Your order qualifies for <span className="font-bold text-[#067D62]">FREE Prime Delivery</span> in Singapore.
          </span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-[16px] font-bold text-[#0F1111]">
                Your Amazon.sg Cart is empty
              </p>
              <p className="text-[13px] text-[#565959]">
                Add the Razer Viper V3 Pro or bundle accessories to get started.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3.5 pb-4 border-b border-[#E7E7E7] last:border-b-0"
              >
                <div className="w-20 h-20 border border-[#E7E7E7] rounded bg-white p-1.5 shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[13px] font-semibold text-[#0F1111] line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[12px] text-[#565959] mt-0.5">{item.variantLabel}</p>
                  <p className="text-[14px] font-bold text-[#B12704] mt-1 tabular-nums">
                    S${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <select
                      aria-label={`Quantity for ${item.title}`}
                      value={item.quantity}
                      onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
                      className="bg-[#F0F2F2] border border-[#D5D9D9] rounded px-2 py-1 text-[12px] font-medium cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          Qty: {n}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="inline-flex items-center gap-1 text-[12px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Action */}
        {items.length > 0 && (
          <div className="border-t border-[#D5D9D9] p-5 bg-[#FAFAFA] space-y-3">
            <div className="flex items-center justify-between text-[16px]">
              <span>Subtotal ({totalCount} {totalCount === 1 ? 'item' : 'items'}):</span>
              <span className="font-bold text-[#0F1111] tabular-nums">
                S${subtotal.toFixed(2)}
              </span>
            </div>
            <p className="text-[11px] text-[#565959]">Includes 9% Singapore GST.</p>
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-2.5 px-4 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[14px] font-semibold text-[#0F1111] cursor-pointer shadow-xs"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  currentPostal: string;
  onSavePostal: (postal: string) => void;
}

const SG_PRESETS = [
  { code: '018989', area: 'Marina Bay / Central' },
  { code: '238801', area: 'Orchard Road' },
  { code: '529510', area: 'Tampines Regional Centre' },
  { code: '609601', area: 'Jurong East Gateway' },
];

export const LocationModal: React.FC<LocationModalProps> = ({
  open,
  onClose,
  currentPostal,
  onSavePostal,
}) => {
  const [inputCode, setInputCode] = useState(currentPostal);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputCode.trim();
    if (!/^\d{6}$/.test(cleaned)) {
      setError('Please enter a valid 6-digit Singapore postal code.');
      return;
    }
    setError('');
    onSavePostal(cleaned);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full border border-[#D5D9D9] shadow-2xl overflow-hidden">
        <div className="bg-[#F0F2F2] px-5 py-3.5 border-b border-[#D5D9D9] flex items-center justify-between">
          <h3 className="font-bold text-[15px] text-[#0F1111] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#007185]" />
            <span>Choose your Singapore location</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-black/5 cursor-pointer"
            aria-label="Close location modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-[13px]">
          <p className="text-[#565959]">
            Delivery options and Prime Next-Day cutoffs vary by Singapore postal district.
          </p>

          <div>
            <label className="block font-semibold text-[#0F1111] mb-1.5">
              Enter a 6-digit Singapore postal code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 018989"
                className="flex-1 px-3 py-2 border border-[#D5D9D9] rounded-md font-mono-num focus:outline-none focus:ring-2 focus:ring-[#007185]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] font-semibold text-[#0F1111] cursor-pointer"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-[#B12704] text-[12px] mt-1.5">{error}</p>}
          </div>

          <div className="pt-2 border-t border-[#E7E7E7]">
            <div className="text-[12px] font-semibold text-[#565959] mb-2">
              Quick Singapore Districts
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SG_PRESETS.map((preset) => (
                <button
                  key={preset.code}
                  type="button"
                  onClick={() => {
                    onSavePostal(preset.code);
                    onClose();
                  }}
                  className="text-left p-2 rounded border border-[#D5D9D9] hover:border-[#007185] hover:bg-[#F7FAFA] cursor-pointer"
                >
                  <div className="font-mono-num font-bold text-[#0F1111]">{preset.code}</div>
                  <div className="text-[11px] text-[#565959] truncate">{preset.area}</div>
                </button>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItemPayload[];
  postalCode: string;
  onClearCartAfterOrder: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  open,
  onClose,
  items,
  postalCode,
  onClearCartAfterOrder,
}) => {
  const [fullName, setFullName] = useState('Alex Tan');
  const [street, setStreet] = useState('10 Bayfront Avenue, #12-04');
  const [phone, setPhone] = useState('+65 9123 4567');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paynow'>('card');
  const [orderPlacedId, setOrderPlacedId] = useState<string | null>(null);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `SG-408-${Math.floor(1000000 + Math.random() * 8999999)}`;
    setOrderPlacedId(orderNum);
    onClearCartAfterOrder();
  };

  const handleClose = () => {
    setOrderPlacedId(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-xl w-full border border-[#D5D9D9] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="bg-[#232F3E] text-white px-5 py-3.5 flex items-center justify-between">
          <h3 className="font-display font-bold text-[16px]">
            {orderPlacedId ? 'Order Confirmed — Amazon.sg' : 'Amazon.sg Express Checkout'}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="p-1 rounded hover:bg-white/10 cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderPlacedId ? (
          <div className="p-6 space-y-4 overflow-y-auto">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[#E6F4F1] border border-[#9FD3C7]">
              <CheckCircle2 className="w-6 h-6 text-[#067D62] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[16px] text-[#067D62]">
                  Order placed, thank you!
                </h4>
                <p className="text-[13px] text-[#0F1111] mt-1">
                  Order <span className="font-mono-num font-bold">#{orderPlacedId}</span> is confirmed for Prime Next-Day delivery to{' '}
                  <span className="font-semibold">
                    {street}, Singapore {postalCode}
                  </span>
                  .
                </p>
              </div>
            </div>

            <div className="border border-[#E7E7E7] rounded-lg p-4 text-[13px] space-y-2">
              <div className="flex justify-between">
                <span className="text-[#565959]">Recipient</span>
                <span className="font-medium text-[#0F1111]">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#565959]">Payment Method</span>
                <span className="font-medium text-[#0F1111]">
                  {paymentMethod === 'card' ? 'Visa / Mastercard (SGD)' : 'PayNow QR Instant'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#565959]">Guaranteed Delivery</span>
                <span className="font-bold text-[#007600]">Tomorrow by 10:00 PM</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[14px] font-semibold text-[#0F1111] cursor-pointer"
            >
              Continue Shopping on Amazon.sg
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="p-5 space-y-4 overflow-y-auto text-[13px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Full Name (Singapore)</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_130px] gap-3">
              <div>
                <label className="block font-semibold mb-1">Street Address / Unit No.</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Postal Code</label>
                <input
                  type="text"
                  readOnly
                  value={postalCode}
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md bg-[#F7FAFA] font-mono-num"
                />
              </div>
            </div>

            <div>
              <span className="block font-semibold mb-1.5">Payment Method</span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#007185] bg-[#F7FAFA] ring-1 ring-[#007185]'
                      : 'border-[#D5D9D9]'
                  }`}
                >
                  <div className="font-bold">Credit / Debit Card</div>
                  <div className="text-[11px] text-[#565959]">DBS, OCBC, UOB, Visa</div>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paynow')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer ${
                    paymentMethod === 'paynow'
                      ? 'border-[#007185] bg-[#F7FAFA] ring-1 ring-[#007185]'
                      : 'border-[#D5D9D9]'
                  }`}
                >
                  <div className="font-bold">PayNow SG</div>
                  <div className="text-[11px] text-[#565959]">Instant QR Verification</div>
                </button>
              </div>
            </div>

            <div className="border-t border-[#E7E7E7] pt-3 space-y-1.5">
              <div className="flex justify-between text-[#565959]">
                <span>Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span>
                <span className="tabular-nums">S${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#565959]">
                <span>Prime Delivery (Singapore):</span>
                <span className="text-[#007600] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-[16px] font-bold text-[#B12704] pt-1 border-t border-[#E7E7E7]">
                <span>Order Total (incl. 9% GST):</span>
                <span className="tabular-nums">S${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#565959]">
              <ShieldCheck className="w-4 h-4 text-[#067D62] shrink-0" />
              <span>2-Year Official Razer Singapore Warranty included.</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] border border-[#FF8F00] text-[14px] font-semibold text-[#0F1111] cursor-pointer"
            >
              Place your order in SGD
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
