export const Config = {
  API_URL: 'https://sapi.mttn.vn',
  MEDIA_FILE_URL: 'https://vdating-staging.s3.ap-southeast-1.amazonaws.com',
  STORAGE_BASE_URL: 'https://vdating-staging.s3.ap-southeast-1.amazonaws.com',
};

export const API_TAGS = {
  AUTH: '/auth',
  USERS: '/users',
  ME: '/me',
  PRODUCTS: '/products',
  CATEGORIES: '/categories',
  SHOPS: '/shops',
  ORDERS: '/orders',
  HEALTH: '/health',
  BULK: '/bulk',
  IMAGES: '/images',
  AVATAR: '/avatar',
  SETTINGS: '/settings',
  SIGN_IN: '/sign-in',
  REFRESH_TOKENS: '/refresh-tokens',
  LOGOUT: '/logout',
  ALL: '/all',
  CUSTOMERS: '/customers',
};

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${API_TAGS.AUTH}${API_TAGS.SIGN_IN}`,
    LOGOUT: `${API_TAGS.AUTH}${API_TAGS.LOGOUT}`,
    REFRESH_TOKENS: `${API_TAGS.AUTH}${API_TAGS.REFRESH_TOKENS}`,
  },
  CONVERSATIONS: {
    INDEX: '/conversations',
  },
  SHOPS: {
    INDEX: '/shops',
  },
  LIKES: {
    INDEX: '/likes',
    ME: '/likes/me',
  },
  MATCHES: {
    INDEX: '/matches',
    BY_TARGET_USER: '/matches/target-user',
    UNMATCH: '/matches/unmatch',
  },
  MEDIA_FILES: {
    INDEX: '/media-files',
  },
  MESSAGES: {
    INDEX: '/messages',
  },
  PHOTOS: {
    INDEX: '/media-files/photos',
  },
  PROFILE_FILTERS: {
    INDEX: '/profile-filters',
    ME: '/profile-filters/me',
  },
  PROFILES: {
    INDEX: '/profiles',
    ME: {
      INDEX: '/profiles/me',
      BASIC: '/profiles/me/basic',
      BASIC_PHOTO: '/profiles/me/basic-photo',
      GEOLOCATION: '/profiles/me/geolocation',
    },
    NEARBY: '/profiles/nearby',
    SWIPE: '/profiles/swipe',
  },
  SIGNED_DEVICES: {
    INDEX: '/signed-devices',
  },
  USERS: {
    INDEX: '/users',
    ME: '/users/me',
    BLOCKS: '/users/blocks',
  },
  VIEWS: {
    INDEX: '/views',
  },
  ME: {
    INDEX: API_TAGS.ME,
    SETTINGS: `${API_TAGS.ME}${API_TAGS.SETTINGS}`,
  },
  PRODUCTS: {
    INDEX: API_TAGS.PRODUCTS,
    ALL: `${API_TAGS.PRODUCTS}${API_TAGS.ALL}`,
    IMAGES: `${API_TAGS.PRODUCTS}${API_TAGS.IMAGES}`,
  },
  CATEGORIES: {
    INDEX: API_TAGS.CATEGORIES,
    ALL: `${API_TAGS.CATEGORIES}${API_TAGS.ALL}`,
  },
  ORDERS: {
    INDEX: API_TAGS.ORDERS,
  },
  CUSTOMERS: {
    INDEX: API_TAGS.CUSTOMERS,
    ALL: `${API_TAGS.CUSTOMERS}${API_TAGS.ALL}`,
  },
};
