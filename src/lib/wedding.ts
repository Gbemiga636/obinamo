export type Faq = {
  group: "The Big Day" | "Guests & RSVP" | "Travel & Stay";
  q: string;
  a: string;
  link?: { href: string; label: string };
};

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
    name: "The Pavilion Event Hub",
    street: "5390 Peachtree Industrial Blvd #5390",
    cityLine: "Norcross, GA 30071",
    detail: "5390 Peachtree Industrial Blvd #5390, Norcross, GA 30071",
    address:
      "The Pavilion Event Hub, 5390 Peachtree Industrial Blvd #5390, Norcross, GA 30071",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Pavilion+Event+Hub+5390+Peachtree+Industrial+Blvd+Norcross+GA+30071",
    mapsEmbed:
      "https://maps.google.com/maps?q=The%20Pavilion%20Event%20Hub%2C%205390%20Peachtree%20Industrial%20Blvd%2C%20Norcross%2C%20GA%2030071&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  dressCode: "Shades of Nude and Tan",
  dressNote:
    "We kindly ask our guests to dress in shades of nude and tan, from soft sand and beige to warm caramel and tan.",
  dressPalette: [
    { name: "Ivory Nude", hex: "#EAD7C3" },
    { name: "Sand", hex: "#D9BFA0" },
    { name: "Beige", hex: "#C8A98A" },
    { name: "Caramel", hex: "#B08354" },
    { name: "Tan", hex: "#9A6E45" },
  ],
  hashtag: "#Obinasom",
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
      id: "iba-nkwu",
      time: "4:00 PM",
      timeRange: "4:00 PM – 5:00 PM",
      title: "Igba Nkwu Ceremony",
      detail:
        "Our traditional palm wine ceremony, honoring family, culture and the customs that bring us together.",
      startIso: "2026-11-20T16:00:00-05:00",
      endIso: "2026-11-20T17:00:00-05:00",
    },
    {
      id: "cocktail-hour",
      time: "5:00 PM",
      timeRange: "5:00 PM – 6:00 PM",
      title: "Cocktail Hour",
      detail:
        "Drinks, light bites and a moment to mingle as we transition into the evening celebration.",
      startIso: "2026-11-20T17:00:00-05:00",
      endIso: "2026-11-20T18:00:00-05:00",
    },
    {
      id: "reception",
      time: "6:00 PM",
      timeRange: "6:00 PM – 11:00 PM",
      title: "Reception",
      detail: "Dinner, dancing and celebration.",
      startIso: "2026-11-20T18:00:00-05:00",
      endIso: "2026-11-20T23:00:00-05:00",
    },
  ],
  hotel: {
    name: "Crowne Plaza Norcross",
    brand: "Crowne Plaza",
    location: "Norcross",
    street: "6050 Peachtree Industrial Blvd",
    cityLine: "Norcross, GA 30071",
    bookingUrl:
      "https://www.ihg.com/redirect?path=asearch&brandCode=CP&localeCode=en&regionCode=1&hotelCode=ATLPT&checkInDate=19&checkInMonthYear=102026&checkOutDate=22&checkOutMonthYear=102026&rateCode=6CBARC&_PMID=99801505&GPC=WOB&cn=no&adjustMonth=false&showApp=true&monthIndex=00",
    detailsUrl:
      "https://www.ihg.com/crowneplaza/hotels/us/en/norcross/atlpt/hoteldetail",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Crowne+Plaza+Norcross+6050+Peachtree+Industrial+Blvd+Norcross+GA+30071",
    checkIn: { weekday: "Thursday", day: "19", month: "Nov" },
    checkOut: { weekday: "Sunday", day: "22", month: "Nov" },
    nights: 3,
    bookBy: {
      long: "Tuesday, October 27, 2026",
      short: "October 27",
      iso: "2026-10-27T23:59:59-04:00",
    },
    airport: "Hartsfield–Jackson Atlanta International (ATL)",
    airportDistance: "about 30 miles from the hotel",
  },
  airports: [
    {
      tag: "Domestic flights",
      name: "Hartsfield–Jackson Atlanta International Airport",
      code: "ATL",
      detail:
        "About 30 miles from the hotel and venue, roughly a 35–45 minute drive, though timing may vary with Atlanta traffic.",
    },
    {
      tag: "International arrivals",
      name: "Maynard H. Jackson Jr. International Terminal",
      code: "ATL · INTL",
      detail:
        "The international terminal at Hartsfield–Jackson. This will be the arrival point for our international guests, with a similar drive up to Norcross.",
    },
  ],
  hotels: [
    {
      name: "Crowne Plaza Norcross",
      detail: "6050 Peachtree Industrial Blvd, Norcross, GA 30071",
      link: "https://www.ihg.com/redirect?path=asearch&brandCode=CP&localeCode=en&regionCode=1&hotelCode=ATLPT&checkInDate=19&checkInMonthYear=102026&checkOutDate=22&checkOutMonthYear=102026&rateCode=6CBARC&_PMID=99801505&GPC=WOB&cn=no&adjustMonth=false&showApp=true&monthIndex=00",
    },
  ],
  registry: [
    {
      name: "Zola",
      detail: "A little something for our new home",
      link: "https://www.zola.com/wedding/princessandvictor/registry",
    },
    {
      name: "Your Presence",
      detail: "Truly the greatest gift — no pressure to give",
      link: "#rsvp",
    },
  ],
  faqs: [
    {
      group: "The Big Day",
      q: "Where and when is the wedding taking place?",
      a: "Friday, November 20, 2026, at The Pavilion Event Hub, 5390 Peachtree Industrial Blvd #5390, Norcross, GA 30071.",
      link: { href: "/schedule", label: "See the schedule" },
    },
    {
      group: "The Big Day",
      q: "What time does the celebration start?",
      a: "Our Igba Nkwu ceremony begins promptly at 4:00 PM, followed by cocktail hour at 5:00 PM and the reception from 6:00 PM until 11:00 PM. Come a little early so you don't miss a single moment!",
    },
    {
      group: "The Big Day",
      q: "What is Igba Nkwu?",
      a: "Igba Nkwu, our traditional palm wine ceremony, is the heart of an Igbo wedding. The bride carries a cup of palm wine through the crowd in search of her groom, and when she finds him and he drinks, our families joyfully celebrate the union. Expect music, colour, dancing and so much love.",
    },
    {
      group: "The Big Day",
      q: "What should I wear? Is there a dress code?",
      a: "Yes! Our dress code for guests is shades of nude and tan, think soft sand, beige, caramel and tan. We can't wait to see you glowing in these warm tones as we celebrate in style together.",
    },
    {
      group: "The Big Day",
      q: "Will there be food and drinks?",
      a: "Yes! Drinks and light bites at cocktail hour, then dinner at the reception. Come hungry and ready to celebrate.",
    },
    {
      group: "The Big Day",
      q: "Should I bring cash?",
      a: "If you can! Spraying money is a cherished part of our tradition. Bring crisp bills to shower the couple, the dancers and the musicians with blessings and good fortune on the dance floor.",
    },
    {
      group: "The Big Day",
      q: "Can I take photos during the ceremony?",
      a: "Our photographers will be capturing every moment, so we kindly invite you to put your phones away during the ceremony and be fully present with us. Snap away during cocktail hour and the reception!",
    },
    {
      group: "Guests & RSVP",
      q: "How do I RSVP?",
      a: "Head to the RSVP tab, fill in your first name, surname, phone number and email address, and tap Send my RSVP. That's it!",
      link: { href: "/rsvp", label: "RSVP now" },
    },
    {
      group: "Guests & RSVP",
      q: "Can I bring a plus one?",
      a: "If you are granted a plus one, it will be linked to your invitation and you can RSVP for yourself and your guest.",
    },
    {
      group: "Guests & RSVP",
      q: "Are children allowed at the wedding?",
      a: "As much as we love children and cherish the joy they bring, we kindly request that this celebration remain an adults-only gathering, so every guest can fully relax and enjoy the festivities. Thank you so much for understanding!",
    },
    {
      group: "Guests & RSVP",
      q: "Do you have a gift registry?",
      a: "Your presence is truly the greatest gift. If you'd love to bless us with something more, our registry is on Zola. We're so grateful for your love and thoughtfulness.",
      link: { href: "https://www.zola.com/wedding/princessandvictor/registry", label: "View our registry" },
    },
    {
      group: "Travel & Stay",
      q: "Are there any hotel recommendations or room blocks?",
      a: "Yes! We have a room block at the Crowne Plaza Norcross, 6050 Peachtree Industrial Blvd, Norcross, GA 30071, from Thursday, November 19 to Sunday, November 22, 2026. The room block ends on Tuesday, October 27, 2026, so please book early.",
      link: { href: "/travel", label: "Book your room" },
    },
    {
      group: "Travel & Stay",
      q: "When should I arrive?",
      a: "We recommend arriving by Thursday evening, November 19, so you're rested and ready to celebrate with us on Friday.",
    },
    {
      group: "Travel & Stay",
      q: "Which airport should I fly into?",
      a: "Hartsfield–Jackson Atlanta International Airport (ATL), about 30 miles from the hotel and venue. International guests will arrive at the Maynard H. Jackson Jr. International Terminal.",
    },
    {
      group: "Travel & Stay",
      q: "Is there parking available?",
      a: "Yes, there is parking at the venue.",
    },
    {
      group: "Travel & Stay",
      q: "Will transportation be provided?",
      a: "No, transportation will not be provided. The venue is just a few minutes from the Crowne Plaza Norcross along Peachtree Industrial Blvd.",
    },
  ] as Faq[],
  thingsToDo: [
    {
      name: "Georgia Aquarium",
      address: "225 Baker St NW, Atlanta, GA 30313",
      blurb:
        "One of the largest aquariums in the world, with whale sharks, beluga whales and a dazzling dolphin show.",
      url: "https://www.georgiaaquarium.org/",
      icon: "fish",
      tone: "#6C7D8F",
    },
    {
      name: "Atlanta Botanical Garden",
      address: "1345 Piedmont Ave NE, Atlanta, GA 30309",
      blurb:
        "Acres of blooms, a treetop canopy walk and living sculptures in the heart of Midtown.",
      url: "https://atlantabg.org/",
      icon: "flower",
      tone: "#B67A3D",
    },
    {
      name: "Piedmont Park",
      address: "Atlanta, GA 30309",
      blurb:
        "Atlanta's favourite green escape for a slow stroll, a picnic and beautiful skyline views.",
      url: "https://piedmontpark.org/",
      icon: "trees",
      tone: "#7A4A25",
    },
    {
      name: "World of Coca-Cola",
      address: "121 Baker St NW, Atlanta, GA 30313",
      blurb:
        "Taste over 100 drinks from around the world and get close to the famous secret formula vault.",
      url: "https://www.worldofcoca-cola.com/",
      icon: "soda",
      tone: "#9B4A3A",
    },
    {
      name: "Centennial Olympic Park",
      address: "Atlanta, GA 30313",
      blurb:
        "Fountains, gardens and the SkyView Ferris wheel, built for the 1996 Olympic Games.",
      url: "https://www.gwcca.org/centennial-olympic-park",
      icon: "wheel",
      tone: "#6C7D8F",
    },
    {
      name: "Martin Luther King, Jr. National Historical Park",
      address: "450 Auburn Ave NE, Atlanta, GA 30312",
      blurb:
        "Walk in the footsteps of Dr. King: his birth home, Ebenezer Baptist Church and more.",
      url: "https://www.nps.gov/malu/",
      icon: "landmark",
      tone: "#3B2A1A",
    },
    {
      name: "Fernbank Museum | 3D Theater | Forest",
      address: "767 Clifton Rd NE, Atlanta, GA 30307",
      blurb:
        "Towering dinosaurs, a giant-screen theater and a peaceful old-growth forest to explore.",
      url: "https://www.fernbankmuseum.org/",
      icon: "bone",
      tone: "#B67A3D",
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
  { label: "Our Story", href: "/story", live: true },
  { label: "Travel/Hotels", href: "/travel", live: true },
  { label: "Schedule", href: "/schedule", live: true },
  { label: "Gallery", href: "/gallery", live: true },
  { label: "RSVP", href: "/rsvp", live: true },
  { label: "Registry", href: "https://www.zola.com/wedding/princessandvictor/registry", live: true },
  { label: "Things to Do/FAQs", href: "/faqs", live: true },
] as const;
