export interface ListingDataType {
  listingId: string;
  state: string;
  title: string;
  description: string;
  location: string;
  location_latitude: number;
  location_longitude: number;
  categories: number[];
  no_of_guests_max: number;
  no_of_bedrooms_max: number;
  no_of_beds_max: number;
  no_of_washroom_max: number;
  pets: number[];
  media: ListingMedia[];
  check_in_ins: string;
  amenities: number[];
  rules: number[];
  currency: string;
  currency_symbol: string;
  base_price: number;
  weekend_price: number;
  week_price: number;
  month_price: number;
  season: ListingSeason[];
  extra_services: ListingExtraPrice[];
  add_ons: ListingAddOn[];
  is_instant_book: boolean;
  max_allowed_guests: number;
  max_free_guests: number;
  price_per_additional_guest: number;
  max_bookings_days: number;
  no_of_pets_allowed: number;
  wifi_network_name: string;
  wifi_network_password: string;
  wifi_upload_speed: number;
  wifi_download_speed: number;
  is_custom_rule: boolean;
  check_in_time: number;
  check_out_time: number;
  is_quite_hours: boolean;
  quite_hours_from: number;
  quite_hours_to: number;
  custom_rule: string;
  ical: any[];
  long_term_discount: any[];
  accommodation: ListingAccommodation[];
  address: ListingAddress;
}
export interface HostingTypes {
  _id: string;
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  sequence_no: number;
  is_deleted: boolean;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ListingAddress {
  area: string;
  city: string;
  country: string;
  country_id: string;
  destination: string;
  full_address: string;
  house: string;
  landmark: string;
  pin: string;
  region: string;
  state: string;
  street: string;
  _id: string;
}

export interface AmenitiesCategory
  extends Omit<HostingTypes, "is_deleted" | "is_active"> {}

interface AmenitiesEnabled extends HostingTypes {
  icon_path: string;
}
export interface Amenities {
  amenitiesCategory: any;
  amenities: any;
}

export interface Destinations extends HostingTypes {}
export interface Catagories extends HostingTypes {
  icon_path: string;
}

export interface HouseRules extends HostingTypes {}

export interface Regions extends HostingTypes {}

export interface Pets extends HostingTypes {}

interface ListingMedia {
  file_type: string;
  type: string;
  is_highlighted: boolean;
  title: string;
  description: string;
  file_name: string;
  format: string;
  path: string;
  _id: string;
}

interface ListingSeason {
  _id: string;
  title: string;
  start: string;
  end: string;
  type: string;
  base_price: number;
  weekend_price:number;
}

interface ListingExtraPrice {
  _id: string;
  title: string;
  price: number;
  start: number;
  end: number;
  type: string;
  per_price: number;
}

interface ListingAddOn {
  _id: string;
  title: string;
  price: number;
  start: number;
  end: number;
  type: string;
  per_price: number;
}

interface ListingAccommodation {
  _id: number;
  name: string;
  slug?: string;
  value: number;
}
