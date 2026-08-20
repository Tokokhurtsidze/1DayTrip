export type LocalizedText = {
  ka: string;
  en: string;
};

export type Tour = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  itinerary: LocalizedText;
  price: number;
  totalSeats: number;
  availableSeats: number;
  images: string[];
  meetingPoint: string;
};
