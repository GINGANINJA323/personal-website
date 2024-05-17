export interface MenuOptionType {
  icon: string;
  onClick: () => any;
  label: string;
}

interface PagesObject {
  [key: string]: {
    open: boolean;
    state: 'minimised' | 'maximised' | 'default' | 'focused';
    prevState: 'minimised' | 'maximised' | 'default' | 'focused' | null;
  }
}

export interface GitEvent {
  username: string;
  userLink: string;
  type: string;
  repoName: string;
  repoLink: string;
  time: string;
  count: number;
  ref?: string;
  refType?: string;
  pusherType?: string;
  prTitle?: string;
  prAction?: string;
};

export interface RawGitEvent {
  type: string;
  actor: {
    display_login: string;
  };
  repo: {
    name: string;
  };
  created_at: number;
  payload: {
    action?: string;
    size?: number;
    ref?: string;
    ref_type?: string;
    pusher_type?: string;
    pull_request?: {
      title?: string;
      action?: string;
    }
  }
}