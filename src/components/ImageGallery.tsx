import React, { useState, useEffect } from 'react';
import { Expand, Share2, Check, X, ZoomIn } from 'lucide-react';
import { ColorVariant } from '../data/productData';

interface ImageGalleryProps {
  variant: ColorVariant;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ variant }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveIndex(0);
  }, [variant.id]);

  const currentImage = variant.images[activeIndex] || variant.images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomOrigin({ x, y });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <>
      <div className="lg:sticky lg:top-5 flex flex-col-reverse sm:flex-row gap-3">
        {/* Vertical Thumbnails Strip */}
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 shrink-0">
          {variant.images.map((img, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={img.id}
                type="button"
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`w-14 h-14 sm:w-12 sm:h-12 rounded-lg border overflow-hidden bg-white p-0.5 transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'border-[#007185] ring-2 ring-[#007185]/30'
                    : 'border-[#BBBFBF] hover:border-[#007185]'
                }`}
                aria-label={`View image ${idx + 1}: ${img.caption}`}
              >
                {imgErrors[img.id] ? (
                  <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-[10px] text-zinc-500">
                    {idx + 1}
                  </div>
                ) : (
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    onError={() => setImgErrors((prev) => ({ ...prev, [img.id]: true }))}
                    className="w-full h-full object-cover rounded-[5px]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Image Viewport */}
        <div className="flex-1 min-w-0">
          <div className="relative bg-white border border-[#E7E7E7] rounded-lg overflow-hidden">
            {/* Top-Right Share & Expand Buttons */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-white/95 border border-[#D5D9D9] shadow-sm flex items-center justify-center text-[#0F1111] hover:bg-[#F7FAFA] transition-colors cursor-pointer"
                title="Share product link"
                aria-label="Share product link"
              >
                {copiedLink ? (
                  <Check className="w-4 h-4 text-[#067D62]" />
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="w-9 h-9 rounded-full bg-white/95 border border-[#D5D9D9] shadow-sm flex items-center justify-center text-[#0F1111] hover:bg-[#F7FAFA] transition-colors cursor-pointer"
                title="Open full view"
                aria-label="Open full view"
              >
                <Expand className="w-4 h-4" />
              </button>
            </div>

            {copiedLink && (
              <div className="absolute top-14 right-3 z-20 bg-[#0F1111] text-white text-[11px] px-2.5 py-1 rounded shadow">
                Link copied
              </div>
            )}

            {/* Main Interactive Zoom Frame */}
            <div
              onMouseEnter={() => setZoomActive(true)}
              onMouseLeave={() => setZoomActive(false)}
              onMouseMove={handleMouseMove}
              onClick={() => setLightboxOpen(true)}
              className="relative aspect-square w-full bg-white flex items-center justify-center cursor-zoom-in overflow-hidden"
            >
              {imgErrors[currentImage.id] ? (
                <div className="w-full h-full bg-gradient-to-br from-zinc-50 to-zinc-200 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-[14px] font-semibold text-[#0F1111]">
                    Razer Viper V3 Pro ({variant.name})
                  </span>
                  <span className="text-[12px] text-[#565959] mt-1">
                    {currentImage.caption}
                  </span>
                </div>
              ) : (
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImgErrors((prev) => ({ ...prev, [currentImage.id]: true }))
                  }
                  style={
                    zoomActive
                      ? {
                          transform: 'scale(1.65)',
                          transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                        }
                      : undefined
                  }
                  className="w-full h-full object-contain transition-transform duration-150 ease-out"
                />
              )}
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-2 text-[12px] text-[#565959] px-1">
            <span className="truncate">{currentImage.caption}</span>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1 text-[#007185] hover:text-[#C7511F] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Click to enlarge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#D5D9D9]">
            <div className="px-5 py-3.5 border-b border-[#E7E7E7] flex items-center justify-between">
              <div className="text-[15px] font-bold text-[#0F1111] truncate">
                Razer Viper V3 Pro — {variant.name} ({activeIndex + 1} of {variant.images.length})
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-1.5 rounded-lg hover:bg-[#F3F3F3] text-[#0F1111] cursor-pointer"
                aria-label="Close gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-4 p-5 bg-white items-center">
              <div className="aspect-square max-h-[65vh] mx-auto w-full flex items-center justify-center bg-white">
                <img
                  src={currentImage.src}
                  alt={currentImage.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-3">
                <p className="text-[13px] font-medium text-[#0F1111]">
                  {currentImage.caption}
                </p>
                <div className="grid grid-cols-4 md:grid-cols-2 gap-2">
                  {variant.images.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`aspect-square rounded border overflow-hidden p-0.5 cursor-pointer ${
                        idx === activeIndex
                          ? 'border-[#007185] ring-2 ring-[#007185]/30'
                          : 'border-[#D5D9D9]'
                      }`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
