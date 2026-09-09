import type { CmsElementType, CmsFormat } from '../cms/content';

export type CmsContentBlock = {
  id: string;
  content_key: string;
  route_path: string;
  element_type: CmsElementType;
  fallback_content: string;
  draft_content: string;
  published_content: string;
  draft_format: CmsFormat;
  published_format: CmsFormat;
  status: 'draft' | 'published';
  published_version: number;
  last_editor: string | null;
  created_at: string;
  updated_at: string;
  published_at: string;
};

export type CmsContentVersion = {
  id: number;
  content_block_id: string;
  version_number: number;
  content: string;
  format: CmsFormat;
  action: 'seed' | 'publish' | 'restore';
  created_by: string | null;
  created_at: string;
};

export type CmsAdmin = {
  user_id: string;
  display_name: string;
  role: 'owner' | 'editor';
  enabled: boolean;
};

export type CmsActivityAction = 'create' | 'draft_save' | 'publish' | 'restore';

export type CmsContentActivity = {
  id: number;
  content_block_id: string | null;
  content_key: string;
  route_path: string;
  action: CmsActivityAction;
  previous_content: string | null;
  new_content: string;
  previous_format: CmsFormat | null;
  new_format: CmsFormat;
  text_changed: boolean;
  format_changed: boolean;
  changed_by: string | null;
  origin: 'live' | 'version_history';
  source_version_id: number | null;
  created_at: string;
};

export type CmsAdminActivitySummary = CmsAdmin & {
  change_count: number;
  publication_count: number;
  text_count: number;
  first_activity_at: string | null;
  last_activity_at: string | null;
};
