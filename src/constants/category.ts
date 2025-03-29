/**
 * Media categories and featured collections with descriptive metadata
 */

export interface CategoryMetadata {
  description: string;
  slug: string;
}

export interface Category {
  title: string;
  path: string;
  metadata: CategoryMetadata;
}

export const CATEGORIES: Category[] = [
  {
    title: "Action",
    path: "/genre/action",
    metadata: {
      slug: "action",
      description:
        "High-intensity films with physical stunts, battles, and thrilling sequences",
    },
  },
  {
    title: "Adventure",
    path: "/genre/adventure",
    metadata: {
      slug: "adventure",
      description:
        "Journey-based stories exploring exotic locations and exciting discoveries",
    },
  },
  {
    title: "Anime",
    path: "/genre/anime",
    metadata: {
      slug: "anime",
      description:
        "Japanese animated productions featuring diverse art styles and storytelling",
    },
  },
  {
    title: "Comedy",
    path: "/genre/comedy",
    metadata: {
      slug: "comedy",
      description:
        "Lighthearted entertainment designed to provoke laughter and amusement",
    },
  },
  {
    title: "Documentary",
    path: "/genre/documentary",
    metadata: {
      slug: "documentary",
      description:
        "Non-fictional films documenting reality, education, and real-world events",
    },
  },
  {
    title: "Drama",
    path: "/genre/drama",
    metadata: {
      slug: "drama",
      description:
        "Serious, plot-driven stories exploring emotional character development",
    },
  },
  {
    title: "Fantasy",
    path: "/genre/fantasy",
    metadata: {
      slug: "fantasy",
      description:
        "Imaginary worlds featuring magic, supernatural elements, and mythical creatures",
    },
  },
  {
    title: "Horror",
    path: "/genre/horror",
    metadata: {
      slug: "horror",
      description:
        "Content designed to scare, shock, and unsettle through suspense and fear",
    },
  },
  {
    title: "Kids",
    path: "/genre/kids",
    metadata: {
      slug: "kids",
      description:
        "Family-friendly entertainment suitable for younger audiences",
    },
  },
  {
    title: "Mystery",
    path: "/genre/mystery",
    metadata: {
      slug: "mystery",
      description:
        "Suspenseful stories centered around solving puzzles and uncovering secrets",
    },
  },
  {
    title: "Romance",
    path: "/genre/romance",
    metadata: {
      slug: "romance",
      description:
        "Love stories focusing on emotional relationships and heartfelt connections",
    },
  },
  {
    title: "Science Fiction",
    path: "/genre/science-fiction",
    metadata: {
      slug: "science-fiction",
      description:
        "Futuristic concepts exploring space, technology, and scientific possibilities",
    },
  },
];

export interface CollectionMetadata {
  description: string;
}

export interface FeaturedCollection {
  title: string;
  path: string;
  metadata: CollectionMetadata;
}

export const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    title: "Popular",
    path: "/collection/popular",
    metadata: {
      description: "Currently trending content watched by most viewers",
    },
  },
  {
    title: "New Releases",
    path: "/collection/new-releases",
    metadata: {
      description: "Recently added content fresh to our platform",
    },
  },
  {
    title: "Top Rated",
    path: "/collection/top-rated",
    metadata: {
      description: "Highest rated content according to audience reviews",
    },
  },
  {
    title: "Trending",
    path: "/collection/trending",
    metadata: {
      description: "Content gaining rapid popularity this week",
    },
  },
];
