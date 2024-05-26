// export enum EEducationLevel {
//   highSchool = 'highSchool',
//   bachelor = 'bachelor',
//   master = 'master',
//   phD = 'phD',
// }

export const DATE_FORMATS = {
  DATE: 'YYYY-MM-DD',
};

// export const QUERY_OPTIONS = {
//   MESSAGES: {
//     KEY: {
//       PRIMARY: 'messages',
//       SECONDARY: {
//         NEWEST: 'newest',
//         NEXT: 'next',
//       },
//     },
//   },
//   MATCH: {
//     KEY: {
//       PRIMARY: 'match',
//     },
//   },
//   CONVERSATIONS: {
//     KEY: {
//       PRIMARY: 'conversations',
//       SECONDARY: {
//         NEWEST: 'newest',
//         NEXT: 'next',
//       },
//     },
//   },
// } as const;

// export const QUERY_KEYS = {
//   NEARBY_USERS: {
//     KEY: 'nearbyUsers',
//     STALE_TIME: 10 * (6 * 1000) * 6,
//   },
//   PROFILE: 'profile',
//   LIKED_ME: 'likedMe',
// };

export const PROVIDE_TAGS = {
  ME: 'me',
  SETTING: 'setting',
} as const;

export const ARR_PROVIDE_TAGS = Object.values(PROVIDE_TAGS);

export const API_METHODS = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const DEFAULT_LANGUAGE = 'en';

export const APP_NAME = 'iBán hàng';

export const BOTTOM_NAVIGATOR_NAMES = {
  APP: 'APP',
  INSTALLED_APP: 'INSTALLED_APP',
} as const;

export const PRODUCT_SORT_TYPES = {
  IN_STOCK_ASC: 'in_stock_asc',
  IN_STOCK_DESC: 'in_stock_desc',
  TITLE_ASC: 'title_asc',
  TITLE_DESC: 'title_desc',
  PRICE_ASC: 'price_asc',
  PRICE_DESC: 'price_desc',
  NEWEST: 'newst',
  OLDEST: 'oldest',
  CUSTOM: 'custom',
} as const;
