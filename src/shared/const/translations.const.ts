import { type Locale } from '@/shared/const/locale.const';
import { EN_TRANSLATIONS } from '@/shared/const/translations-en.const';
import { KA_TRANSLATIONS } from '@/shared/const/translations-ka.const';

export type TranslationDictionary = {
  nav: {
    tours: string;
    dashboard: string;
    signIn: string;
    signUp: string;
    signOut: string;
  };
  footer: string;
  home: {
    badge: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
    whyHeading: string;
    features: {
      icon: 'layers' | 'shield' | 'boxes';
      label: string;
      title: string;
      description: string;
    }[];
    destinations: {
      kicker: string;
      title: string;
      subtitle: string;
      items: { title: string; location: string; img: string }[];
    };
    process: {
      kicker: string;
      title: string;
      subtitle: string;
      steps: { step: string; title: string; desc: string }[];
      img: string;
    };
    testimonials: {
      kicker: string;
      title: string;
      items: { name: string; role: string; text: string }[];
    };
  };
  tours: {
    pageTitle: string;
    pageSubtitle: string;
    empty: string;
    seatsLeft: string;
    backToTours: string;
    itineraryHeading: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    cta: string;
  };
  pitch: {
    badge: string;
    heroTitle: string;
    heroAccent: string;
    heroSubtitle: string;
    problemKicker: string;
    problemTitle: string;
    painPoints: string[];
    solutionKicker: string;
    solutionTitle: string;
    solutionAccent: string;
    solutionText: string;
    howKicker: string;
    howTitle: string;
    steps: { title: string; description: string }[];
    trustKicker: string;
    trustTitle: string;
    trustPoints: { title: string; description: string }[];
    bilingualKicker: string;
    bilingualTitle: string;
    bilingualAccent: string;
    enLabel: string;
    enQuote: string;
    enCaption: string;
    kaLabel: string;
    kaQuote: string;
    kaCaption: string;
    experienceKicker: string;
    experienceTitle: string;
    mosaicLabels: string[];
    closingTitle: string;
    closingAccent: string;
    closingSubtitle: string;
    closingCta: string;
  };
  booking: {
    bookButton: string;
    processing: string;
    confirmedTitle: string;
    meetingPointLabel: string;
    transactionLabel: string;
    soldOut: string;
    signInToBook: string;
    errorGeneric: string;
  };
  admin: {
    createTourTitle: string;
    createTourSubtitle: string;
    fieldTitleEn: string;
    fieldTitleKa: string;
    fieldDescriptionEn: string;
    fieldDescriptionKa: string;
    fieldItineraryEn: string;
    fieldItineraryKa: string;
    fieldPrice: string;
    fieldTotalSeats: string;
    fieldImages: string;
    fieldMeetingPoint: string;
    submit: string;
    submitting: string;
    success: string;
    addPhotos: string;
    imagesHint: string;
    imageTooLarge: string;
    tooManyImages: string;
  };
};

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  en: EN_TRANSLATIONS,
  ka: KA_TRANSLATIONS,
};
