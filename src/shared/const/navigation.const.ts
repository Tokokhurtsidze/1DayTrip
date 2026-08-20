export type SidebarNavItem = {
  href: string;
  label: string;
  icon: 'dashboard' | 'plus' | 'list';
};

export const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/dashboard/tours', label: 'Tours', icon: 'list' },
  { href: '/dashboard/tours/new', label: 'New tour', icon: 'plus' },
];
