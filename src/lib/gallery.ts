export type Reel =
  | {
      kind: "image";
      src: string;
      tag: string;
      caption: string;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      tag: string;
      caption: string;
    };

export const reels: Reel[] = [
  {
    kind: "image",
    src: "/images/gallery/portrait-1.jpg",
    tag: "The Portrait",
    caption: "Two hearts, one forever.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-1.mp4",
    poster: "/media/stills/reel-1.jpg",
    tag: "The Arrival",
    caption: "Every step was leading us here.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-2.mp4",
    poster: "/media/stills/reel-2.jpg",
    tag: "The Balcony",
    caption: "Under the arches, we found our always.",
  },
  {
    kind: "image",
    src: "/images/gallery/portrait-2.jpg",
    tag: "The Pose",
    caption: "Elegance is choosing each other, every single day.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-3.mp4",
    poster: "/media/stills/reel-3.jpg",
    tag: "The Staircase",
    caption: "Where the laughter never stopped.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-4.mp4",
    poster: "/media/stills/reel-4.jpg",
    tag: "The Embrace",
    caption: "Held close. Never letting go.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-5.mp4",
    poster: "/media/stills/reel-5.jpg",
    tag: "Her Moment",
    caption: "She walked in, and the whole room stood still.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-6.mp4",
    poster: "/media/stills/reel-6.jpg",
    tag: "The Glance",
    caption: "A love written in quiet glances.",
  },
  {
    kind: "video",
    src: "/media/reels/reel-7.mp4",
    poster: "/media/stills/reel-7.jpg",
    tag: "Forever",
    caption: "And this is only the beginning.",
  },
];

/** Tiles for the scrolling cover wall; `reel` jumps to that reel. */
export const wallTiles: {
  src: string;
  video?: string;
  reel: number;
}[] = [
  { src: "/images/gallery/portrait-1.jpg", reel: 0 },
  { src: "/media/stills/reel-2.jpg", reel: 2 },
  { src: "/media/stills/kiss.jpg", reel: 4 },
  { src: "/media/stills/reel-5.jpg", video: "/media/reels/reel-5.mp4", reel: 6 },
  { src: "/media/stills/reel-1.jpg", reel: 1 },
  { src: "/images/gallery/portrait-2.jpg", reel: 3 },
  { src: "/media/stills/dining.jpg", reel: 5 },
  { src: "/media/stills/reel-3.jpg", video: "/media/reels/reel-3.mp4", reel: 4 },
  { src: "/media/stills/reel-6.jpg", reel: 7 },
  { src: "/media/stills/staircase.jpg", reel: 7 },
  { src: "/media/stills/reel-4.jpg", reel: 5 },
  { src: "/media/stills/hall.jpg", reel: 8 },
  { src: "/media/stills/reel-7.jpg", reel: 8 },
];
