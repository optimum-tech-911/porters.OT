export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  items?: NavItem[];
}

export interface Navigation {
  main: NavGroup[];
  cta: NavItem;
  footer: {
    columns: { title: string; links: NavItem[] }[];
    legal: NavItem[];
  };
}
