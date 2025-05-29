export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  caption?: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
  timeframe: string;
}

export interface Review {
  id: string;
  productId: string;
  productHandle?: string;
  userId: string;
  userName: string;
  userInitials: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  skinType: string[];
  ageRange: string;
  skinConcerns: string[];
  helpful: number;
  notHelpful: number;
  media: MediaItem[];
  beforeAfter?: BeforeAfter;
  userLocation?: string;
  reviewLength: 'short' | 'medium' | 'long';
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  percentage: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  verifiedPurchases: number;
  withPhotos: number;
  withVideos: number;
  wouldRecommend: number;
}

// Sample Reviews Data
export const reviews: Review[] = [
  // Hyaluronic Acid Serum Reviews
  {
    id: "rev_001",
    productId: "hyaluronic-acid",
    productHandle: "hyaluronic-acid-serum",
    userId: "user_001",
    userName: "Sarah M.",
    userInitials: "SM",
    rating: 5,
    title: "Holy grail for dehydrated skin!",
    content: "I've been using this serum for 3 months now and the difference is incredible. My skin was so dehydrated and flaky, especially around my nose and forehead. After just one week of using this twice daily, my skin felt plumper and looked more radiant. The texture is perfect - not sticky or heavy, absorbs quickly. I layer it under my moisturizer and sometimes mix a drop with my foundation for that dewy look. Will definitely repurchase!",
    date: "2024-11-15",
    verified: true,
    skinType: ["Dry", "Sensitive"],
    ageRange: "25-34",
    skinConcerns: ["Dehydration", "Fine Lines", "Dullness"],
    helpful: 47,
    notHelpful: 5,
    media: [
      {
        id: "media_001",
        type: "image",
        url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400",
        caption: "Before using serum - dehydrated skin"
      },
      {
        id: "media_002",
        type: "image",
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400",
        caption: "After 3 months - plump, hydrated skin"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=400",
      after: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400",
      timeframe: "3 months"
    },
    userLocation: "California, USA",
    reviewLength: "long"
  },
  {
    id: "rev_002",
    productId: "hyaluronic-acid",
    productHandle: "hyaluronic-acid-serum",
    userId: "user_002",
    userName: "Emma K.",
    userInitials: "EK",
    rating: 4,
    title: "Great hydration, subtle results",
    content: "Love how lightweight this feels. Definitely hydrating but took about 6 weeks to see real plumping effects. Great value for money compared to other HA serums.",
    date: "2024-11-10",
    verified: true,
    skinType: ["Combination"],
    ageRange: "18-24",
    skinConcerns: ["Dehydration", "Occasional Breakouts"],
    helpful: 23,
    notHelpful: 6,
    media: [],
    userLocation: "London, UK",
    reviewLength: "short"
  },
  {
    id: "rev_003",
    productId: "hyaluronic-acid",
    productHandle: "hyaluronic-acid-serum",
    userId: "user_003",
    userName: "Jessica L.",
    userInitials: "JL",
    rating: 5,
    title: "Amazing transformation - with photos!",
    content: "I was skeptical about all the hype around hyaluronic acid, but this serum converted me! My skin was looking dull and tired (new mom life), and within 2 weeks I started getting compliments. The texture is like water but somehow deeply hydrating. I use 2-3 drops morning and night. Pro tip: apply on slightly damp skin for better absorption. My makeup looks so much better now too!",
    date: "2024-11-08",
    verified: true,
    skinType: ["Normal", "Dehydrated"],
    ageRange: "25-34",
    skinConcerns: ["Dullness", "Fatigue", "Fine Lines"],
    helpful: 89,
    notHelpful: 6,
    media: [
      {
        id: "media_003",
        type: "image",
        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
        caption: "Before - tired, dull skin"
      },
      {
        id: "media_004",
        type: "image",
        url: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400",
        caption: "After 2 weeks - glowing, hydrated skin"
      },
      {
        id: "media_005",
        type: "video",
        url: "https://player.vimeo.com/video/sample",
        thumbnail: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400",
        caption: "My morning skincare routine with HA serum"
      }
    ],
    userLocation: "New York, USA",
    reviewLength: "long"
  },

  // Niacinamide Reviews
  {
    id: "rev_004",
    productId: "niacinamide",
    productHandle: "niacinamide-serum",
    userId: "user_004",
    userName: "Alex T.",
    userInitials: "AT",
    rating: 5,
    title: "Bye bye enlarged pores!",
    content: "I've struggled with large pores on my nose and cheeks for years. After 8 weeks of consistent use (morning routine), I can see a significant reduction in pore size. My skin texture is much smoother and my makeup sits better. The 10% concentration doesn't irritate my sensitive skin at all.",
    date: "2024-11-12",
    verified: true,
    skinType: ["Combination", "Sensitive"],
    ageRange: "25-34",
    skinConcerns: ["Large Pores", "Uneven Texture", "Blackheads"],
    helpful: 124,
    notHelpful: 11,
    media: [
      {
        id: "media_006",
        type: "image",
        url: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400",
        caption: "Before - visible large pores"
      },
      {
        id: "media_007",
        type: "image",
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
        caption: "After 8 weeks - refined pore size"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=400",
      after: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400",
      timeframe: "8 weeks"
    },
    userLocation: "Sydney, Australia",
    reviewLength: "long"
  },
  {
    id: "rev_005",
    productId: "niacinamide",
    productHandle: "niacinamide-serum",
    userId: "user_005",
    userName: "Zoe W.",
    userInitials: "ZW",
    rating: 4,
    title: "Great for oil control",
    content: "Really helps with my T-zone oiliness. Took about 3 weeks to see results but now I barely need blotting papers during the day.",
    date: "2024-11-09",
    verified: true,
    skinType: ["Oily"],
    ageRange: "18-24",
    skinConcerns: ["Excess Oil", "Shine"],
    helpful: 45,
    notHelpful: 7,
    media: [],
    userLocation: "Berlin, Germany",
    reviewLength: "short"
  },

  // Retinol Reviews
  {
    id: "rev_006",
    productId: "retinol",
    productHandle: "retinol-eye-cream",
    userId: "user_006",
    userName: "Maria C.",
    userInitials: "MC",
    rating: 5,
    title: "Best anti-aging investment!",
    content: "At 42, I was starting to see fine lines around my eyes and some crow's feet. After 6 months of using this retinol eye cream, the difference is remarkable. My skin looks firmer, the lines are much less visible, and I get compliments on how youthful my eyes look. Started slowly with 2x per week and worked up to nightly use. No irritation when used properly.",
    date: "2024-10-28",
    verified: true,
    skinType: ["Normal", "Mature"],
    ageRange: "35-44",
    skinConcerns: ["Fine Lines", "Crow's Feet", "Aging"],
    helpful: 167,
    notHelpful: 8,
    media: [
      {
        id: "media_008",
        type: "image",
        url: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400",
        caption: "6 month transformation - smoother eye area"
      },
      {
        id: "media_009",
        type: "video",
        url: "https://player.vimeo.com/video/sample2",
        thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
        caption: "How to apply retinol eye cream properly"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=400",
      after: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400",
      timeframe: "6 months"
    },
    userLocation: "Barcelona, Spain",
    reviewLength: "long"
  },

  // Vitamin C Reviews
  {
    id: "rev_007",
    productId: "vitamin-c",
    productHandle: "vitamin-c-serum",
    userId: "user_007",
    userName: "David K.",
    userInitials: "DK",
    rating: 4,
    title: "Great brightening effects",
    content: "Been using for 2 months and definitely see brighter, more even skin tone. The 15% concentration is perfect - strong enough to see results but doesn't irritate. Use it every morning under SPF.",
    date: "2024-11-05",
    verified: true,
    skinType: ["Normal"],
    ageRange: "25-34",
    skinConcerns: ["Dark Spots", "Dullness", "Uneven Tone"],
    helpful: 78,
    notHelpful: 12,
    media: [
      {
        id: "media_010",
        type: "image",
        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400",
        caption: "Brighter, more even complexion after 2 months"
      }
    ],
    userLocation: "Chicago, USA",
    reviewLength: "medium"
  },

  // BHA Exfoliant Reviews
  {
    id: "rev_008",
    productId: "bha-exfoliant",
    productHandle: "salicylic-acid-cleanser",
    userId: "user_008",
    userName: "Isabella M.",
    userInitials: "IM",
    rating: 5,
    title: "Complete skin transformation",
    content: "This BHA exfoliant has completely transformed my acne-prone skin! I had stubborn blackheads, enlarged pores, and constant breakouts. After 12 weeks of consistent use (started 2x per week, now using every other day), my skin is clearer, smoother, and so much more balanced. Even my dermatologist noticed the improvement!",
    date: "2024-10-20",
    verified: true,
    skinType: ["Oily", "Acne-Prone"],
    ageRange: "18-24",
    skinConcerns: ["Acne", "Blackheads", "Large Pores", "Excess Oil"],
    helpful: 156,
    notHelpful: 11,
    media: [
      {
        id: "media_011",
        type: "image",
        url: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400",
        caption: "Before - acne and enlarged pores"
      },
      {
        id: "media_012",
        type: "image",
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400",
        caption: "After 12 weeks - clear, smooth skin"
      },
      {
        id: "media_013",
        type: "video",
        url: "https://player.vimeo.com/video/sample3",
        thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
        caption: "12 week BHA transformation timeline"
      }
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1594824311694-8b818d4c1b5d?w=400",
      after: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400",
      timeframe: "12 weeks"
    },
    userLocation: "Toronto, Canada",
    reviewLength: "long"
  },

  // More diverse reviews for different products
  {
    id: "rev_009",
    productId: "caffeine-solution",
    productHandle: "caffeine-eye-serum",
    userId: "user_009",
    userName: "Priya S.",
    userInitials: "PS",
    rating: 4,
    title: "Great for puffy morning eyes",
    content: "Living in Mumbai means dealing with humidity and late nights. This caffeine solution really helps with morning puffiness and makes me look more awake. The metal applicator feels cooling and the serum absorbs quickly.",
    date: "2024-11-01",
    verified: true,
    skinType: ["Normal"],
    ageRange: "18-24",
    skinConcerns: ["Puffiness", "Dark Circles", "Tired Eyes"],
    helpful: 67,
    notHelpful: 8,
    media: [
      {
        id: "media_014",
        type: "image",
        url: "https://images.unsplash.com/photo-1594824704818-61db69c33bb3?w=400",
        caption: "Less puffy eyes after 4 weeks use"
      }
    ],
    userLocation: "Mumbai, India",
    reviewLength: "medium"
  },

  {
    id: "rev_010",
    productId: "squalane-cleanser",
    productHandle: "squalane-oil-cleanser",
    userId: "user_010",
    userName: "Rachel B.",
    userInitials: "RB",
    rating: 5,
    title: "Perfect for sensitive skin",
    content: "As someone with very sensitive, reactive skin, I'm always nervous about trying new cleansers. This squalane cleanser is incredibly gentle but effective. Removes all my makeup (even waterproof mascara) without any irritation or dryness. My skin feels soft and nourished, never tight.",
    date: "2024-10-25",
    verified: true,
    skinType: ["Sensitive", "Dry"],
    ageRange: "35-44",
    skinConcerns: ["Sensitivity", "Dryness", "Irritation"],
    helpful: 89,
    notHelpful: 4,
    media: [],
    userLocation: "Portland, USA",
    reviewLength: "medium"
  }
];

// Helper function to get reviews by product ID or handle
export const getProductReviews = (productId: string, productHandle?: string): Review[] => {
  return reviews.filter(review =>
    review.productId === productId ||
    review.productHandle === productHandle ||
    review.productHandle === productId
  );
};

// Helper function to calculate review statistics
export const getReviewStats = (productId: string, productHandle?: string): ReviewStats => {
  const productReviews = getProductReviews(productId, productHandle);

  if (productReviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      percentage: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      verifiedPurchases: 0,
      withPhotos: 0,
      withVideos: 0,
      wouldRecommend: 0
    };
  }

  const totalReviews = productReviews.length;
  const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = Number((totalRating / totalReviews).toFixed(1));

  const ratingCounts = productReviews.reduce((acc, review) => {
    acc[review.rating as keyof typeof acc]++;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

  const percentage = {
    5: Math.round((ratingCounts[5] / totalReviews) * 100),
    4: Math.round((ratingCounts[4] / totalReviews) * 100),
    3: Math.round((ratingCounts[3] / totalReviews) * 100),
    2: Math.round((ratingCounts[2] / totalReviews) * 100),
    1: Math.round((ratingCounts[1] / totalReviews) * 100),
  };

  const verifiedPurchases = productReviews.filter(review => review.verified).length;
  const withPhotos = productReviews.filter(review =>
    review.media.some(m => m.type === 'image') || review.beforeAfter
  ).length;
  const withVideos = productReviews.filter(review =>
    review.media.some(m => m.type === 'video')
  ).length;
  const wouldRecommend = Math.round((productReviews.filter(review => review.rating >= 4).length / totalReviews) * 100);

  return {
    totalReviews,
    averageRating,
    percentage,
    verifiedPurchases,
    withPhotos,
    withVideos,
    wouldRecommend
  };
};

// Get reviews by rating
export const getReviewsByRating = (productId: string, rating: number, productHandle?: string): Review[] => {
  return getProductReviews(productId, productHandle).filter(review => review.rating === rating);
};

// Get verified reviews only
export const getVerifiedReviews = (productId: string, productHandle?: string): Review[] => {
  return getProductReviews(productId, productHandle).filter(review => review.verified);
};

// Get reviews with media
export const getReviewsWithMedia = (productId: string, productHandle?: string): Review[] => {
  return getProductReviews(productId, productHandle).filter(review =>
    review.media.length > 0 || review.beforeAfter
  );
};
