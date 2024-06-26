const endPoints = {
  // General
  getUpload: () => "upload",

  // Listing
  getListing: (page: number | string, size: number | string) =>
    `v2/listing/list/${page}/${size}`,
  getListingById: (id: string) => `v2/listing/${id}`,
  getAmenities: () => "v2/types/list/amenities",
  getRules: () => "v2/attributes/list/houserules",
  getPets: () => "v1/listing/list/pets",
  getCatagories: () => "v2/attributes/list/categories",
  getRegions: () => "v2/attributes/list/regions",
  getCountry: () => "v2/attributes/list/country",

  //Calendar
  fetchPropertyList: () => "/v2/listing/list/1/20000",
  fetchCalendar: () => "/v2/listing/calendar",
  fetchUpcomingBookings: () => "/v2/reservations/query",
  blockCalendarDates: () => "/v2/listing/calendar/block",
  unBlockCalendarDates: () => "/v2/listing/calendar/unblock",
  setNewPrice: () => "/v2/listing/calendar/pricing",
  updatePropertyPrice: () => "/v1/api/listings/price",
  blockDates: () => "/v1/api/listings/calendar/dates",
  fetchPropertyImage: () => "/v2/upload/image/public/query",

  //create-listing
  createListing: () => "v2/listing/new",

  // ReservationDetailsCard
  getHostReservations: () => "v2/reservations/query",

  // Customer-Reservations
  getCustomerReservation: () => "v2/reservations/query",

  // reviews
  getPostReviews: () => "v2/review-ratings",
  getCheckReview: () => "v2/review-ratings/check-review",

  // Chat
  getMessageList: () => `chat/messages`,
  getSavedMessageList: (hostId = "9183879") =>
    `saved-messages?hostId=${hostId}`,
  getConversationList: (filter: Record<string, string>) => `chat${filter}`,
  createConversation: () => `chat/init`,
  postSavedMessage: () => `saved-messages`,
  getScheduleMessageList: (hostId = 9183879) =>
    `schedule-messages?hostId=${hostId}`,
  postScheduleMessage: () => `schedule-messages`,
  getScheduleMessageTemplates: () => `schedule-messages/template`,
  uploadAttachment: () => `chat/upload-attachement`,
  reportConversation: () => `chat/report`,
  blockConversation: () => `chat/block`,

  // Dashboard
  // getDashboardData: () => `v1/host/dashboard`,
  getDashboardData: () => `v2/user/45/dashboard`,

  //Channel-Manager
  getChannelManagerSetup: () => `v2/channel-manager/setup`,
  getChannelManagerMapping: () => `v2/channel-manager/mapping`,

  //signin-signup
  signUpUser: () => `v2/user/signup`,
  signInUser: () => `v2/user/auth`,
  validateToken: () => `v2/validate-token`,

  //image upload
  uploadImage: () => `/v2/upload/image/public`,
  getAllPublicImages: () => `/image/public/query`,

  //user
  getUser: () => `/v2/user`,
};

export default endPoints;
