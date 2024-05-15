import { INavbarData } from './helper';

export const navbarData: INavbarData[] = [
  {
    routeLink: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
  },
  {
    routeLink: 'accounts',
    icon: 'account_tree',
    label: 'Accounts',
    items: [
      {
        routeLink: 'accounts/publish',
        label: 'Publish',
      },
      {
        routeLink: 'accounts/logs',
        label: 'Logs',
      },
      {
        routeLink: 'accounts/configuration',
        label: 'Configuration',
      },
    ],
  },
  {
    routeLink: 'settings',
    icon: 'settings',
    label: 'Settings',
    expanded: true,
    items: [
      {
        routeLink: 'settings/profile',
        label: 'Profile',
        icon: 'person',
      },
      {
        routeLink: 'login',
        label: 'Logout',
      },
    ],
  },
];
