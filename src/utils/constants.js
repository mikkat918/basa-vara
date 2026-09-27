export const APP_NAME = 'Basa Vara'
export const COIN_PRICE_BDT = 10
export const UNLOCK_COST = 1
export const MAX_PROPERTY_IMAGES = 10

export const ROLES = {
  TENANT: 'tenant',
  LANDLORD: 'landlord',
  ADMIN: 'admin',
}

export const PROPERTY_TYPES = ['Apartment', 'Family House', 'Studio', 'Room', 'Duplex']
export const LISTING_TYPES = ['Rent', 'Sublet']
export const FURNISHING = ['Unfurnished', 'Semi-furnished', 'Furnished']
export const PREFERRED_TENANTS = ['Family', 'Bachelor', 'Anyone']

export const AMENITIES = [
  { id: 'lift', label: 'Lift' },
  { id: 'parking', label: 'Parking' },
  { id: 'generator', label: 'Generator' },
  { id: 'gas', label: 'Gas' },
  { id: 'water', label: 'Water' },
  { id: 'electricity', label: 'Electricity' },
  { id: 'security', label: 'Security' },
  { id: 'cctv', label: 'CCTV' },
  { id: 'wifi', label: 'WiFi' },
  { id: 'balcony', label: 'Balcony' },
  { id: 'furnished', label: 'Furnished' },
  { id: 'semiFurnished', label: 'Semi-furnished' },
]

export const LOCATIONS = [
  { area: 'Mirpur', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Uttara', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Mohammadpur', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Dhanmondi', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Badda', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Rampura', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Khilgaon', district: 'Dhaka', division: 'Dhaka' },
  { area: 'Mohakhali', district: 'Dhaka', division: 'Dhaka' },
]

export const DIVISIONS = ['Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Sylhet', 'Barishal', 'Rangpur', 'Mymensingh']

export const PROPERTY_STATUSES = [
  'draft',
  'pending',
  'active',
  'rejected',
  'rented',
  'expired',
  'suspended',
]

export const REPORT_CATEGORIES = [
  'Fake Listing',
  'Spam',
  'Wrong Information',
  'Fraud',
  'Harassment',
  'Other',
]

export const COIN_PACKAGES = [
  { id: 'pkg-1', coins: 1, amount: 10 },
  { id: 'pkg-5', coins: 5, amount: 50 },
  { id: 'pkg-10', coins: 10, amount: 100 },
]

export const PAYMENT_METHODS = [
  { id: 'bkash', label: 'bKash' },
  { id: 'nagad', label: 'Nagad' },
  { id: 'card', label: 'Card' },
  { id: 'other', label: 'Other gateway' },
]

export const STORAGE_KEYS = {
  SESSION: 'basavara.session',
  DB: 'basavara.db.v1',
}
