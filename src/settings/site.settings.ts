export const siteSettings = {
  name: 'PickBazar',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'PickBazar',
    href: '/',
    width: 128,
    height: 40,
  },
  defaultLanguage: 'en',
  author: {
    name: 'RedQ, Inc.',
    websiteUrl: 'https://redq.io',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: 'Routes.profileUpdate',
      labelTransKey: 'authorized-nav-item-profile',
    },
    {
      href: 'Routes.profileUpdate',
      labelTransKey: 'authorized-nav-item-logout',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      {
        href: '/dashboard',
        label: 'dashboard',
        icon: 'DashboardIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'Shops',
        icon: 'ShopIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'My Shops',
        icon: 'MyShopIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'Products',
        icon: 'ProductsIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'Attributes',
        icon: 'AttributeIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'Groups',
        icon: 'TypesIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'Categories',
        icon: 'CategoriesIcon',
      },
      {
        href: 'Routes.profileUpdate',
        label: 'Tags',
        icon: 'TagIcon',
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
}
