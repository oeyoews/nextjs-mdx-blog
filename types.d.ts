type Order = 'end' | 'normal';

interface TypingEffectProps {
  text: string;
}

interface ChildrenProps {
  children: React.ReactNode;
}

interface ChildrenSubProps extends ChildrenProps {
  order?: Order;
}

interface ITiddlywikiStatus {
  username: string;
  anonymous: boolean;
  read_only: boolean;
  logout_is_available: boolean;
  space: {
    recipe: string;
    // is_default: boolean;
  };
  tiddlywiki_version: string;
}

/**
 * Represents a comment on an issue.
 */
interface IssueComment {
  /** The URL of the comment */
  url: string;

  /** The HTML URL of the comment */
  html_url: string;

  /** The URL of the issue the comment is on */
  issue_url: string;

  /** The ID of the comment */
  id: number;

  /** The node ID of the comment */
  node_id: string;

  /** The user who created the comment */
  user: User;

  /** The date the comment was created */
  created_at: Date;

  /** The date the comment was last updated */
  updated_at: Date;

  /** The association of the author to the issue */
  author_association: string;

  /** The body text of the comment */
  body: string | null;

  /** The reactions to the comment */
  reactions: Reactions;

  /** Whether the comment was performed via a GitHub app */
  performed_via_github_app: null;
}

interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

interface User {
  /** username */
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface IssueInfo {
  total_count: number;
  items: Issue[];
}

interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number; // issue 编号
  title: string;
  user: User;
  labels: any[];
  // state: State;
  locked: boolean;
  assignee: null;
  assignees: any[];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: Date;
  // author_association: AuthorAssociation;
  active_lock_reason: null;
  body: null | string;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: 'not_planned' | null;
  slug: string;
  date: Date;
  pull_request?: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
    merged_at: Date;
  };
}

interface TiddlerBaseMetadata {
  title: string;
  type: string;
  created: string;
  creator: string;
  modified: string;
  modifier: string;
  tags: string;
  description: string;
  ['page-cover']: string;
  summary: string;
}

interface TiddlerVanillaMetadata extends TiddlerBaseMetadata {
  text: string;
}

interface TiddlerMetadata extends TiddlerBaseMetadata {
  slug: string;
  date: Date;
}

type Tiddler = TiddlerVanillaMetadata & TiddlerMetadata;

interface VaulProps {
  buttonText: string | React.ReactNode;
  title?: string;
  children?: string | React.ReactNode;
}

// declare module '*.mp3' {
//   const src: string;
//   export default src;
// }

type Params = {
  slug: string;
};
