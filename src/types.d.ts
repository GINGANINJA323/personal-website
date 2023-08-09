export interface MenuOptionType {
  icon: string;
  onClick: () => any;
  label: string;
}

interface PagesObject {
  [key: string]: {
    open: boolean;
    state: 'minimised' | 'maximised' | 'default';
    prevState: 'minimised' | 'maximised' | 'default' | null;
  }
}