export interface Project {
  id: number;
  description: string;
  name: string;
  name_with_namespace: string;
  path: string;
  path_with_namespace: string;
  created_at: string;
  default_branch?: string;
  tag_list: any[];
  ssh_url_to_repo: string;
  http_url_to_repo: string;
  web_url: string;
  readme_url?: string;
  avatar_url?: string;
  forks_count: number;
  star_count: number;
  last_activity_at: string;
  namespace: Namespace;
  _links: Links;
  packages_enabled?: any;
  empty_repo: boolean;
  archived: boolean;
  visibility: string;
  resolve_outdated_diff_discussions?: boolean;
  container_registry_enabled: boolean;
  container_expiration_policy?: Containerexpirationpolicy;
  issues_enabled: boolean;
  merge_requests_enabled: boolean;
  wiki_enabled: boolean;
  jobs_enabled: boolean;
  snippets_enabled: boolean;
  service_desk_enabled: boolean;
  service_desk_address?: any;
  can_create_merge_request_in: boolean;
  issues_access_level: string;
  repository_access_level: string;
  merge_requests_access_level: string;
  forking_access_level: string;
  wiki_access_level: string;
  builds_access_level: string;
  snippets_access_level: string;
  pages_access_level: string;
  emails_disabled?: any;
  shared_runners_enabled: boolean;
  lfs_enabled: boolean;
  creator_id: number;
  import_status: string;
  open_issues_count: number;
  ci_default_git_depth?: number;
  public_jobs: boolean;
  build_timeout: number;
  auto_cancel_pending_pipelines: string;
  build_coverage_regex?: any;
  ci_config_path?: any;
  shared_with_groups: any[];
  only_allow_merge_if_pipeline_succeeds: boolean;
  allow_merge_on_skipped_pipeline?: any;
  request_access_enabled: boolean;
  only_allow_merge_if_all_discussions_are_resolved?: boolean;
  remove_source_branch_after_merge?: boolean;
  printing_merge_request_link_enabled: boolean;
  merge_method: string;
  suggestion_commit_message?: any;
  auto_devops_enabled: boolean;
  auto_devops_deploy_strategy: string;
  autoclose_referenced_issues: boolean;
  permissions: Permissions;
}

export interface Permissions {
  project_access?: any;
  group_access: Groupaccess;
}

export interface Groupaccess {
  access_level: number;
  notification_level: number;
}

export interface Containerexpirationpolicy {
  cadence: string;
  enabled: boolean;
  keep_n?: any;
  older_than?: any;
  name_regex?: any;
  name_regex_keep?: any;
  next_run_at: string;
}

export interface Links {
  self: string;
  issues: string;
  merge_requests: string;
  repo_branches: string;
  labels: string;
  events: string;
  members: string;
}

export interface Namespace {
  id: number;
  name: string;
  path: string;
  kind: string;
  full_path: string;
  parent_id?: any;
  avatar_url?: any;
  web_url: string;
}
export interface GitLabTodo {
  id: number;
  project: Project;
  author: Author;
  action_name: string;
  target_type: string;
  target: Target;
  target_url: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
}

interface Target {
  id: number | string;
  iid?: number;
  project_id?: number;
  title: string;
  description?: string;
  state?: string;
  created_at: string;
  updated_at?: string;
  merged_by?: Author;
  merged_at?: string;
  closed_by?: any;
  closed_at?: any;
  target_branch?: string;
  source_branch?: string;
  user_notes_count?: number;
  upvotes?: number;
  downvotes?: number;
  author?: Author;
  assignees?: Author[];
  assignee?: Author;
  source_project_id?: number;
  target_project_id?: number;
  labels?: any[];
  work_in_progress?: boolean;
  milestone?: any;
  merge_when_pipeline_succeeds?: boolean;
  merge_status?: string;
  sha?: string;
  merge_commit_sha?: string;
  squash_commit_sha?: any;
  discussion_locked?: any;
  should_remove_source_branch?: any;
  force_remove_source_branch?: boolean;
  reference?: string;
  references?: References;
  web_url: string;
  time_stats?: Timestats;
  squash?: boolean;
  task_completion_status?: Taskcompletionstatus;
  has_conflicts?: boolean;
  blocking_discussions_resolved?: boolean;
  subscribed?: boolean;
  changes_count?: string;
  diff_refs?: Diffrefs;
  merge_error?: any;
  user?: User;
  short_id?: string;
  parent_ids?: string[];
  message?: string;
  author_name?: string;
  author_email?: string;
  authored_date?: string;
  committer_name?: string;
  committer_email?: string;
  committed_date?: string;
}

interface User {
  can_merge: boolean;
}

interface Diffrefs {
  base_sha: string;
  head_sha: string;
  start_sha: string;
}

interface Taskcompletionstatus {
  count: number;
  completed_count: number;
}

interface Timestats {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate?: any;
  human_total_time_spent?: any;
}

interface References {
  short: string;
  relative: string;
  full: string;
}

interface Author {
  id: number;
  name: string;
  username: string;
  state: string;
  avatar_url: string;
  web_url: string;
}
