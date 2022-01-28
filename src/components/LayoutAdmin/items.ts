export interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Dashboard',
    href: '/admin'
  },

  {
    label: 'Usuários',
    href: '/admin/users'
  },
  {
    label: 'Versículos diários',
    href: '/admin/verse_of_the_day'
  },
  {
    label: 'Devocional',
    href: '/admin/devotional'
  }
]
