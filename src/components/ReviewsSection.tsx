import React, { useState } from 'react';
import { Star, ThumbsUp, Search, X, CheckCircle2 } from 'lucide-react';
import {
  QNA_ITEMS,
  RATING_DISTRIBUTION,
  ReviewItem,
} from '../data/productData';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onAddReview: (review: ReviewItem) => void;
  selectedVariantLabel: string;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onAddReview,
  selectedVariantLabel,
}) => {
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [reviewSearch, setReviewSearch] = useState('');
  const [sortBy, setSortBy] = useState<'helpful' | 'recent'>('helpful');
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});
  const [qnaVotes, setQnaVotes] = useState<Record<string, boolean>>({});
  const [writeModalOpen, setWriteModalOpen] = useState(false);

  // New Review Form State
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const filteredReviews = reviews
    .filter((r) => (starFilter ? r.rating === starFilter : true))
    .filter((r) =>
      reviewSearch.trim() === ''
        ? true
        : r.title.toLowerCase().includes(reviewSearch.toLowerCase()) ||
          r.body.toLowerCase().includes(reviewSearch.toLowerCase()) ||
          r.author.toLowerCase().includes(reviewSearch.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'helpful') {
        return b.helpfulCount - a.helpfulCount;
      }
      return b.id.localeCompare(a.id);
    });

  const handleToggleHelpful = (id: string) => {
    setHelpfulVoted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    const item: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim() || 'Singapore Customer',
      rating: newRating,
      title: newTitle.trim(),
      date: '25 November 2026',
      location: 'Singapore',
      variantLabel: selectedVariantLabel,
      verified: true,
      body: newBody.trim(),
      helpfulCount: 1,
    };
    onAddReview(item);
    setNewAuthor('');
    setNewRating(5);
    setNewTitle('');
    setNewBody('');
    setWriteModalOpen(false);
    setStarFilter(null);
  };

  return (
    <div className="space-y-10">
      {/* Customer Questions & Answers */}
      <section
        id="qna-section"
        className="border-t border-[#E7E7E7] pt-6"
        aria-labelledby="qna-heading"
      >
        <h2 id="qna-heading" className="text-[21px] font-bold text-[#0F1111] mb-4">
          Customer questions &amp; answers
        </h2>

        <div className="space-y-4">
          {QNA_ITEMS.map((item) => {
            const voted = !!qnaVotes[item.id];
            return (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-3 pb-4 border-b border-[#F0F2F2] last:border-b-0"
              >
                <div className="flex md:flex-col items-center md:items-start gap-2 text-[12px] text-[#565959]">
                  <button
                    type="button"
                    onClick={() =>
                      setQnaVotes((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className={`px-2.5 py-1 rounded border text-[12px] font-medium cursor-pointer transition-colors ${
                      voted
                        ? 'border-[#007185] bg-[#E7F4F5] text-[#007185]'
                        : 'border-[#D5D9D9] bg-white hover:bg-[#F7FAFA] text-[#0F1111]'
                    }`}
                  >
                    ▲ {item.votes + (voted ? 1 : 0)}
                  </button>
                  <span className="text-[11px]">votes</span>
                </div>

                <div className="space-y-1.5 text-[14px]">
                  <div className="font-semibold text-[#0F1111]">
                    <span className="inline-block w-20 text-[#565959] font-bold">Question:</span>
                    {item.question}
                  </div>
                  <div className="text-[#0F1111] leading-relaxed">
                    <span className="inline-block w-20 text-[#565959] font-bold">Answer:</span>
                    {item.answer}
                    <div className="md:pl-20 mt-1 text-[12px] text-[#565959]">
                      By {item.author}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Customer Reviews */}
      <section
        id="reviews-section"
        className="border-t border-[#E7E7E7] pt-6"
        aria-labelledby="reviews-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[310px_1fr] gap-10">
          {/* Left Column: Rating Histogram & Write Review CTA */}
          <div>
            <h2 id="reviews-heading" className="text-[21px] font-bold text-[#0F1111] mb-2">
              Customer reviews
            </h2>
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-[#FFA41C] text-[#DE7921]"
                  />
                ))}
              </div>
              <span className="text-[18px] font-semibold text-[#0F1111] tabular-nums">
                4.8 out of 5
              </span>
            </div>
            <p className="text-[13px] text-[#565959] mb-4 tabular-nums">
              1,482 global ratings
            </p>

            {/* Interactive Star Filter Bars */}
            <div className="space-y-2.5 mb-5">
              {RATING_DISTRIBUTION.map((row) => {
                const isActive = starFilter === row.stars;
                return (
                  <button
                    key={row.stars}
                    type="button"
                    onClick={() =>
                      setStarFilter((prev) => (prev === row.stars ? null : row.stars))
                    }
                    className={`w-full flex items-center gap-3 text-[13px] group cursor-pointer rounded px-1 py-0.5 transition-colors ${
                      isActive ? 'bg-[#FEF8F2] ring-1 ring-[#FF9900]' : 'hover:bg-[#F7FAFA]'
                    }`}
                  >
                    <span className="w-12 text-left text-[#007185] group-hover:text-[#C7511F] group-hover:underline whitespace-nowrap shrink-0">
                      {row.stars} star
                    </span>
                    <div className="flex-1 h-5 bg-[#F0F2F2] border border-[#D5D9D9] rounded-sm overflow-hidden">
                      <div
                        className="h-full bg-[#FFA41C]"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-[#007185] tabular-nums shrink-0">
                      {row.percentage}%
                    </span>
                  </button>
                );
              })}
            </div>

            {starFilter && (
              <button
                type="button"
                onClick={() => setStarFilter(null)}
                className="mb-4 text-[13px] text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer"
              >
                Clear {starFilter}-star filter
              </button>
            )}

            <div className="border-t border-[#E7E7E7] pt-5">
              <h3 className="text-[17px] font-bold text-[#0F1111] mb-1">
                Review this product
              </h3>
              <p className="text-[13px] text-[#565959] mb-3">
                Share your thoughts with other shoppers on Amazon.sg
              </p>
              <button
                type="button"
                onClick={() => setWriteModalOpen(true)}
                className="w-full py-2 px-4 rounded-lg border border-[#D5D9D9] bg-white hover:bg-[#F7FAFA] text-[13px] font-medium text-[#0F1111] shadow-xs transition-colors cursor-pointer"
              >
                Write a customer review
              </button>
            </div>
          </div>

          {/* Right Column: Review Filter Controls & Feed */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-[#E7E7E7]">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-[#565959] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  placeholder="Search customer reviews..."
                  className="w-full pl-9 pr-3 py-1.5 text-[13px] border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>

              <div className="flex items-center gap-2 text-[13px]">
                <label htmlFor="review-sort" className="text-[#565959]">
                  Sort by:
                </label>
                <select
                  id="review-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'helpful' | 'recent')}
                  className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-md px-2.5 py-1.5 text-[13px] font-medium text-[#0F1111] cursor-pointer focus:outline-none"
                >
                  <option value="helpful">Top reviews</option>
                  <option value="recent">Most recent</option>
                </select>
              </div>
            </div>

            <h3 className="text-[17px] font-bold text-[#0F1111] mb-4">
              {starFilter
                ? `Top ${starFilter}-star reviews from Singapore`
                : 'Top reviews from Singapore'}
            </h3>

            {filteredReviews.length === 0 ? (
              <div className="p-6 border border-[#E7E7E7] rounded-lg text-center text-[14px] text-[#565959]">
                No reviews match your current filter.
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((rev) => {
                  const isVoted = !!helpfulVoted[rev.id];
                  const displayHelpful = rev.helpfulCount + (isVoted ? 1 : 0);
                  return (
                    <article
                      key={rev.id}
                      className="pb-6 border-b border-[#E7E7E7] last:border-b-0"
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <div className="w-8 h-8 rounded-full bg-[#E3E6E6] text-[#232F3E] text-[12px] font-bold flex items-center justify-center shrink-0">
                          {rev.author
                            .split(' ')
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()}
                        </div>
                        <span className="text-[13px] font-medium text-[#0F1111]">
                          {rev.author}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= rev.rating
                                  ? 'fill-[#FFA41C] text-[#DE7921]'
                                  : 'text-[#CCCCCC]'
                              }`}
                            />
                          ))}
                        </div>
                        <h4 className="text-[14px] font-bold text-[#0F1111]">{rev.title}</h4>
                      </div>

                      <div className="text-[12px] text-[#565959] mb-1.5">
                        Reviewed in {rev.location} on {rev.date}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[12px] mb-2.5">
                        <span className="text-[#565959]">{rev.variantLabel}</span>
                        {rev.verified && (
                          <>
                            <span className="text-[#D5D9D9]">|</span>
                            <span className="font-bold text-[#C45500]">
                              Verified Purchase
                            </span>
                          </>
                        )}
                      </div>

                      <p className="text-[14px] text-[#0F1111] leading-relaxed mb-3 max-w-3xl">
                        {rev.body}
                      </p>

                      <div className="flex items-center gap-3 text-[12px]">
                        <span className="text-[#565959] tabular-nums">
                          {displayHelpful} people found this helpful
                        </span>
                        <button
                          type="button"
                          onClick={() => handleToggleHelpful(rev.id)}
                          className={`px-3.5 py-1 rounded-md border text-[12px] font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                            isVoted
                              ? 'border-[#067D62] bg-[#E6F4F1] text-[#067D62]'
                              : 'border-[#D5D9D9] bg-white hover:bg-[#F7FAFA] text-[#0F1111]'
                          }`}
                        >
                          {isVoted ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <ThumbsUp className="w-3.5 h-3.5" />
                          )}
                          <span>{isVoted ? 'Helpful vote recorded' : 'Helpful'}</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Write a Customer Review Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full border border-[#D5D9D9] shadow-2xl overflow-hidden">
            <div className="bg-[#F0F2F2] px-5 py-3.5 border-b border-[#D5D9D9] flex items-center justify-between">
              <h3 className="font-bold text-[16px] text-[#0F1111]">
                Create Review — Razer Viper V3 Pro
              </h3>
              <button
                type="button"
                onClick={() => setWriteModalOpen(false)}
                className="p-1 rounded hover:bg-black/5 cursor-pointer"
                aria-label="Close review modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmitReview} className="p-5 space-y-4 text-[14px]">
              <div>
                <label className="block font-semibold mb-1.5">Overall rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= newRating
                            ? 'fill-[#FFA41C] text-[#DE7921]'
                            : 'text-[#CCCCCC]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Your name</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Wei Ming"
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Add a headline</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="What's most important to know?"
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Add a written review</label>
                <textarea
                  required
                  rows={4}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="How does the 54g weight, sensor tracking, and battery perform for you?"
                  className="w-full px-3 py-2 border border-[#D5D9D9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#007185]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setWriteModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#D5D9D9] hover:bg-[#F7FAFA] text-[13px] font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] border border-[#FCD200] text-[13px] font-semibold text-[#0F1111] cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
