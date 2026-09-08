export type Language = 'mr' | 'en';

export type IdolOrigin = 'Pen' | 'Ahmednagar' | 'Special Edition';
export type IdolMaterial = 'Shadu Mati (Eco-Friendly)' | 'POP' | 'Brass Accent';
export type IdolCategory = 'Home' | 'Office' | 'Shop' | 'Mandal';

export interface GanpatiIdol {
  id: string;
  nameMr: string;
  nameEn: string;
  origin: IdolOrigin;
  heightFeet: number;
  material: IdolMaterial;
  category: IdolCategory;
  price: number;
  originalPrice: number;
  image: string;
  descriptionMr: string;
  descriptionEn: string;
  isAvailable: boolean;
  isFeatured?: boolean;
  bookedCount?: number;
  stallNo: string;
  colorScheme: string;
}

export interface BookingRecord {
  bookingId: string;
  idolId: string;
  idolNameMr: string;
  idolNameEn: string;
  idolImage: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  pickupDate: string;
  tokenAmount: number;
  totalPrice: number;
  balanceAmount: number;
  paymentMode: 'UPI' | 'Cash at Stall';
  paymentStatus: 'Advance Paid' | 'Fully Paid';
  bookingDate: string;
  status: 'Confirmed' | 'Ready for Pickup' | 'Completed' | 'Cancelled';
}

export interface FilterState {
  searchQuery: string;
  origin: string;
  category: string;
  material: string;
  maxPrice: number;
  height: string;
}
