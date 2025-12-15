export const routes = {
  root: '/',
  about: '/about',
  features: '/features',
  publications: '/publications',
  calendar: '/calendar',
  health: '/health',
  login: '/login',
  adminRoot: '/admin',
  adminMembers: '/admin/members',
};

export const headerRoutes = [
  { label: "About Us", path: routes.about, offset: "9%" },
  { label: "Featured", path: routes.features, offset: "32%" },
  { label: "Calendar", path: routes.calendar, offset: "55%" },
  { label: "Publications", path: routes.publications, offset: "75%" },
];

export const adminHeaderRoutes = [
  { label: "events", icon: "material-symbols:event-rounded", path: routes.adminRoot },
  { label: "members", icon: "wpf:group", path: routes.adminMembers },
];