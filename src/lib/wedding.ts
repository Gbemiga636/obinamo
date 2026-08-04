export const wedding = {
  bride: {
    first: "Princess",
    last: "Munachi-Obinna",
    display: "Princess Munachi-Obinna",
  },
  groom: {
    first: "Victor",
    middle: "Obinna",
    last: "Chibuzo",
    display: "Victor Obinna Chibuzo",
  },
  monogram: "PV",
  logo: "/images/logo.png",
  tagline: "We're so glad you're here!",
  thankYou:
    "Thank you for celebrating this special season with us.",
  ceremonyLabel: "Traditional Wedding",
  date: {
    iso: "2026-11-20T16:00:00-05:00",
    long: "Friday, November 20th, 2026",
    short: "11 · 20 · 2026",
    display: "November 20, 2026",
    caps: "Friday, November 20th, 2026",
  },
  time: "4:00 PM",
  venue: {
    name: "Norcross, Georgia",
    detail: "Full venue address shared in your formal invitation",
    address: "Norcross, Georgia, USA",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Norcross%2C%20Georgia",
    mapsEmbed:
      "https://maps.google.com/maps?q=Norcross%2C%20Georgia&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  dressCode: "Formal Attire",
  dressNote: "Elegant evening wear. Traditional attire warmly welcome.",
  dressPalette: [
    { name: "Mocha", hex: "#3B2A1A" },
    { name: "Cognac", hex: "#7A4A25" },
    { name: "Blush", hex: "#E2C2B8" },
    { name: "Dusty Blue", hex: "#6C7D8F" },
    { name: "Champagne", hex: "#E8D5A3" },
  ],
  hashtag: "#ObinasomForever",
  rsvpDeadline: "October 20, 2026",
  typewriterLines: [
    "With joyful hearts…",
    "We invite you…",
    "To celebrate our love…",
    "Save the Date…",
  ],
  story: [
    {
      year: "The Beginning",
      title: "A chance encounter",
      body: "What began as a gentle conversation became the quiet certainty of forever.",
    },
    {
      year: "Falling",
      title: "Choosing each other",
      body: "Through seasons of laughter, prayer, and becoming — love grew rooted and sure.",
    },
    {
      year: "Promise",
      title: "The proposal",
      body: "Under soft light and grateful hearts, a question was asked… and joy answered yes.",
    },
    {
      year: "2026",
      title: "Forever begins",
      body: "We invite you to witness the day we seal our story before God and family.",
    },
  ],
  schedule: [
    {
      time: "3:00 PM",
      title: "Guest Arrival",
      detail: "Welcome drinks & soft music as guests gather.",
    },
    {
      time: "4:00 PM",
      title: "Traditional Ceremony",
      detail: "Join us as we exchange vows and begin our union.",
    },
    {
      time: "5:30 PM",
      title: "Reception",
      detail: "Dinner, toasts, and the celebration continues.",
    },
    {
      time: "8:00 PM",
      title: "First Dance & Party",
      detail: "Dance the night away with us.",
    },
  ],
  hotels: [
    {
      name: "Nearby Boutique Stay",
      detail: "5–10 minutes from the venue · Ask for wedding rate",
      link: "https://www.google.com/maps/search/?api=1&query=hotels+near+Norcross+Georgia",
    },
    {
      name: "City Comfort Hotel",
      detail: "Ideal for out-of-town guests · Shuttle options TBD",
      link: "https://www.google.com/maps/search/?api=1&query=hotels+Norcross+GA",
    },
  ],
  registry: [
    {
      name: "The Knot / Zola",
      detail: "A little something for our new home",
      link: "#",
    },
    {
      name: "Your Presence",
      detail: "Truly the greatest gift — no pressure to give",
      link: "#rsvp",
    },
  ],
  faqs: [
    {
      q: "What should I wear?",
      a: "Formal attire. Soft neutrals, blush, dusty blue, cognac, and champagne tones photograph beautifully with our palette.",
    },
    {
      q: "Can I bring a plus-one?",
      a: "Please check your invitation. If a plus-one is included, you’ll see the option when you RSVP.",
    },
    {
      q: "Are children welcome?",
      a: "We adore little ones, but this celebration is primarily an adults’ evening. Reach out if you have a special request.",
    },
    {
      q: "Where do I park?",
      a: "Parking details will be shared with your formal invitation and closer to the date.",
    },
    {
      q: "How do I RSVP?",
      a: "Use the RSVP section on this website. Kindly respond by October 20, 2026.",
    },
  ],
  gallery: [
    { src: "/images/sample.jpeg", alt: "Welcome design inspiration" },
    { src: "/images/sample-2.jpeg", alt: "Save the date inspiration" },
    { src: "/images/logo.png", alt: "Obinasom monogram" },
    { src: "/images/flowers/bloom-left.png", alt: "Floral detail" },
  ],
} as const;

export const navItems = [
  { label: "Home", href: "/", live: true },
  { label: "Save The Date", href: "/save-the-date", live: true },
  { label: "The Day", href: "/the-day", live: false },
  { label: "Schedule", href: "/schedule", live: false },
  { label: "Gallery", href: "/gallery", live: false },
  { label: "Travel", href: "/travel", live: false },
  { label: "RSVP", href: "/rsvp", live: false },
  { label: "Registry", href: "/registry", live: false },
  { label: "FAQs", href: "/faqs", live: false },
] as const;
