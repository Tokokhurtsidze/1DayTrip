import { type TranslationDictionary } from '@/shared/const/translations.const';

export const EN_TRANSLATIONS: TranslationDictionary = {
  nav: {
    tours: 'Tours',
    dashboard: 'Dashboard',
    signIn: 'Sign in',
    signUp: 'Sign up',
    signOut: 'Sign out',
  },
  footer: '1DayTrip — Georgia, one unforgettable day at a time.',
  home: {
    badge: 'Georgia, one unforgettable day at a time',
    titleLead: 'Kazbegi at sunrise. Tbilisi by night.',
    titleAccent: 'One day is all it takes.',
    subtitle:
      'Real guides, real seats, zero overbooking. Pay once, and the mountains, monasteries, ' +
      "and wine cellars of Georgia are yours for a day you won't stop talking about.",
    ctaPrimary: 'Find your day',
    ctaSecondary: 'Sign in',
    stats: [
      { value: 'Zero', label: 'seats ever oversold' },
      { value: 'KA / EN', label: 'spoken, written, booked' },
      { value: '100%', label: 'upfront pricing, no surprises' },
    ],
    whyHeading: 'The fine print, made simple',
    features: [
      {
        icon: 'shield',
        label: 'Booking',
        title: 'Your seat, locked instantly',
        description:
          'The second your payment clears, that seat is yours — permanently, atomically. No overselling, no "sorry, it just got taken."',
      },
      {
        icon: 'layers',
        label: 'Language',
        title: 'Georgian & English, always',
        description:
          'Every itinerary, every message, every confirmation — written in your language, not just ours. Switch anytime with one tap.',
      },
      {
        icon: 'boxes',
        label: 'Trust',
        title: 'No cryptic pins, ever',
        description:
          "The moment you're booked, you'll know exactly where to stand and when — the real meeting point, not a vague map marker.",
      },
    ],
    destinations: {
      kicker: 'Discover',
      title: 'Popular Destinations',
      subtitle: 'Explore our handpicked selection of breathtaking locations across Georgia. Unforgettable experiences await you.',
      items: [
        { title: 'Tbilisi Old Town', location: 'Georgia', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/View_of_Tbilisi_from_Tabori_Church_2023-10-08-2.jpg/960px-View_of_Tbilisi_from_Tabori_Church_2023-10-08-2.jpg' },
        { title: 'Mount Kazbek', location: 'Georgia', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kazbegi%2C_Mount_Kazbek%2C_Georgia.jpg/960px-Kazbegi%2C_Mount_Kazbek%2C_Georgia.jpg' },
        { title: 'Svaneti Towers', location: 'Georgia', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Ushguli_Svaneti_Georgia.JPG/960px-Ushguli_Svaneti_Georgia.JPG' },
      ],
    },
    process: {
      kicker: 'Simple Process',
      title: 'Your journey starts here',
      subtitle: "We've streamlined the process of planning and booking your perfect trip, so you can focus on making memories.",
      steps: [
        { step: '01', title: 'Choose your destination', desc: 'Browse through our curated list of world-class locations and find your perfect match.' },
        { step: '02', title: 'Customize your itinerary', desc: 'Tailor your schedule with activities, dining, and accommodations that suit your style.' },
        { step: '03', title: 'Pack and go', desc: 'Receive your comprehensive digital guide and get ready for the adventure of a lifetime.' },
      ],
      img: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=1200&q=80',
    },
    testimonials: {
      kicker: 'Testimonials',
      title: 'What our travelers say',
      items: [
        { name: 'Sarah Jenkins', role: 'Adventure Enthusiast', text: 'The attention to detail in their itineraries is unmatched. My trip to Tbilisi was flawless from start to finish.' },
        { name: 'David Chen', role: 'Cultural Explorer', text: 'Hiking up to Gergeti Trinity Church with their local guide felt like stepping back in time. An absolutely magical experience.' },
        { name: 'Elena Rodriguez', role: 'Relaxation Seeker', text: 'Our Svaneti getaway was perfectly organized. The mountain views from the handpicked guesthouse were exactly what we needed to unwind.' },
      ],
    },
  },
  tours: {
    pageTitle: 'Pick your day',
    pageSubtitle: "Every trip below is real, guided, and ready — pay once and it's yours.",
    empty: 'New tours are being added — check back soon.',
    seatsLeft: 'seats left',
    backToTours: 'Back to all tours',
    itineraryHeading: 'Itinerary',
  },
  notFound: {
    title: "This trail doesn't exist",
    subtitle:
      "The page you're looking for wandered off somewhere between Tbilisi and Kazbegi. Let's get you back on route.",
    cta: 'Back to tours',
  },
  pitch: {
    badge: 'Georgia, one unforgettable day at a time',
    heroTitle: 'Kazbegi at sunrise. Tbilisi by night.',
    heroAccent: 'One day is all it takes.',
    heroSubtitle: '1DayTrip — real guides, real seats, zero overbooking.',
    problemKicker: 'The problem',
    problemTitle: 'Booking a day trip in Georgia still feels like a gamble.',
    painPoints: [
      'Fragmented booking across messaging apps and word-of-mouth — no real confirmation.',
      "Opaque pricing. You don't know the real cost until you've already committed.",
      'No guarantee your seat exists — tours get oversold, plans fall apart on the day.',
    ],
    solutionKicker: 'The solution',
    solutionTitle: 'One platform. Real seats.',
    solutionAccent: 'Instant confirmation.',
    solutionText:
      '1DayTrip lets travelers browse, pay, and lock a seat on a Georgian day tour in minutes — ' +
      'bilingual from the first click to the confirmation email.',
    howKicker: 'How it works',
    howTitle: 'Three steps. No back-and-forth.',
    steps: [
      {
        title: 'Browse',
        description: 'See every tour with real photos, full itinerary, and upfront pricing — in Georgian or English.',
      },
      {
        title: 'Book & pay',
        description: 'Pay once. The seat is locked the instant payment clears — no waiting, no "we\'ll confirm later."',
      },
      {
        title: 'Show up',
        description: "The exact meeting point and time are revealed the moment you're booked — sent straight to your inbox.",
      },
    ],
    trustKicker: 'Built to be trusted',
    trustTitle: 'The fine print, made simple.',
    trustPoints: [
      {
        title: 'Atomic seat locks',
        description: 'The second payment clears, that seat is yours — permanently. A tour can never sell the same spot twice.',
      },
      {
        title: 'No cryptic pins',
        description: "The real meeting point is revealed the instant you're booked — never a vague map marker.",
      },
      {
        title: 'Confirmed in writing',
        description: 'Every booking gets an instant email confirmation with the full trip summary.',
      },
    ],
    bilingualKicker: 'Built bilingual, not translated later',
    bilingualTitle: 'ქართული & English.',
    bilingualAccent: 'Always.',
    enLabel: 'EN',
    enQuote: '"Book & Pay — your seat, locked instantly."',
    enCaption: 'Every itinerary, every confirmation, every email.',
    kaLabel: 'KA',
    kaQuote: '„დაჯავშნა და გადახდა — თქვენი ადგილი მყისვე ფიქსირდება."',
    kaCaption: 'ერთი შეხებით, ყოველთვის.',
    experienceKicker: "What you're actually booking",
    experienceTitle: 'Georgia, in one day.',
    mosaicLabels: ['Kazbegi', 'Svaneti', 'Tbilisi', 'Kakheti wine country'],
    closingTitle: 'One day is',
    closingAccent: 'all it takes.',
    closingSubtitle:
      '1DayTrip — real guides, real seats, zero overbooking. Georgia, one unforgettable day at a time.',
    closingCta: 'Find your day',
  },
  booking: {
    bookButton: 'Book & Pay',
    processing: 'Booking...',
    confirmedTitle: 'Booking confirmed',
    meetingPointLabel: 'Meeting point',
    transactionLabel: 'Transaction',
    soldOut: 'Sold out — no seats remaining.',
    signInToBook: 'Sign in to book',
    errorGeneric: 'Something went wrong. Please try again.',
  },
  admin: {
    createTourTitle: 'Create a tour',
    createTourSubtitle: 'Add a new one-day tour for travelers to book.',
    fieldTitleEn: 'Title (English)',
    fieldTitleKa: 'Title (Georgian)',
    fieldDescriptionEn: 'Description (English)',
    fieldDescriptionKa: 'Description (Georgian)',
    fieldItineraryEn: 'Itinerary (English)',
    fieldItineraryKa: 'Itinerary (Georgian)',
    fieldPrice: 'Price (USD)',
    fieldTotalSeats: 'Total seats',
    fieldImages: 'Photos',
    fieldMeetingPoint: 'Meeting point',
    submit: 'Create tour',
    submitting: 'Creating...',
    success: 'Tour created.',
    addPhotos: 'Add photos',
    imagesHint: 'Up to 6 photos, 1.8MB each.',
    imageTooLarge: 'is too large (max 1.8MB).',
    tooManyImages: 'Only 6 photos allowed per tour.',
  },
};
