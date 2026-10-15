export type Look = {
  src: string;
  /** CSS filter for the mood of the frame */
  filter: string;
  /** object-position / zoom origin, aimed at the couple's faces */
  focus: string;
  zoom: number;
};

export type Voice = Look & {
  id: string;
  label: string;
  initial: string;
  alt: string;
  paragraphs: string[];
};

const P1 = "/images/gallery/portrait-1.jpg";
const P2 = "/images/gallery/portrait-2.jpg";

export const looks = {
  mono: "grayscale(1) contrast(1.15) brightness(1.05)",
  noir: "grayscale(1) contrast(1.45) brightness(0.9)",
  moody: "brightness(0.72) contrast(1.2) saturate(0.85)",
  pop: "saturate(1.7) contrast(1.12)",
  vintage: "sepia(0.6) contrast(1.05) brightness(0.97)",
  faded: "contrast(0.92) saturate(0.6) brightness(1.08)",
  warm: "sepia(0.25) saturate(1.3) brightness(1.03)",
  natural: "saturate(1.12) brightness(1.03)",
};

export const storyIntro = {
  title: "OBINASOM",
  names: "Obinna + Munachisom",
  subtitle: "A story told in four voices.",
};

export const voices: Voice[] = [
  {
    id: "narrator-1",
    label: "Narrator’s View",
    initial: "N",
    src: P1,
    filter: looks.mono,
    focus: "55% 43%",
    zoom: 1.55,
    alt: "Princess and Victor, black and white portrait",
    paragraphs: [
      "Perhaps their story began before either of them knew to call it one.",
      "In 2017, Princess noticed Victor for the first time. He was playing bass at an event at her church. She saw him, took note of him, and then did what Princess does rather well.",
      "She minded her business.",
      "No introduction. No conversation. Just a face noticed somewhere in a room full of people.",
      "Then came 2018.",
      "Another event brought Victor back to her church, bass guitar in hand, while Princess was serving with the choir.",
      "This time, Victor noticed Princess.",
      "It was only a few days. A handful of crossings. Enough to notice each other, not enough to know each other.",
      "Victor had already formed an impression.",
      "Princess was beautiful, composed and seemingly unbothered. She carried herself with the kind of poise that, from his side of the room, could easily be mistaken for pride. They made eye contact. Found themselves close enough that a greeting would have made sense.",
      "Princess offered none.",
      "She was, once again, minding her business.",
      "On Victor’s last evening, their paths crossed as Princess was leaving.",
      "This time, Victor finally spoke.",
      "He complimented her.",
      "Princess smiled and said thank you with a warmth he had not expected.",
      "That was all.",
      "Nothing dramatic happened. No music swelled in the background. No one watching would have known that anything important had just occurred.",
      "But perhaps some stories do not announce themselves when they begin.",
      "Perhaps they simply leave the door open.",
      "And sometime after that, Victor walked through it.",
    ],
  },
  {
    id: "princess",
    label: "Princess’s View",
    initial: "P",
    src: P2,
    filter: looks.pop,
    focus: "58% 43%",
    zoom: 1.7,
    alt: "Princess, colour portrait",
    paragraphs: [
      "The first time I really remember us was the night he offered to drive me home.",
      "Before that, we were cordial strangers. We had spoken. We knew each other’s names. But I did not know him.",
      "Not really.",
      "And then there was that ride.",
      "For the first time, there was no crowd around us. No people moving in and out. No public version of either of us.",
      "Just Victor and me.",
      "And something about him felt… familiar.",
      "As though I had known him somewhere before this life and we had simply taken a little while to find each other again.",
      "There was no performance. No trying. Just ease.",
      "That night did not make me fall in love with Victor.",
      "It made me want to know him.",
      "And that invitation changed everything.",
      "Conversations became friendship. Friendship became dates. And somewhere along the way, being with him began to feel less like going somewhere and more like coming home.",
      "I prayed about him. I asked for confirmation. Sometimes, if I am being truthful, I prayed hoping God would tell me something different.",
      "Instead, I kept finding my way back to the same answer.",
      "When did I know he was the one?",
      "I knew when I knew I wanted to be with him.",
      "Everything else was simply learning what that knowing meant.",
    ],
  },
  {
    id: "victor",
    label: "Victor’s View",
    initial: "V",
    src: P1,
    filter: looks.noir,
    focus: "41% 41%",
    zoom: 1.7,
    alt: "Victor, black and white portrait",
    paragraphs: [
      "When did I know she was the one?",
      "What do you mean?",
      "She knows the day.",
      "Actually… I do not think there was just one day.",
      "That is the problem with the question.",
      "There were too many moments.",
      "Maybe I knew from the beginning. Maybe I knew before I knew what I was knowing.",
      "Something would happen and I would think,",
      "Yeah. Her.",
      "Another moment.",
      "Still her.",
      "Another year. Another season. Another version of us.",
      "Her again.",
      "So if you are asking me for the exact day?",
      "Ask Princess. She probably has a date.",
      "I just know that, in some way, I have always known.",
      "And even right now…",
      "I know.",
    ],
  },
  {
    id: "narrator-2",
    label: "Narrator’s View",
    initial: "N",
    src: P2,
    filter: looks.vintage,
    focus: "50% 40%",
    zoom: 1,
    alt: "Princess and Victor in a dining room, vintage tone",
    paragraphs: [
      "By 2019, the cordial strangers had become best friends.",
      "Then came dates, laughter, long conversations and distance.",
      "Princess in Los Angeles. Victor in Atlanta.",
      "FaceTimes became a meeting place, and whenever life brought them back to the same city, they found their way back to each other.",
      "Before Victor enlisted in the military, he finally asked Princess to officially be his.",
      "Then FaceTimes gave way to letters.",
      "Handwritten words. Pictures tucked between pages. Waiting for mail. Reading and rereading. Little pieces of one life sent across the distance to another.",
      "And then he came home.",
      "Life continued in the way theirs always had: together, but still very much their own. Through different seasons, prayers, private jokes, dreams, changes and all the ordinary moments that quietly become a life.",
      "Then, in 2022, they did something significant.",
      "They legally eloped.",
      "And if you are waiting for all the details…",
      "you may be waiting for a while.",
      "Those belong to them.",
      "Because some parts of a love story are meant to be shared.",
      "Some are meant to be celebrated.",
      "And some are allowed to remain behind the pages no one else gets to read.",
    ],
  },
  {
    id: "obinnas",
    label: "The Obinnas’ View",
    initial: "O",
    src: P1,
    filter: looks.warm,
    focus: "52% 44%",
    zoom: 1,
    alt: "Princess and Victor standing together",
    paragraphs: [
      "Our story has never really belonged to the crowd.",
      "Funny enough, we first noticed each other in one.",
      "A church. Music. People everywhere.",
      "But our story did not truly begin to become ours until the crowd disappeared.",
      "That carpool.",
      "Two people who barely knew each other.",
      "A conversation without an audience.",
      "A space neither of us knew we were creating.",
      "And somehow, years later, that is still where our love makes the most sense.",
      "In our own little world.",
      "In conversations nobody hears. Jokes nobody understands. Prayers we do not always tell people about. Handwritten letters. Old photographs. The quiet.",
      "We have lived enough life together to know that love does not always look like the grand moment.",
      "Sometimes it looks like familiarity.",
      "Sometimes friendship.",
      "Sometimes distance.",
      "Sometimes a letter.",
      "Sometimes waiting.",
      "Sometimes coming back.",
      "Sometimes choosing the same person again in a completely different season.",
      "And sometimes it is simply looking across the room and realizing:",
      "There you are.",
      "Still.",
      "Maybe our story began in 2017.",
      "Maybe in 2018.",
      "Maybe somewhere between the sound of music, a playful comment , or a short drive and honest conversations. A carpool that turned into a journey of a lifetime.",
      "We are still deciding.",
      "Maybe that is our favorite part.",
      "Because after all these years, we are still discovering it.",
      "Still writing it.",
      "Still keeping a few pages just for ourselves.",
      "And now, for a little while, we are opening the book.",
      "Just enough to let you in.",
    ],
  },
];

