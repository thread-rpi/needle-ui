export const API_ROUTES = {
  health: 'health',
  eventOverview: 'events/overview',
  login: 'auth/login',
  refreshToken: 'auth/refresh',
  adminUser: 'auth/me',
  pastEvents: 'events/past',
  eventDetails: 'events/{eventId}',
  memberDetails: 'members/{memberId}',
} as const;

export const getEventDetailsAPIRoute = (eventId: string): string => {
  return API_ROUTES.eventDetails.replace('{eventId}', eventId) as typeof API_ROUTES.eventDetails;
};

export const getMemberDetailsAPIRoute = (memberId: string): string => {
  return API_ROUTES.memberDetails.replace('{memberId}', memberId) as typeof API_ROUTES.memberDetails;
};