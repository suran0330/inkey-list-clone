"use client";

import { useState, useMemo } from "react";
import { Star, ChevronDown, Camera, Play, ThumbsUp, ThumbsDown, Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductReviews, getReviewStats, type Review, type ReviewStats } from "@/data/reviews";
import ReviewMediaGallery from "./ReviewMediaGallery";
import WriteReviewModal from "./WriteReviewModal";

interface ProductReviewsProps {
  productId: string;
  productHandle?: string;
}

type SortOption = 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
type FilterOption = 'all' | '5' | '4' | '3' | '2' | '1' | 'verified' | 'withPhotos' | 'withVideos';

export default function ProductReviews({ productId, productHandle }: ProductReviewsProps) {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('helpful');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedReview, setExpandedReview] = useState<string | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const reviews = getProductReviews(productId, productHandle);
  const stats = getReviewStats(productId) || getReviewStats(productHandle || '');

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Apply filters
    switch (filterBy) {
      case '5':
      case '4':
      case '3':
      case '2':
      case '1':
        filtered = reviews.filter(review => review.rating === Number.parseInt(filterBy));
        break;
      case 'verified':
        filtered = reviews.filter(review => review.verified);
        break;
      case 'withPhotos':
        filtered = reviews.filter(review => review.media.some(m => m.type === 'image') || review.beforeAfter);
        break;
      case 'withVideos':
        filtered = reviews.filter(review => review.media.some(m => m.type === 'video'));
        break;
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
        default:
          return (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful);
      }
    });

    return sorted;
  }, [reviews, filterBy, sortBy]);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`${sizeClasses[size]} ${
              i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const ReviewItem = ({ review }: { review: Review }) => {
    const isExpanded = expandedReview === review.id;
    const shouldTruncate = review.content.length > 300;

    return (
      <div className="border-b border-[#efeff0] py-8 last:border-b-0">
        {/* Review Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#746cad] rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm font-inter">
                {review.userInitials}
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-[#1c1c22] font-inter">
                  {review.userName}
                </span>
                {review.verified && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-inter">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                {renderStars(review.rating)}
                <span className="text-sm text-[#747474] font-inter">
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Review Title */}
        <h4 className="font-semibold text-[#1c1c22] mb-2 font-inter">
          {review.title}
        </h4>

        {/* User Details */}
        <div className="flex flex-wrap gap-2 mb-3">
          {review.skinType.map((type, index) => (
            <span
              key={index}
              className="bg-[#efeff0] text-[#747474] text-xs px-2 py-1 rounded-full font-inter"
            >
              {type} Skin
            </span>
          ))}
          <span className="bg-[#efeff0] text-[#747474] text-xs px-2 py-1 rounded-full font-inter">
            Age {review.ageRange}
          </span>
          {review.skinConcerns.map((concern, index) => (
            <span
              key={index}
              className="bg-[#efeff0] text-[#747474] text-xs px-2 py-1 rounded-full font-inter"
            >
              {concern}
            </span>
          ))}
        </div>

        {/* Review Content */}
        <div className="text-[#747474] leading-relaxed mb-4 font-inter">
          {shouldTruncate && !isExpanded ? (
            <>
              {review.content.substring(0, 300)}...
              <button
                onClick={() => setExpandedReview(review.id)}
                className="text-[#746cad] hover:underline ml-2"
              >
                Read more
              </button>
            </>
          ) : (
            <>
              {review.content}
              {shouldTruncate && isExpanded && (
                <button
                  onClick={() => setExpandedReview(null)}
                  className="text-[#746cad] hover:underline ml-2"
                >
                  Show less
                </button>
              )}
            </>
          )}
        </div>

        {/* Before/After Images */}
        {review.beforeAfter && (
          <div className="mb-4">
            <h5 className="font-semibold text-[#1c1c22] mb-2 font-inter">
              Progress Photos ({review.beforeAfter.timeframe})
            </h5>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <div>
                <img
                  src={review.beforeAfter.before}
                  alt="Before"
                  className="w-full h-32 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedMedia({
                    type: 'image',
                    url: review.beforeAfter!.before,
                    caption: 'Before'
                  })}
                />
                <p className="text-xs text-[#747474] text-center mt-1 font-inter">Before</p>
              </div>
              <div>
                <img
                  src={review.beforeAfter.after}
                  alt="After"
                  className="w-full h-32 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedMedia({
                    type: 'image',
                    url: review.beforeAfter!.after,
                    caption: 'After'
                  })}
                />
                <p className="text-xs text-[#747474] text-center mt-1 font-inter">After</p>
              </div>
            </div>
          </div>
        )}

        {/* Review Media */}
        {review.media.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {review.media.map((media) => (
                <div key={media.id} className="relative">
                  {media.type === 'image' ? (
                    <div className="relative">
                      <img
                        src={media.url}
                        alt={media.caption}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedMedia(media)}
                      />
                      <Camera className="absolute top-1 right-1 h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        src={media.thumbnail || media.url}
                        alt={media.caption}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedMedia(media)}
                      />
                      <Play className="absolute inset-0 m-auto h-6 w-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Actions */}
        <div className="flex items-center space-x-4">
          <span className="text-sm text-[#747474] font-inter">Was this helpful?</span>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-[#747474] hover:text-[#746cad] transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span className="text-sm font-inter">{review.helpful}</span>
            </button>
            <button className="flex items-center space-x-1 text-[#747474] hover:text-[#746cad] transition-colors">
              <ThumbsDown className="h-4 w-4" />
              <span className="text-sm font-inter">{review.notHelpful}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ReviewStats = ({ stats }: { stats: ReviewStats }) => (
    <div className="bg-white border border-[#efeff0] rounded-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Overall rating */}
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-4xl font-bold text-[#1c1c22] font-lato">
              {stats.averageRating.toFixed(1)}
            </div>
            <div>
              {renderStars(stats.averageRating, 'lg')}
              <p className="text-sm text-[#747474] mt-1 font-inter">
                Based on {stats.totalReviews} reviews
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-[#747474] font-inter">
              {stats.wouldRecommend}% would recommend this product
            </div>
            <div className="text-sm text-[#747474] font-inter">
              {stats.verifiedPurchases} verified purchases
            </div>
          </div>
        </div>

        {/* Right side - Rating breakdown */}
        <div>
          <h4 className="font-semibold text-[#1c1c22] mb-3 font-inter">Rating Breakdown</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm text-[#747474] w-8 font-inter">{rating}★</span>
                <div className="flex-1 bg-[#efeff0] rounded-full h-2">
                  <div
                    className="bg-[#746cad] h-2 rounded-full"
                    style={{ width: `${stats.percentage[rating as keyof typeof stats.percentage]}%` }}
                  />
                </div>
                <span className="text-sm text-[#747474] w-12 text-right font-inter">
                  {stats.percentage[rating as keyof typeof stats.percentage]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl">
      {/* Review Statistics */}
      <ReviewStats stats={stats} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setShowWriteReview(true)}
            className="bg-[#746cad] hover:bg-[#aca4e9] text-white"
          >
            Write a Review
          </Button>
          <div className="text-sm text-[#747474] font-inter">
            {filteredAndSortedReviews.length} of {reviews.length} reviews
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="border-[#c1c0cb]"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none bg-white border border-[#c1c0cb] rounded-lg px-4 py-2 pr-8 text-sm font-inter"
            >
              <option value="helpful">Most Helpful</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#747474] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-[#efeff0] rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Reviews' },
              { value: '5', label: '5 Stars' },
              { value: '4', label: '4 Stars' },
              { value: '3', label: '3 Stars' },
              { value: '2', label: '2 Stars' },
              { value: '1', label: '1 Star' },
              { value: 'verified', label: 'Verified Only' },
              { value: 'withPhotos', label: 'With Photos' },
              { value: 'withVideos', label: 'With Videos' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterBy(filter.value as FilterOption)}
                className={`px-3 py-1 rounded-full text-sm font-inter transition-colors ${
                  filterBy === filter.value
                    ? 'bg-[#746cad] text-white'
                    : 'bg-white text-[#747474] hover:bg-[#c1c0cb]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="bg-white border border-[#efeff0] rounded-lg">
        {filteredAndSortedReviews.length > 0 ? (
          <div className="p-6">
            {filteredAndSortedReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-[#747474] font-inter">No reviews match your current filters.</p>
          </div>
        )}
      </div>

      {/* Media Gallery Modal */}
      {selectedMedia && (
        <ReviewMediaGallery
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={showWriteReview}
        onClose={() => setShowWriteReview(false)}
        productId={productId}
        productName={productHandle || productId}
      />
    </div>
  );
}