/** The closing lines of The Obinnas’ View, revealed one by one */
export const closingLines = [
  "Welcome to Obinasom.",
  "A name made from pieces of ours.",
  "Obinna. Munachisom.",
  "And somehow, a meaning that found us too.",
  "Obinasom. My heart is joyful.",
  "Perhaps that is the simplest way to tell our story after all.",
  "#Obinasom",
];

export const filmStrip: (Look & { caption: string })[] = [
  { src: P1, filter: looks.mono, focus: "55% 43%", zoom: 1.5, caption: "2017" },
  { src: P2, filter: looks.pop, focus: "50% 40%", zoom: 1, caption: "2018" },
  { src: P1, filter: looks.moody, focus: "54% 44%", zoom: 1.3, caption: "best friends" },
  { src: P2, filter: looks.vintage, focus: "46% 41%", zoom: 1.6, caption: "letters" },
  { src: P1, filter: looks.faded, focus: "50% 42%", zoom: 1, caption: "FaceTimes" },
  { src: P2, filter: looks.noir, focus: "47% 41%", zoom: 1.45, caption: "he came home" },
  { src: P1, filter: looks.pop, focus: "55% 44%", zoom: 1.65, caption: "2022" },
  { src: P2, filter: looks.warm, focus: "50% 40%", zoom: 1, caption: "still us" },
];
