export const API_ROUTES = {
  health: 'health',
  eventOverview: 'events/overview',
  login: 'auth/login',
  refreshToken: 'auth/refresh',
  adminUser: 'auth/me',
  pastEvents: 'events/past',
  eventDetails: 'events/{eventId}',
} as const;

export const getEventDetailsRoute = (eventId: string): string => {
  return API_ROUTES.eventDetails.replace('{eventId}', eventId) as typeof API_ROUTES.eventDetails;
};
